<!-- 
  入口组件，注意不是首页
-->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
  ul li {
    list-style: none;
    padding: 10px 0;
  }

  a {
    text-decoration: none;
    color: #333;
    
    &:hover {
      color: #999;
    }
  }

</style>