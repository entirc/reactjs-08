import { createStore } from 'redux'
import uuid from 'uuid/v4'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TASK': {
      const key = uuid()
      const task = {
        order: Object.getOwnPropertyNames(state).length,
        description: action.description,
        active: true
      }
      return {
        ...state,
        [key]: task
      }
    }
    case 'DELETE_TASK': {
      const nextState = { ...state }
      delete nextState[action.key]

      //reordering the tasks
      Object.getOwnPropertyNames(nextState)
        .sort((leftKey, rightKey) => {
          const leftTask = nextState[leftKey]
          const rightTask = nextState[rightKey]
          return leftTask.order - rightTask.order
        })
        .forEach((key, i) => {
          nextState[key].order = i
        })

      return nextState
    }
    case 'TOGGLE_TASK': {
      const task = state[action.key]
      const updatedTask = { ...task, active: !task.active }
      return {
        ...state,
        [action.key]: updatedTask
      }
    }
    case 'UPDATE_TASK_DESCRIPTION': {
      const task = state[action.key]
      const updatedTask = { ...task, description: action.description }
      return {
        ...state,
        [action.key]: updatedTask
      }
    }
    case 'LOAD_TASKS':
      return action.tasks
    case 'REMOVE_ALL_TASKS':
      return {}
    default:
      return state
  }
}

// Loading the state from local storage
const initialState = JSON.parse(localStorage.getItem(`tasks`))

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => {
  //Saving the state to the local storage
  localStorage.setItem(`tasks`, JSON.stringify(store.getState()))
})

export default store
