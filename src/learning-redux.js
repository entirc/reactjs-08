import { createStore, combineReducers } from 'redux'
import { inspect } from 'util'

//------------------------------------------------------------------------------
const createGroup = (title, fn, collapsed) => {
  if (collapsed) {
    console.groupCollapsed(title)
  } else {
    console.group(title)
  }
  fn()
  console.groupEnd(title)
}

const group = (title, fn) => createGroup(title, fn, false)
const groupCollapsed = (title, fn) => createGroup(title, fn, true)
//------------------------------------------------------------------------------
let step = 0

groupCollapsed(++step + ' - createStore() expects a reducer', () => {
  const reducer = (state, action) => 'Hello'
  const store = createStore(reducer)
  console.log('store:', store)
  console.log('reducer:', reducer)
})

groupCollapsed(++step + ' - A store manages state - use getState() to retrieve it', () => {
  const reducer = (state, action) => 123
  const store = createStore(reducer)
  console.log('state =', store.getState())
})

groupCollapsed(++step + ' - A internal @@redux/INIT action is dispatched after creating the store => always set the default reducer state to define the initial state', () => {
  const reducer = (state = 'default value before any custom action was dispatched', action) => {
    console.log(action)
    return state
  }
  const store = createStore(reducer)
  console.log('state =', store.getState())
})

groupCollapsed(++step + ' - You can change the state dispatching actions', () => {
  const reducer = (state = { name: 'Helton' }, action) => {
    if (action.type === 'CHANGE_NAME')
      return { name: action.name }
    else
      return state
  }

  const store = createStore(reducer)
  console.log('state =', store.getState())

  store.dispatch({ type: 'CHANGE_NAME', name: 'Angelo'})
  console.log('state =', store.getState())

  store.dispatch({ type: 'CHANGE_NAME', name: 'Michel'})
  console.log('state =', store.getState())
})

groupCollapsed(++step + ' - You can manage multiple action types inside a reducer', () => {
  const reducer = (state = { name: 'Helton' }, action) => {
    if (action.type === 'CHANGE_NAME')
      return { name: action.name }
    else if (action.type === 'CONVERT_TO_UPPERCASE')
      return { name: state.name.toUpperCase() }
    else
      return state
  }

  const store = createStore(reducer)
  console.log('state =', store.getState())

  store.dispatch({ type: 'CONVERT_TO_UPPERCASE' }) //we don't need any other attribute
  console.log('state =', store.getState())
})

groupCollapsed(++step + ' - You can merge state inside a reducer', () => {
  const reducer = (state = { first: '<default first>', last: '<default last>' }, action) => {
    if (action.type === 'SET_FIRST_NAME')
      return {
        ...state,
        first: action.value
      }
    else if (action.type === 'SET_LAST_NAME') {
      return {
        ...state,
        last: action.value
      }
    }
    else
      return state
  }

  const store = createStore(reducer)
  console.log('state =', store.getState())

  store.dispatch({ type: 'SET_FIRST_NAME', value: 'Helton' })
  console.log('state =', store.getState())

  store.dispatch({ type: 'SET_LAST_NAME', value: 'Souza' })
  console.log('state =', store.getState())

  store.dispatch({ type: 'SET_LAST_NAME', value: 'Pereira' })
  console.log('state =', store.getState())

  store.dispatch({ type: 'SET_FIRST_NAME', value: 'Ana' })
  console.log('state =', store.getState())
})

groupCollapsed(++step + ' - You can subscribe to a store to be notified when the state changes', () => {
  const reducer = (state = 0, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1
      case 'DECREMENT':
        return state - 1
      case 'RESET':
        return 0
      default:
        return state
    }
  }

  const store = createStore(reducer)

  store.subscribe(() => {
    console.log('State updated to:', store.getState())
  })

  store.dispatch({ type: 'INCREMENT'}) //1
  store.dispatch({ type: 'INCREMENT'}) //2
  store.dispatch({ type: 'DECREMENT'}) //1
  store.dispatch({ type: 'INCREMENT'}) //2
  store.dispatch({ type: 'INCREMENT'}) //3
  store.dispatch({ type: 'INCREMENT'}) //4
  store.dispatch({ type: 'DECREMENT'}) //3
  store.dispatch({ type: 'RESET'})     //0

  // setInterval(() => {
  //   store.dispatch({ type: 'INCREMENT'})
  // }, 1000)
})

groupCollapsed(++step + ' - You can define a initial state to the store', () => {
  //since we defined a initial state while creating the store, the default value for the state here will NEVER be used
  const reducer = (state = 0, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1
      case 'DECREMENT':
        return state - 1
      default:
        return state
    }
  }

  const initialState = 100 //useful when you have to load some data from a server, localStorage, etc.
  const store = createStore(reducer, initialState)

  store.subscribe(() => {
    console.log('State updated to:', store.getState())
  })

  store.dispatch({ type: 'INCREMENT'}) //101
  store.dispatch({ type: 'INCREMENT'}) //102
  store.dispatch({ type: 'DECREMENT'}) //101
})

groupCollapsed(++step + ' - You can combine multiples reducers that manage different states', () => {
  const incrementDecrementReducer = (state = 0, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1
      case 'DECREMENT':
        return state - 1
      default:
        return state
    }
  }

  const nameReducer = (state = { first: '<default first>', last: '<default last>' }, action) => {
    switch (action.type) {
      case 'SET_FIRST_NAME':
        return {
          ...state,
          first: action.value
        }
      case 'SET_LAST_NAME':
        return {
          ...state,
          last: action.value
        }
      default:
        return state
    }
  }

  const reducers = combineReducers({
    name: nameReducer,
    number: incrementDecrementReducer
  })

  const store = createStore(reducers)

  store.subscribe(() => {
    console.log('State updated!')
    console.log(inspect(store.getState()))
  })

  //Initial state (using all the defaults):
  //{ name: { fist: '<default fist>', last: '<default last>' }, number: 0 }

  store.dispatch({ type: 'INCREMENT'})                    //{ name: { fist: '<default fist>', last: '<default last>' }, number: 1 }
  store.dispatch({ type: 'SET_FIRST_NAME', value: 'Ana'}) //{ name: { fist: 'Ana', last: '<default last>' }, number: 1 }
  store.dispatch({ type: 'INCREMENT'})                    //{ name: { fist: 'Ana', last: '<default last>' }, number: 2 }
  store.dispatch({ type: 'SET_LAST_NAME', value: 'Silva'})//{ name: { fist: 'Ana', last: 'Silva' }, number: 2 }
  store.dispatch({ type: 'DECREMENT'})                    //{ name: { fist: 'Ana', last: 'Silva' }, number: 1 }
})
