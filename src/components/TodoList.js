import React, { Component } from 'react'
import TodoItems from './TodoItems'
import uuid from 'uuid/v4'
import './TodoList.css'

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: { }
    }
    this.addTask = this.addTask.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.toggleTaskState = this.toggleTaskState.bind(this)
    this.updateAllTasks = this.updateAllTasks.bind(this)
    this.updateTaskDescription = this.updateTaskDescription.bind(this)
    this.removeAllTasks = this.removeAllTasks.bind(this)
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

  addTask(event) {
    event.preventDefault()
    const description = this.taskInput.value.trim()
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
    this.taskInput.value = ''
    this.taskInput.focus()
  }

  deleteTask(key) {
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

  toggleTaskState(key, task) {
    const updatedTask = { ...task, active: !task.active }
    const tasks = { ...this.state.tasks, [key]: updatedTask }
    this.setState({ tasks })
  }

  updateTaskDescription(key, description) {
    const task = this.state.tasks[key]
    const updatedTask = { ...task, description }
    const tasks = { ...this.state.tasks, [key]: updatedTask }
    this.setState({ tasks })
  }

  updateAllTasks(newTasks) {
    this.setState({ tasks: newTasks })
  }

  removeAllTasks() {
    this.setState({ tasks: { } })
  }

  render() {
    return (
      <div className="todo-list-main">
        <div className="header">
          <form onSubmit={this.addTask}>
            <input 
              className="shadow"
              type="text" 
              placeholder="What needs to be done?"
              ref={ input => this.taskInput = input }
            />
            <button className="btn shadow fa fa-plus" aria-hidden="true" title="Add task" type="submit"></button>
            <button className="btn shadow fa fa-recycle" aria-hidden="true" title="Remove all tasks" onClick={this.removeAllTasks}></button>
          </form>
        </div>
        <TodoItems 
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

export default TodoList