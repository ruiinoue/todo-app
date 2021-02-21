<template>
  <div>
    <div>GET /todos</div>
    <ul v-for="(todo, index) in todos" :key="`todo-${index}`">
      <li>{{ todo }}</li>
    </ul>
    <div>GET /todos/1</div>
    <div>{{ items }}</div>
    <ul v-for="(item, index) in items" :key="`item-${index}`">
      <li>{{ item }}</li>
    </ul>
    <div>todoの中にitemsを格納</div>
    <ul v-for="(todoItem, index) in todoItems" :key="`todoItem-${index}`">
      <li>
        <div>{{ todoItem }}</div>
        <ul v-for="(itemsInTodo, index) in todoItem.items" :key="`todoItem-items-${index}`">
          <li>{{ itemsInTodo }}</li>
        </ul>
      </li>
    </ul>
    <div>todoを追加</div>
    <form @submit.prevent="submitCreateTodo">
      <input type="text" v-model="todoForm.title">
      <input type="text" v-model="todoForm.created_by">
      <button type="submit">追加</button>
    </form>
    <nuxt-link to="/todos">todo一覧へ</nuxt-link>
    <!-- <div>{{ todoItems }}</div> -->
    <!-- <button @click="getTodos">確認</button>
    <button @click="postTodos">追加</button>
    <button @click="putTodos">更新</button>
    <button @click="showTodos">表示</button>
    <button @click="daleteTodos">削除</button> -->
    <!-- {{ items }} -->
    <!-- <button @click="getItems">確認</button>
    <button @click="postItems">追加</button>
    <button @click="putItems">更新</button>
    <button @click="showItems">表示</button>
    <button @click="deleteItems">削除</button> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {},
  data() {
    return {
      todoForm: { title: '', created_by: '' },
    }
  },
  async asyncData({ store }) {
    await store.dispatch('fetchTodos')
    await store.dispatch('fetchItems', 1)
    let todo_ids = []
    for(let i=0;i<store.getters['todos'].length;i++) {
      todo_ids.push(store.getters['todos'][i].id)
    }
    await store.dispatch('fetchTodoItems', todo_ids)
  },
  computed: {
    ...mapGetters(['todos','items','todoItems'])
  },
  mounted() {
    console.log(this.todos[0].items)
    console.log(this.items)
  },
  methods: {
    async submitCreateTodo() {
      if(this.todoForm.title && this.todoForm.created_by) {
        await this.createTodos({ title: this.todoForm.title, created_by: this.todoForm.created_by })
        this.todoForm.title = ''
        this.todoForm.created_by = ''
      }
    },
    ...mapActions(['createTodos'])
    // async getTodos() {
    //   const res = await this.$axios.$get('http://localhost:5000/todos')
    //   this.todos = res
    // },
    // async postTodos() {
    //   const res = await this.$axios.$post('http://localhost:5000/todos', { title: "Create", created_by: 1 })
    //   this.todos.push(res)
    // },
    // async showTodos() {
    //   const res = await this.$axios.$get(`http://localhost:5000/todos/1`)
    //   this.todos = res
    // },
    // async putTodos() {
    //   const res = await this.$axios.$put(`http://localhost:5000/todos/1`, { title: "Change" })
    //   this.todos = res
    // },
    // async daleteTodos() {
    //   const res = await this.$axios.$delete(`http://localhost:5000/todos/2`)
    //   this.todos = res
    // },
    // async getItems() {
    //   const res = await this.$axios.$get('http://localhost:5000/todos/1/items')
    //   this.items = res
    // },
    // async postItems() {
    //   const res = await this.$axios.$post('http://localhost:5000/todos/1/items', { name: 'Create', done: false })
    //   this.items.push(res)
    // },
    // async showItems() {
    //   const res = await this.$axios.$get(`http://localhost:5000/todos/1/items/1`)
    //   this.todos = res
    // },
    // async putItems() {
    //   const res = await this.$axios.$put('http://localhost:5000/todos/1/items/1', { name: 'Change', done: true })
    //   this.items = res
    // },
    // async deleteItems() {
    //   const res = await this.$axios.$delete('http://localhost:5000/todos/1/items/2')
    //   this.items = res
    // },
  }
}
</script>

<style>
</style>
