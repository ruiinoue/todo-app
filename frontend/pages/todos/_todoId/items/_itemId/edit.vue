<template>
  <div>
    <div>itemを編集</div>
    <div>itemのID: {{ itemId }}</div>
    <div>格納しているtodoのID: {{ todoId }}</div>
    <form @submit.prevent="submitUpdateItem">
      <input type="text" v-model="itemForm.name">
      <select v-model="itemForm.done">
        <option v-for="(option, index) in options" :key="`options-${index}`" v-bind:value="option.value">
          {{ option.text }}
        </option>
      </select>
      <div v-if="itemForm.done">完了</div>
      <div v-if="!itemForm.done">未完了</div>
      <button type="submit">更新</button>
    </form>
    <nuxt-link :to="{ name: 'todos-todoId-items-itemid', params: { todoId: todoId, itemid: itemId } }">itemの詳細に戻る</nuxt-link>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      todoId: this.$route.params.todoId,
      itemId: this.$route.params.itemId,
      options: [
        { text: '未完了', value: false },
        { text: '完了', value: true },
      ],
    }
  },
  async asyncData({ route, store }) {
    await store.dispatch('showItem', { todoId: route.params.todoId, itemId: route.params.itemId })

    return {
      itemForm: {
        name: store.getters['item'].name,
        done: store.getters['item'].done,
      }
    }
  },
  computed: {
    ...mapGetters(['item'])
  },
  methods: {
    async submitUpdateItem() {
      if(this.itemForm.name) {
        await this.updateItem({ todoId: this.todoId, itemId: this.itemId, name: this.itemForm.name, done: this.itemForm.done })
        this.$router.push(`/todos/${this.todoId}/items/${this.itemId}`)
      }
    },
    ...mapActions(['updateItem'])
  },
}
</script>

<style scoped>
</style>
