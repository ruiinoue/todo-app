<template>
  <div>
    <p>todoを編集</p>
    <div>取得todoのID: {{ todoId }}</div>
    <div>{{ todo }}</div>
    <form @submit.prevent="submitUpdateTodo">
      <input type="text" v-model="todoForm.title">
      <input type="text" v-model="todoForm.created_by">
      <button type="submit">更新</button>
    </form>
    <button type="button" @click="clickDeleteTodo">削除</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      todoId: this.$route.params.todoId,
    }
  },
  async asyncData({ route, store }) {
    await store.dispatch('showTodo', route.params.todoId)

    return {
      todoForm: {
        title: store.getters['todo'].title,
        created_by: store.getters['todo'].created_by,
      }
    }
  },
  computed: {
    ...mapGetters(['todo'])
  },
  methods: {
    async submitUpdateTodo() {
      if(this.todoForm.title && this.todoForm.created_by) {
        await this.updateTodo({ todoId: this.todoId, title: this.todoForm.title, created_by: this.todoForm.created_by })
        this.$router.push(`/todos/${this.todoId}`)
      }
    },
    async clickDeleteTodo() {
      if(confirm(`${this.todo.title}を削除しますか？`)) {
        await this.deleteTodo(this.todoId)
        this.$router.push('/todos')
      }
    },
    ...mapActions(['updateTodo', 'deleteTodo'])
  },
}
</script>

<style scoped>

</style>
