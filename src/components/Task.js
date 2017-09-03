import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Task.css'

class Task extends Component {
  static contextTypes = {
    store: PropTypes.object
  }

  toggleTaskState = event => {
    event.preventDefault()
    this.context.store.dispatch({
      type: 'TOGGLE_TASK',
      key: this.props.index
    })
  }

  deleteTask = () => {
    this.context.store.dispatch({
      type: 'DELETE_TASK',
      key: this.props.index
    })
  }

  updateTaskDescription = () => {
    const task = this.getCurrentTask()
    const text = prompt('Update the task description', task.description)
    if (text != undefined) {
      if (text.length > 0) {
        this.context.store.dispatch({
          type: 'UPDATE_TASK_DESCRIPTION',
          key: this.props.index,
          description: text
        })
      } else {
        this.context.store.dispatch({
          type: 'DELETE_TASK',
          key: this.props.index
        })
      }
    }
  }

  getCurrentTask = () => {
    return this.context.store.getState()[this.props.index]
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
