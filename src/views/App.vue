<!-- 
  入口组件，注意不是首页
  这个组件不能缓存，因为会
-->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App', // 必选项，并且需唯一，跟serverCacheKey一起，组成了一个缓存Key值。
    serverCacheKey: 'App', // 用于组件缓存，当值改变的时候，会更新缓存，值不变则使用缓存。返回一个常量是因为这个组件是个纯静态组件，只要在过期时间内可以一直使用缓存。 
  }
</script>