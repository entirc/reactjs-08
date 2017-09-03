import React, { Component } from 'react'
import './Task.css'

class Task extends Component {
  toggleTaskState = event => {
    event.preventDefault()
    this.props.store.dispatch({
      type: 'TOGGLE_TASK',
      key: this.props.index
    })
  }

  deleteTask = () => {
    this.props.store.dispatch({
      type: 'DELETE_TASK',
      key: this.props.index
    })
  }

  updateTaskDescription = () => {
    const task = this.getCurrentTask()
    const text = prompt('Update the task description', task.description)
    if (text != undefined) {
      if (text.length > 0) {
        this.props.store.dispatch({
          type: 'UPDATE_TASK_DESCRIPTION',
          key: this.props.index,
          description: text
        })
      } else {
        this.props.store.dispatch({
          type: 'DELETE_TASK',
          key: this.props.index
        })
      }
    }
  }

  getCurrentTask = () => {
    return this.props.store.getState()[this.props.index]
  }

  render() {
    const task = this.getCurrentTask()
    const classes = [task.active ? 'task-active' : 'task-inactive']
    return (
      <div className='task'>
        <span className={classes.join(' ')}>
          <a
            href="#"
            onClick={this.toggleTaskState}>
            {task.description}
          </a>
        </span>
        <button className="btn shadow fa fa-trash" aria-hidden="true" title="Remove task" onClick={this.deleteTask}></button>
        <button className="btn shadow fa fa-pencil" aria-hidden="true" title="Update task" onClick={this.updateTaskDescription}></button>
      </div>
    )
  }
}

export default Task
