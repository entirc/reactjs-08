import React from 'react'
import PropTypes from 'prop-types'
import Sortable from 'react-sortablejs'

const SortableList = ({ children }) =>
  <Sortable
    className="todo-list-items"
    options={{
      animation: 150
    }}
    tag="ul"
    onChange={(orderedKeys, sortable, evt) => {
      const store = this.context.store
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

SortableList.contextTypes = {
  store: PropTypes.object
}

export default SortableList
