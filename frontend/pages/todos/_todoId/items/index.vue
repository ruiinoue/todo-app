<template>
  <div>
    <div>itemの一覧</div>
    <div>itemを格納しているtodoのID: {{ todoId }}</div>
    <div v-if="items.length === 0">itemなし</div>
    <ul v-for="(item, index) in items" :key="`items-${index}`">
      <li>{{ item }}</li>
    </ul>
    <nuxt-link :to="{ name: 'todos-todoid', params: { todoid: todoId } }">todoへ戻る</nuxt-link>
    <nuxt-link :to="{ name: 'todos-todoId-items-new', params: { todoid: todoId } }">itemを作成</nuxt-link>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      todoId: this.$route.params.todoId
    }
  },
  async asyncData({ route, store }) {
    await store.dispatch('fetchItems', route.params.todoId)
  },
  mounted() {},
  computed: {
    ...mapGetters(['items'])
  },
}
</script>

<style scoped>
</style>
