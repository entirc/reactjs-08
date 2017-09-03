import React from 'react'
import { connect } from 'react-redux'
import Task from './Task'
import SortableList from './SortableList'
import './TodoList.css'

const TodoList = ({ tasks }) => {
  const items = Object.getOwnPropertyNames(tasks)
    .sort((leftKey, rightKey) => {
      const leftTask = tasks[leftKey]
      const rightTask = tasks[rightKey]
      return rightTask.order - leftTask.order //descending order
    })
    .map(key => {
      const task = tasks[key]
      return (
        <li key={key} data-id={key}> {/* data-id is only used by SortableJS */}
          <Task index={key}/>
        </li>
      )
    })
  return (
    <SortableList>
      {items}
    </SortableList>
  )
}

const mapStateToProps = state => ({
  tasks: state
})

export default connect(mapStateToProps)(TodoList)
