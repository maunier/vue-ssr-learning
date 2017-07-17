export default class List {
  static getList(ctx) {
    // ctx.response.body = {name: 123};
    ctx.response.body = [{
      id: 1,
      title: 'first article'
    }, {
      id: 2,
      title: 'second article'
    }];
  }
}