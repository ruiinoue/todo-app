import Vuex from 'vuex'
import * as index from '../store/index'
import { createLocalVue } from '@vue/test-utils'
import _ from 'lodash'
import axios from 'axios'
import { TestScheduler } from 'jest'

const localVue = createLocalVue()
localVue.use(Vuex)

let mockAxiosGetResult
jest.mock('axios', () => ({
  $get: jest.fn(() => Promise.resolve(mockAxiosGetResult)),
  $post: jest.fn(() => Promise.resolve(mockAxiosGetResult)),
  $patch: jest.fn(() => Promise.resolve(mockAxiosGetResult))
}))

let action;
const testAction = (context = {}, payload = {}) => {
  return index.actions[action].bind({ $axios: axios })(context, payload)
}

describe('store/index.js', () => {
  let store
  let todo1, todo2, new_todo
  let item1, item2, item3, item4, todo_to_items
  beforeEach(() => {
    store = new Vuex.Store(_.cloneDeep(index))
    todo1 = { id: 1, title: 'title_1', created_by: '1', created_at: "", updated_at: "" }
    todo2 = { id: 2, title: 'title_2', created_by: '2', created_at: "", updated_at: "" }
    item1 = { id: 1, name: "item_1", done: true, todo_id: 1, created_at: "", updated_at: "" }
    item2 = { id: 2, name: "item_2", done: true, todo_id: 1, created_at: "", updated_at: "" }
    item3 = { id: 3, name: "item_3", done: true, todo_id: 1, created_at: "", updated_at: "" }
    item4 = { id: 4, name: "item_4", done: true, todo_id: 1, created_at: "", updated_at: "" }
    todo_to_items = { id: 1, title: 'todo_to_items', created_by: '1', created_at: "", updated_at: "" }
    new_todo = { id: 3, title: 'title_3', created_by: '3', created_at: "", updated_at: "" }
  })

  describe('getters', () => {
    let todos
    let items
    let todoItems
    beforeEach(() => {
      todos = [todo1, todo2]
      items = [item1, item2, item3, item4]
      todo_to_items.items = items
      todoItems = [todo_to_items]
      store.replaceState({
        todos: todos,
        items: items,
        todoItems: todoItems,
      })
    })

    describe('todos', () => {
      test('すべてのtodoが取得できる', () => {
        expect(store.getters['todos']).toEqual(expect.arrayContaining(todos))
      })
    })

    describe('items', () => {
      test('指定のtodoに含まれるすべてのitemsが取得できる', () => {
        expect(store.getters['items']).toEqual(expect.arrayContaining(items))
      })
    })

    describe('todoItems', () => {
      test('todoItemsが取得できる', () => {
        expect(store.getters['todoItems']).toEqual(expect.arrayContaining(todoItems))
      })
    })
  })

  describe('GETアクションのテスト', () => {
    let commit
    let todos
    let items
    let todoItems
    beforeEach(() => {
      commit = store.commit
      todos = [todo1, todo2]
      items = [item1, item2, item3, item4]
      todo_to_items.items = items
      todoItems = [todo_to_items]
      store.replaceState({
        todos: todos,
        items: items,
        todoItems: todoItems,
      })
    })

    describe('fetchTodos', () => {
      test('todosを取得する', async done => {
        action = 'fetchTodos'
        mockAxiosGetResult = [
          { "id": todo1.id, "title": todo1.title, "created_by": todo1.created_by, "created_at": todo1.created_at, "updated_at": todo1.updated_at },
          { "id": todo2.id, "title": todo2.title, "created_by": todo2.created_by, "created_at": todo2.created_at, "updated_at": todo2.updated_at }
        ]
        await testAction({ commit })
        expect(store.getters['todos']).toEqual(todos)
        done()
      })
    })

    describe('fetchItems', () => {
      test('itemsを取得する', async done => {
        action = 'fetchItems'
        mockAxiosGetResult = [
          { "id": item1.id, "name": item1.name, "done": item1.done, "todo_id": item1.todo_id, "created_at": item1.created_at, "updated_at": item1.updated_at },
          { "id": item2.id, "name": item2.name, "done": item2.done, "todo_id": item2.todo_id, "created_at": item2.created_at, "updated_at": item2.updated_at },
          { "id": item3.id, "name": item3.name, "done": item3.done, "todo_id": item3.todo_id, "created_at": item3.created_at, "updated_at": item3.updated_at },
          { "id": item4.id, "name": item4.name, "done": item4.done, "todo_id": item4.todo_id, "created_at": item4.created_at, "updated_at": item4.updated_at }
        ]
        await testAction({ commit }, todo1.id)
        expect(store.getters['items']).toEqual(items)
        done()
      })
    })

    describe('fetchTodoItems', () => {
      test('todoItemsを取得する', async done => {
        action = 'fetchTodoItems'
        mockAxiosGetResult = [
          {
            "id": todo_to_items.id,
            "title": todo_to_items.title,
            "created_by": todo_to_items.created_by,
            "created_at": todo_to_items.created_at,
            "updated_at": todo_to_items.updated_at,
            "items": todo_to_items.items
          },
        ]
        await testAction({ commit }, todo_to_items.id)
        expect(store.getters['todoItems']).toEqual(todoItems)
        done()
      })
    })
  })

  describe('POSTのテスト', () => {
    let commit
    let todos
    beforeEach(() => {
      commit = store.commit
      todos = [todo1, todo2, new_todo]
      store.replaceState({
        todos: todos,
      })
    })

    describe('createTodos', () => {
      test('新規todoを作成する', async done => {
        action = 'createTodos'
        mockAxiosGetResult = {
          "id": new_todo.id,
          "title": new_todo.title,
          "created_by": new_todo.created_by,
          "created_at": new_todo.created_at,
          "updated_at": new_todo.updated_at
        }
        await testAction({ commit }, { title: new_todo.title, created_by: new_todo.created_by })
        expect(store.getters['todos']).toContainEqual(new_todo)
        done()
      })
    })
  })
})
