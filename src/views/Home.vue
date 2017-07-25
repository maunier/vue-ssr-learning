<template>
  <div>
    <h1>this is homepage, hello my name is hehe</h1>
    
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
  export default {
    name: 'Home',
  }
</script>