<template>
  <div>
    <div>this is homepage, hello my name is zhaorui</div>
    <ul>
      <li>
        <router-link :to="{name: 'list', params: {listType: 'category1'}}">Category1</router-link>
        
      </li>
      <li>
        <router-link :to="{name: 'list', params: {listType: 'category2'}}">Category2</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  // 假设name是需要异步获取的
  export default {
    // 在服务器端渲染(SSR)期间，我们本质上是在渲染我们应用程序的"快照"，所以如果应用程序依赖于一些异步数据，那么在开始渲染过程之前，需要先预取和解析好这些数据。
    // 其实相当于在这里初始化state,形成一个初始化的state的快照，一是用于服务端渲染，二是用于客户端state的同步。

  }
</script>