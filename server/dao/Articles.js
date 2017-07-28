import redis from 'redis';
import bluebird from 'bluebird';
import { MongoClient } from 'mongodb';
import { host } from '../../constants';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

export default class ArticlesDao {
  constructor () {
    const url = `mongodb://${host}:27017/my-blog`;

    this.client = redis.createClient();
    this.db = MongoClient.connect(url);
  }

  async getAllArticles() {
    const db = await this.db;
    const articleCollection = db.collection('articles');
    const result = await articleCollection.find({}).toArray();

    return result;
  }

  async addOneArticle(article) {
  }
}