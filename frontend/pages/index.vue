<template>
  <div>
    <div>GET /todos</div>
    <ul v-for="todo in todos" :key="todo.id">
      <li>{{ todo }}</li>
    </ul>
    <div>GET /todos/1</div>
    <div>{{ items }}</div>
    <ul v-for="item in items" :key="item.id">
      <li>{{ item }}</li>
    </ul>
    <div>todoの中にitemsを格納</div>
    <ul v-for="todoItem in todoItems" :key="todoItem.id">
      <li>
        <div>{{ todoItem }}</div>
        <ul v-for="item in todoItem.items" :key="item.id">
          <li>{{ item }}</li>
        </ul>
      </li>
    </ul>
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
import { mapGetters } from 'vuex'

export default {
  components: {},
  async asyncData({ store }) {
    await store.dispatch('fetchTodos')
    await store.dispatch('fetchItems', 1)
    for(let i=0;i<store.getters['todos'].length;i++) {
      await store.dispatch('fetchTodoItems', store.getters['todos'][i].id)
    }
  },
  computed: {
    ...mapGetters(['todos','items','todoItems'])
  },
  mounted() {
    console.log(this.todos[0].items)
    console.log(this.items)
  },
  // methods: {
  //   async getTodos() {
  //     const res = await this.$axios.$get('http://localhost:5000/todos')
  //     this.todos = res
  //   },
  //   async postTodos() {
  //     const res = await this.$axios.$post('http://localhost:5000/todos', { title: "Create", created_by: 1 })
  //     this.todos.push(res)
  //   },
  //   async showTodos() {
  //     const res = await this.$axios.$get(`http://localhost:5000/todos/1`)
  //     this.todos = res
  //   },
  //   async putTodos() {
  //     const res = await this.$axios.$put(`http://localhost:5000/todos/1`, { title: "Change" })
  //     this.todos = res
  //   },
  //   async daleteTodos() {
  //     const res = await this.$axios.$delete(`http://localhost:5000/todos/2`)
  //     this.todos = res
  //   },
  //   async getItems() {
  //     const res = await this.$axios.$get('http://localhost:5000/todos/1/items')
  //     this.items = res
  //   },
  //   async postItems() {
  //     const res = await this.$axios.$post('http://localhost:5000/todos/1/items', { name: 'Create', done: false })
  //     this.items.push(res)
  //   },
  //   async showItems() {
  //     const res = await this.$axios.$get(`http://localhost:5000/todos/1/items/1`)
  //     this.todos = res
  //   },
  //   async putItems() {
  //     const res = await this.$axios.$put('http://localhost:5000/todos/1/items/1', { name: 'Change', done: true })
  //     this.items = res
  //   },
  //   async deleteItems() {
  //     const res = await this.$axios.$delete('http://localhost:5000/todos/1/items/2')
  //     this.items = res
  //   },
  // }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
