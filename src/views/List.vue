<template>
  <div>
    <h1>hello this is the {{pageName}} page</h1>
    <ul>
      <li v-for="item in articleLists">
        <router-link :to="{name: 'detail', params: {articleId: item.id}}">{{item.title}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios';

  async function fetchArticleLists(type, pageNo = 1, size = 10) {
    if (!type) return [];
    
    return await axios.get(`/api/lists/${type}?page=${pageNo}&size=${size}`);
  }

  export default {
    name: 'List',

    data() {
      return {
        itemNumPerPage: 10,
        articleLists: fetchArticleLists(this.$route.params.listType, this.$route.params.page, this.itemNumPerPage),
        pageName: this.$route.params.listType
      }
    }
  }
</script>