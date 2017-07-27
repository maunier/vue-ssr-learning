import Article from '../model/Article';

export default class List {
  static async getList(ctx) {
    const articles = await Article.getAllArticles();
    const response = {
      category1: [{
        id: 1,
        title: `${articles}1`
      }],
      category2: [{
        id: 2,
        title: `${articles}2`
      }]
    }
    ctx.response.body = response[ctx.params.type];
  }
}