<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        app
      </h1>
      <h2 class="subtitle">
        My funkadelic Nuxt.js project
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
        {{ todos }}
        <button @click="getTodos">確認</button>
        <button @click="postTodos">追加</button>
        <button @click="putTodos">更新</button>
        <button @click="showTodos">表示</button>
        <button @click="daleteTodos">削除</button>
        {{ items }}
        <button @click="getItems">確認</button>
        <button @click="postItems">追加</button>
        <button @click="putItems">更新</button>
        <button @click="showItems">表示</button>
        <button @click="deleteItems">削除</button>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data() {
    return {
      todos: [],
      items: [],
    }
  },
  methods: {
    async getTodos() {
      const res = await this.$axios.$get('http://localhost:5000/todos')
      this.todos = res
    },
    async postTodos() {
      const res = await this.$axios.$post('http://localhost:5000/todos', { title: "Create", created_by: 1 })
      this.todos.push(res)
    },
    async showTodos() {
      const res = await this.$axios.$get(`http://localhost:5000/todos/1`)
      this.todos = res
    },
    async putTodos() {
      const res = await this.$axios.$put(`http://localhost:5000/todos/1`, { title: "Change" })
      this.todos = res
    },
    async daleteTodos() {
      const res = await this.$axios.$delete(`http://localhost:5000/todos/2`)
      this.todos = res
    },
    async getItems() {
      const res = await this.$axios.$get('http://localhost:5000/todos/1/items')
      this.items = res
    },
    async postItems() {
      const res = await this.$axios.$post('http://localhost:5000/todos/1/items', { name: 'Create', done: false })
      this.items.push(res)
    },
    async showItems() {
      const res = await this.$axios.$get(`http://localhost:5000/todos/1/items/1`)
      this.todos = res
    },
    async putItems() {
      const res = await this.$axios.$put('http://localhost:5000/todos/1/items/1', { name: 'Change', done: true })
      this.items = res
    },
    async deleteItems() {
      const res = await this.$axios.$delete('http://localhost:5000/todos/1/items/2')
      this.items = res
    },
  }
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
