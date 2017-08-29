<template>
  <div>
    this is movie page
    <tag-list title="热门标签" list="hotTagList"></tag-list>
  </div>

</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'Movie',
    
    asyncData ({ store, route}) {
      return store.dispatch('fetchMoviePageData');
    },
    
    computed: mapState({
      hotTagList: state => state.movie.hotTagList
    })
      
    
  }
</script>