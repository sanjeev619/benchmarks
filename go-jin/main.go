package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "postgres"
	dbname   = "goods"
)

var db *sql.DB

type Good struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Price       int    `json:"price"`
}

func getAllGoods(c *gin.Context) {
	rows, err := db.Query("SELECT id, name, description, price FROM goods")
	if err != nil {
		c.Error(err)
		return
	}
	defer rows.Close()

	goods := make([]Good, 0)
	for rows.Next() {
		var good Good
		if err := rows.Scan(&good.ID, &good.Name, &good.Description, &good.Price); err != nil {
			log.Fatal(err)
		}

		goods = append(goods, good)
	}

	c.JSON(http.StatusOK, goods)
	return
}

func main() {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	var err error
	db, err = sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatal(err)
	}
	db.SetMaxOpenConns(50)

	r := gin.Default()
	// Routes
	r.GET("/goods", getAllGoods)

	// Start server
	r.Run()
}
