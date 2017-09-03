import React from 'react'
import './AddTodo.css'

class AddTodo extends React.Component {
  addTask = event => {
    event.preventDefault()
    this.props.addTask(this.taskInput.value.trim())
    this.taskInput.value = ''
    this.taskInput.focus()
  }

  render() {
    return (
      <div className="header">
        <form onSubmit={this.addTask}>
          <input
            className="shadow"
            type="text"
            placeholder="What needs to be done?"
            ref={ input => this.taskInput = input }
          />
          <button
            className="btn shadow fa fa-plus"
            aria-hidden="true"
            title="Add task"
            type="submit"
          />
          <button
            className="btn shadow fa fa-recycle"
            aria-hidden="true"
            title="Remove all tasks"
            onClick={this.props.removeAllTasks}
          />
        </form>
      </div>
    )
  }
}

export default AddTodo
