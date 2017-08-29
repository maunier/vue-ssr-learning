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
  import { mapState } from 'vuex';

  export default {
    name: 'List',
    data () {
      return {
        itemNumPerPage: 10,
        pageName: this.$route.params.listType
      }
    },
    // 此函数会在组件实例化之前调用，所以它无法访问 this
    // 也正因为如此，数据需要挂在state上，不能挂在data上，
    asyncData ({ store, route }) {
      return store.dispatch('fetchArticleLists', 'category1', route.params.page, 10);
    },
    computed: mapState([
      'articleLists'
    ]),
  }
</script>