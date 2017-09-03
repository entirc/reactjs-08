import React, { Component } from 'react'
import './Task.css'

class Task extends Component {
  constructor(props) {
    super(props)
    this.toggleTaskState = this.toggleTaskState.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.updateTaskDescription = this.updateTaskDescription.bind(this)
  }

  toggleTaskState(event) {
    event.preventDefault()
    this.props.toggleTaskState(this.props.index, this.props.task)
  }

  deleteTask() {
    this.props.deleteTask(this.props.index)    
  }

  updateTaskDescription() {
    const text = prompt('Update the task description', this.props.task.description)
    if (text != undefined) {
      if (text.length > 0) {
        this.props.updateTaskDescription(this.props.index, text)
      } else {
        this.deleteTask()
      }
    }
  }

  render() {
    const task = this.props.task
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