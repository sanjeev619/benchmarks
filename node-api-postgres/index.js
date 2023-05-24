const express = require('express')
const app = express()
const port = 3000

const { Pool } = require('pg')
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'goods',
    max: 50,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

const getGoods = (request, response) => {
    pool.query('SELECT * FROM goods', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

app.get('/goods', getGoods)

pool.connect((err, client, done) => {
    console.log(err)

    app.listen(port, () => {
        console.log(`App running on port ${port}.`)
    })
})