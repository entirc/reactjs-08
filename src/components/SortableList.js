import React from 'react'
import { connect } from 'react-redux'
import Sortable from 'react-sortablejs'

const SortableList = ({ tasks, loadTasks, children }) =>
  <Sortable
    className="todo-list-items"
    options={{
      animation: 150
    }}
    tag="ul"
    onChange={(orderedKeys, sortable, evt) => {
      const orderedTasks = { ...tasks }
      orderedKeys
        .reverse() //we need to reverse it because the list is in descending order (see TodoItems.render() method)
        .forEach((key, i) => orderedTasks[key].order = i)
      loadTasks(orderedTasks)
    }}
    >
    {children}
  </Sortable>

const mapStateToProps = state => ({
  tasks: state
})

const mapDispatchToProps = dispatch => ({
  loadTasks: tasks => dispatch({
    type: 'LOAD_TASKS',
    tasks
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(SortableList)
