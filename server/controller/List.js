export default class List {
  static getList(ctx) {
    ctx.body = [{
      id: 1,
      title: 'first article'
    }, {
      id: 2,
      title: 'second article'
    }];
  }
}