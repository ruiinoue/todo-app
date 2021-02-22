export const state = () => ({
  todos: [],
  todo: {},
  items: [],
  item: {},
  todoItems: [],
})

export const getters = {
  todos: state => state.todos,
  todo: state => state.todo,
  items: state => state.items,
  item: state => state.item,
  todoItems: state => state.todoItems,
}

export const mutations = {
  setTodos(state, todos) {
    state.todos = todos
  },
  addTodos(state, newTodo) {
    state.todos.push(newTodo)
  },
  showTodo(state, todo) {
    state.todo = todo
  },
  updateTodo(state, updateTodo) {
    const todo = state.todos.find(todo => todo.id === updateTodo.id)
    if (todo) {
      todo.title = updateTodo.title
      todo.created_by = updateTodo.created_by
    }
  },
  deleteTodo(state, deleteTodoResponse) {
    state.todos = deleteTodoResponse
  },
  setItems(state, items) {
    state.items = items
  },
  addItems(state, newItem) {
    state.items.push(newItem)
  },
  showItem(state, item) {
    state.item = item
  },
  updateItem(state, updateItem) {
    const item = state.items.find(item => item.id === updateItem.id)
    if (item) {
      item.name = updateItem.name
      item.done = updateItem.done
    }
  },
  setTodoItems(state, todoItems) {
    state.todoItems = todoItems
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
  async showTodo({ commit }, todoId) {
    const todo = await this.$axios.$get(`/api/todos/${todoId}`)
    commit('showTodo', todo)
  },
  async updateTodo({ commit }, { todoId, title, created_by }) {
    const updateTodo = await this.$axios.$put(`/api/todos/${todoId}`, { title: title, created_by: created_by })
    commit('updateTodo', updateTodo)
  },
  async deleteTodo({ commit }, todoId) {
    const deleteTodoResponse = await this.$axios.$delete(`/api/todos/${todoId}`)
    commit('deleteTodo', deleteTodoResponse)
  },
  async fetchItems({ commit }, todoId) {
    const items = await this.$axios.$get(`/api/todos/${todoId}/items`)
    commit('setItems', items)
  },
  async createItems({ commit }, { todoId, name, done }) {
    const newItem = await this.$axios.$post(`/api/todos/${todoId}/items`, { name: name, done: done })
    commit('addItems', newItem)
  },
  async showItem({ commit }, { todoId, itemId }) {
    const item = await this.$axios.$get(`/api/todos/${todoId}/items/${itemId}`)
    commit('showItem', item)
  },
  async updateItem({ commit }, { todoId, itemId, name, done }) {
    const updateItem = await this.$axios.$put(`/api/todos/${todoId}/items/${itemId}`, { name: name, done: done })
    commit('updateItem', updateItem)
  },
  async fetchTodoItems({ commit }, ids) {
    let todoItems = []
    for (let i=0;i<ids.length;i++) {
      let todoItem = {}
      const todo = await this.$axios.$get(`/api/todos/${ids[i]}`)
      const items = await this.$axios.$get(`/api/todos/${ids[i]}/items`)
      todoItem = todo
      todoItem.items = items
      todoItems.push(todoItem)
    }
    commit('setTodoItems', todoItems)
  },
}
