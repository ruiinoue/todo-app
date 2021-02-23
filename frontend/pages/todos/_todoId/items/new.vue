<template>
  <div>
    <div>itemを追加</div>
    <div>格納元のtodoのID: {{ todoId }}</div>
    <form @submit.prevent="submitCreateItem">
      <input type="text" v-model="itemForm.name">
      <button type="submit">追加</button>
    </form>
    <nuxt-link :to="{ name: 'todos-todoId-items', params: { todoid: todoId } }">itemの一覧に戻る</nuxt-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      todoId: this.$route.params.todoId,
      itemForm: { name: '', done: false }
    }
  },
  methods: {
    async submitCreateItem() {
      if(this.itemForm.name) {
        await this.createItems({ todoId: this.todoId, name: this.itemForm.name, done: this.itemForm.done })
        this.itemForm.name = ''
        this.$router.push(`/todos/${this.todoId}/items`)
      }
    },
    ...mapActions(['createItems'])
  },
}
</script>

<style scoped>
</style>
