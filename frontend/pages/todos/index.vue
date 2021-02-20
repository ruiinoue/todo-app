<template>
  <div>
    <div>GET /todos</div>
    <ul v-for="(todo, index) in todos" :key="`todo-${index}`">
      <li>{{ todo }}</li>
    </ul>
    <nuxt-link to="/todos/new">todoを作成</nuxt-link>
    <nuxt-link to="/">トップに戻る</nuxt-link>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  async asyncData({ store }) {
    await store.dispatch('fetchTodos')
  },
  computed: {
    ...mapGetters(['todos'])
  },
}
</script>

<style scoped>
</style>
