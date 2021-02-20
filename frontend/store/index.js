export const state = () => ({
  todos: [],
  items: [],
  todoItems: [],
})

export const getters = {
  todos: state => state.todos,
  items: state => state.items,
  todoItems: state => state.todoItems,
}

export const mutations = {
  setTodos(state, todos) {
    state.todos = todos
  },
  addTodos(state, newTodo) {
    state.todos.push(newTodo)
  },
  setItems(state, items) {
    state.items = items
  },
  setTodoItems(state, { todo, items}) {
    let todoItems = {}
    todoItems = todo
    todoItems.items = items
    state.todoItems.push(todoItems)
  },
}

export const actions = {
  async fetchTodos({ commit }) {
    const todos = await this.$axios.$get('/api/todos')
    commit('setTodos', todos)
  },
  async createTodos({ commit }, { title, created_by }) {
    const newTodo = await this.$axios.$post('/api/todos', { title: title, created_by: created_by })
    commit('addTodos', newTodo)
  },
  async fetchItems({ commit }, id) {
    const items = await this.$axios.$get(`/api/todos/${id}/items`)
    commit('setItems', items)
  },
  async fetchTodoItems({ commit }, id) {
    const todo = await this.$axios.$get(`/api/todos/${id}`)
    const items = await this.$axios.$get(`/api/todos/${todo.id}/items`)
    commit('setTodoItems', { todo, items })
  },
}
