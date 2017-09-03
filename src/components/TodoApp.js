import React, { Component } from 'react'
import uuid from 'uuid/v4'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import './TodoApp.css'

class TodoApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: { }
    }
  }

  componentWillMount() {
    const tasks = JSON.parse(localStorage.getItem(`tasks`))
    if (tasks) {
      this.setState({ tasks })
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`tasks`, JSON.stringify(nextState.tasks))
  }

  addTask = description => {
    if (description.length > 0) {
      const key = uuid()
      const task = {
        order: Object.getOwnPropertyNames(this.state.tasks).length,
        description,
        active: true
      }
      const tasks = { ...this.state.tasks, [key]: task }
      this.setState({ tasks })
    }
  }

  deleteTask = key => {
    const tasks = { ...this.state.tasks }
    delete tasks[key]

    //reordering the tasks
    Object.getOwnPropertyNames(tasks)
      .sort((leftKey, rightKey) => {
        const leftTask = tasks[leftKey]
        const rightTask = tasks[rightKey]
        return leftTask.order - rightTask.order
      })
      .forEach((key, i) => {
        tasks[key].order = i
      })

    this.setState({ tasks })
  }

  toggleTaskState = (key, task) => {
    const updatedTask = { ...task, active: !task.active }
    const tasks = { ...this.state.tasks, [key]: updatedTask }
    this.setState({ tasks })
  }

  updateTaskDescription = (key, description) => {
    const task = this.state.tasks[key]
    const updatedTask = { ...task, description }
    const tasks = { ...this.state.tasks, [key]: updatedTask }
    this.setState({ tasks })
  }

  updateAllTasks = newTasks => {
    this.setState({ tasks: newTasks })
  }

  removeAllTasks = () => {
    this.setState({ tasks: { } })
  }

  render() {
    return (
      <div className="todo-list-main">
        <AddTodo
          addTask={this.addTask}
          removeAllTasks={this.removeAllTasks}
        />
        <TodoList
          tasks={this.state.tasks}
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
