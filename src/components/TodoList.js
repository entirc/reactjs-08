import React, { Component } from 'react'
import Task from './Task'
import SortableList from './SortableList'
import './TodoList.css'

class TodoList extends Component {
  render() {
    const store = this.props.store
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
              store={store}
              task={task}
              index={key}
            />
          </li>
        )
      })
    return (
      <SortableList store={store}>
        {items}
      </SortableList>
    )
  }
}

export default TodoList
