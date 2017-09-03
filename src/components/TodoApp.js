import React from 'react'
import { connect } from 'react-redux'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import './TodoApp.css'

const TodoApp = () => (
  <div className="todo-list-main">
    <AddTodo/>
    <TodoList/>
  </div>
)

export default connect()(TodoApp)
