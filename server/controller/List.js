export default class List {
  static getList(ctx) {
    // const type = ctx.request
    // console.log('request:', ctx.params);
    const response = {
      category1: [{
        id: 1,
        title: 'category1 first article'
      }, {
        id: 2,
        title: 'category1 second article'
      }],
      category2: [{
        id: 1,
        title: 'category2 first article'
      }, {
        id: 2,
        title: 'category2 second article'
      }]
    }

    ctx.response.body = response[ctx.params.type];
  }
}