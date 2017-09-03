import React from 'react'
import PropTypes from 'prop-types'
import './AddTodo.css'

class AddTodo extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  }

  addTask = event => {
    event.preventDefault()
    if (this.taskInput.value.length > 0) {
      this.context.store.dispatch({
        type: 'ADD_TASK',
        description: this.taskInput.value.trim()
      })
    }
    this.taskInput.value = ''
    this.taskInput.focus()
  }

  removeAllTasks = () => {
    this.context.store.dispatch({
      type: 'REMOVE_ALL_TASKS'
    })
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
            onClick={this.removeAllTasks}
          />
        </form>
      </div>
    )
  }
}

export default AddTodo
