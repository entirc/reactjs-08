import React from 'react'
import Sortable from 'react-sortablejs'

const SortableList = (props) => 
  <Sortable
    className="todo-list-items"
    options={{
      animation: 150
    }}
    tag="ul"

    // Allows you to implement a controlled component and keep
    // DOM nodes untouched. You have to change state to re-render the component.
    // @param {Array} order An ordered array of items defined by the `data-id` attribute.
    // @param {Object} sortable The sortable instance.
    // @param {Event} evt The event object.
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