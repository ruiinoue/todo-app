<template>
  <div>
    <div>itemの詳細</div>
    <div>itemのID: {{ itemId }}</div>
    <div>格納しているtodoのID: {{ todoId }}</div>
    <div>{{ item }}</div>
    <nuxt-link :to="{　name: 'todos-todoId-items-itemId-edit', params: { todoId: todoId, itemId: itemId }　}">itemを編集</nuxt-link>
    <nuxt-link :to="{ name: 'todos-todoId-items', params: { todoid: todoId } }">itemの一覧に戻る</nuxt-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      todoId: this.$route.params.todoId,
      itemId: this.$route.params.itemid,
    }
  },
  async asyncData({ route, store }) {
    await store.dispatch('showItem', { todoId: route.params.todoId, itemId: route.params.itemid })
  },
  computed: {
    ...mapGetters(['item'])
  },
}
</script>

<style scoped>
</style>
