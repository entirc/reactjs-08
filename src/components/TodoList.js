import React, { Component } from 'react'
import Task from './Task'
import SortableList from './SortableList'
import './TodoList.css'

class TodoList extends Component {
  render() {
    const items = Object.getOwnPropertyNames(this.props.tasks)
      .sort((leftKey, rightKey) => {
        const leftTask = this.props.tasks[leftKey]
        const rightTask = this.props.tasks[rightKey]
        return rightTask.order - leftTask.order //descending order
      })
      .map(key => {
        const task = this.props.tasks[key]
        return (
          <li key={key}
              data-id={key}> {/* data-id is only used by SortableJS */}
            <Task
              task={task}
              index={key}
              deleteTask={this.props.deleteTask}
              toggleTaskState={this.props.toggleTaskState}
              updateTaskDescription={this.props.updateTaskDescription}
            />
          </li>
        )
      })
    return <SortableList
              tasks={this.props.tasks}
              updateAllTasks={this.props.updateAllTasks}>
              {items}
            </SortableList>
  }
}

export default TodoList
