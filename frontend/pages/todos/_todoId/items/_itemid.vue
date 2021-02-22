<template>
  <div>
    <div>itemの詳細</div>
    <div>itemのID: {{ itemId }}</div>
    <div>格納しているtodoのID: {{ todoId }}</div>
    <div>{{ item }}</div>
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
