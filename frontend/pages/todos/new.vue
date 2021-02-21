<template>
  <div>
    <div>todoを追加</div>
    <form @submit.prevent="submitCreateTodo">
      <input type="text" v-model="todoForm.title">
      <input type="text" v-model="todoForm.created_by">
      <button type="submit">追加</button>
    </form>
    <nuxt-link to="/todos">todo一覧に戻る</nuxt-link>
    <nuxt-link to="/">トップに戻る</nuxt-link>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      todoForm: { title: '', created_by: '' },
    }
  },
  methods: {
    async submitCreateTodo() {
      if(this.todoForm.title && this.todoForm.created_by) {
        await this.createTodos({ title: this.todoForm.title, created_by: this.todoForm.created_by })
        this.todoForm.title = ''
        this.todoForm.created_by = ''
        this.$router.push("/")
      }
    },
    ...mapActions(['createTodos'])
  },
}
</script>

<style scoped>
</style>
