import React from 'react'
import Sortable from 'react-sortablejs'

const SortableList = props =>
  <Sortable
    className="todo-list-items"
    options={{
      animation: 150
    }}
    tag="ul"
    onChange={(orderedKeys, sortable, evt) => {
      const tasks = { ...props.tasks }
      orderedKeys
        .reverse() //we need to reverse it because the list is in descending order (see TodoItems.render() method)
        .forEach((key, i) => tasks[key].order = i)
      props.updateAllTasks(tasks)
    }}
    >
    {props.children}
  </Sortable>

export default SortableList
