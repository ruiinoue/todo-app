<template>
  <div>
    <div>todoの詳細情報</div>
    <p>TodoのID: {{ todoId }}</p>
    <p>Todoの情報</p>
    <div>{{ todo }}</div>
    <p>Todoに格納されているitems</p>
    <ul v-for="(item, index) in items" :key="`item-${index}`">
      <li>{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      todoId: this.$route.params.todoid
    }
  },
  async asyncData({ route, store }) {
    await store.dispatch('showTodo', route.params.todoid)
    await store.dispatch('fetchItems', route.params.todoid)
  },
  computed: {
    ...mapGetters(['todo','items'])
  },
}
</script>

<style scoped>
</style>
