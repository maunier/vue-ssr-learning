import Vue from 'vue';

export  function createApp (context) {
  return new Vue({
    data: {
      username: context.username,
    },
    template: `<div>hello {{username}}, this is a page rendered at server!</div>`
  });
}