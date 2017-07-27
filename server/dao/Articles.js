import redis from 'redis';
import bluebird from 'bluebird';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

export default class ArticlesDao {
  constructor () {
    this.client = redis.createClient();
  }

  async getAllArticles() {
    return await this.client.get('articles');
  }

  async addOneArticle(article) {
    return await this.client.set('articles:', article);
  }
}