import createApp from './app';

/*
  这个文件是服务端的入口，将会给bundle renderer调用用于服务端渲染
  所以在这个函数的内部，我们将会创建vue实例，根据请求的url获取匹配的组件，并异步的获取组件所需的数据，最后返回一个vue实例的promise
  
*/
export default context => {
  // let resolve;
  // const promise = new Promise(r => { resolve = r; });

  const { app, router } = createApp();
  // const { url } = context;
  return app;
}