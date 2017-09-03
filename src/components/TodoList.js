import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Task from './Task'
import SortableList from './SortableList'
import './TodoList.css'

class TodoList extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  render() {
    const store = this.context.store
    const tasks = store.getState()
    const items = Object.getOwnPropertyNames(tasks)
      .sort((leftKey, rightKey) => {
        const leftTask = tasks[leftKey]
        const rightTask = tasks[rightKey]
        return rightTask.order - leftTask.order //descending order
      })
      .map(key => {
        const task = tasks[key]
        return (
          <li key={key}
              data-id={key}> {/* data-id is only used by SortableJS */}
            <Task
              task={task}
              index={key}
            />
          </li>
        )
      })
    return (
      <SortableList>
        {items}
      </SortableList>
    )
  }
}

export default TodoList
