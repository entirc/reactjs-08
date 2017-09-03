import React from 'react'
import { connect } from 'react-redux'
import './Task.css'

class Task extends React.Component {
  toggleTaskState = event => {
    event.preventDefault()
    this.props.toggleTaskState()
  }

  updateTaskDescription = () => {
    const task = this.props.currentTask
    const text = prompt('Update the task description', task.description)
    if (text != undefined) {
      if (text.length > 0) {
        this.props.updateTaskDescription(text)
      } else {
        this.props.deleteTask()
      }
    }
  }

  render() {
    const task = this.props.currentTask
    const classes = [task.active ? 'task-active' : 'task-inactive']
    return (
      <div className='task'>
        <span className={classes.join(' ')}>
          <a
            href="#"
            onClick={this.toggleTaskState}>
            {task.description}
          </a>
        </span>
        <button className="btn shadow fa fa-trash" aria-hidden="true" title="Remove task" onClick={this.props.deleteTask}></button>
        <button className="btn shadow fa fa-pencil" aria-hidden="true" title="Update task" onClick={this.updateTaskDescription}></button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentTask: state[ownProps.index]
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateTaskDescription: description => dispatch({
    type: 'UPDATE_TASK_DESCRIPTION',
    key: ownProps.index,
    description
  }),
  deleteTask: () => dispatch({
    type: 'DELETE_TASK',
    key: ownProps.index
  }),
  toggleTaskState: () => dispatch({
    type: 'TOGGLE_TASK',
    key: ownProps.index
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(Task)
