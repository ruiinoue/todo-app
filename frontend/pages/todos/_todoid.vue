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
    <nuxt-link :to="{ name: 'todos-todoId-edit', params: { todoId: todoId } }">todoを編集</nuxt-link>
    <nuxt-link :to="{ name: 'todos-todoId-items', params: { todoId: todoId } }">items一覧へ</nuxt-link>
    <nuxt-link to="/">トップに戻る</nuxt-link>
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
