import ArticleDao from '../dao/Articles';

export default class Article {
  constructor(article) {
    this.body = article;
  }

  static async getAllArticles() {
    const articleDao = new ArticleDao();
    return await articleDao.getAllArticles();
  }

  async addOneArticle() {
    const articleDao = new ArticleDao();
    return await articleDao.addOneArticle(this.body);
  }
}