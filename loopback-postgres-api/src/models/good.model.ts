import {Entity, model, property} from '@loopback/repository';

@model()
export class Good extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;


  constructor(data?: Partial<Good>) {
    super(data);
  }
}

export interface GoodRelations {
  // describe navigational properties here
}

export type GoodWithRelations = Good & GoodRelations;
