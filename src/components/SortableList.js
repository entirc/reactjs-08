import React from 'react'
import Sortable from 'react-sortablejs'

const SortableList = ({ store, children }) =>
  <Sortable
    className="todo-list-items"
    options={{
      animation: 150
    }}
    tag="ul"
    onChange={(orderedKeys, sortable, evt) => {
      const tasks = { ...store.getState() }
      orderedKeys
        .reverse() //we need to reverse it because the list is in descending order (see TodoItems.render() method)
        .forEach((key, i) => tasks[key].order = i)
      store.dispatch({
        type: 'LOAD_TASKS',
        tasks
      })
    }}
    >
    {children}
  </Sortable>

export default SortableList
