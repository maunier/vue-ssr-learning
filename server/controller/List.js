import Article from '../model/Article';

export default class List {
  static async getList(ctx) {
    const articles = await Article.getAllArticles();
 
    ctx.response.body = articles;
  }
}