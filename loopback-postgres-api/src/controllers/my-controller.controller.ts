import {repository} from '@loopback/repository';
import {get} from '@loopback/rest';
import {GoodRepository} from '../repositories';

export class MyControllerController {
  constructor(
    @repository(GoodRepository)
    public goodRepository: GoodRepository,
  ) { }


  @get('/goods')
  async getMyData(): Promise<any> {
    const result = await this.goodRepository.execute('SELECT * FROM goods');
    return result;
  }
}
