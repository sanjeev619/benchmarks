import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresqlDataSource} from '../datasources';
import {Good, GoodRelations} from '../models';

export class GoodRepository extends DefaultCrudRepository<
  Good,
  typeof Good.prototype.id,
  GoodRelations
> {
  constructor(
    @inject('datasources.postgresql') dataSource: PostgresqlDataSource,
  ) {
    super(Good, dataSource);
  }
}
