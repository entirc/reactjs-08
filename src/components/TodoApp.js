import React, { Component } from 'react'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import './TodoApp.css'

class TodoApp extends Component {
  componentWillMount() {
    this.props.store.subscribe(() => this.forceUpdate())
  }

  addTask = description => {
    this.props.store.dispatch({
      type: 'ADD_TASK',
      description
    })
  }

  deleteTask = key => {
    this.props.store.dispatch({
      type: 'DELETE_TASK',
      key
    })
  }

  toggleTaskState = key => {
    this.props.store.dispatch({
      type: 'TOGGLE_TASK',
      key
    })
  }

  updateTaskDescription = (key, description) => {
    this.props.store.dispatch({
      type: 'UPDATE_TASK_DESCRIPTION',
      key,
      description
    })
  }

  updateAllTasks = tasks => {
    this.props.store.dispatch({
      type: 'LOAD_TASKS',
      tasks
    })
  }

  removeAllTasks = () => {
    this.props.store.dispatch({
      type: 'REMOVE_ALL_TASKS'
    })
  }

  render() {
    return (
      <div className="todo-list-main">
        <AddTodo
          addTask={this.addTask}
          removeAllTasks={this.removeAllTasks}
        />
        <TodoList
          tasks={this.props.store.getState()}
          deleteTask={this.deleteTask}
          toggleTaskState={this.toggleTaskState}
          updateAllTasks={this.updateAllTasks}
          updateTaskDescription={this.updateTaskDescription}
        />
      </div>
    )
  }
}

export default TodoApp
