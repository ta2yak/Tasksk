import connectToStores from 'alt/utils/connectToStores'
import React from 'react'
import { Draggable, Droppable } from 'react-drag-and-drop'

import BoardActions from '../actions/board'
import TasksStore from '../stores/tasks'

import CreateTaskModal from '../components/parts/createTaskModal'
import TaskCard from '../components/parts/taskCard'

class Board extends React.Component {

  static getStores() {
    return [TasksStore]
  }

  static getPropsFromStores() {
    return TasksStore.getState()
  }  

  toToDo(data) {
    if (data.todo) BoardActions.moveToDo(data.todo)
    if (data.done) BoardActions.moveToDo(data.done)
    if (data.doing) BoardActions.moveToDo(data.doing)
    if (data.archive) BoardActions.moveToDo(data.archive)
  }

  toDoing(data) {
    if (data.todo) BoardActions.moveDoing(data.todo)
    if (data.done) BoardActions.moveDoing(data.done)
    if (data.doing) BoardActions.moveDoing(data.doing)
    if (data.archive) BoardActions.moveDoing(data.archive)
  }

  toDone(data) {
    if (data.todo) BoardActions.moveDone(data.todo)
    if (data.done) BoardActions.moveDone(data.done)
    if (data.doing) BoardActions.moveDone(data.doing)
    if (data.archive) BoardActions.moveDone(data.archive)
  }

  toArchive(data) {
    if (data.todo) BoardActions.moveArchive(data.todo)
    if (data.done) BoardActions.moveArchive(data.done)
    if (data.doing) BoardActions.moveArchive(data.doing)
    if (data.archive) BoardActions.moveArchive(data.archive)
  }

  render() {

    let loading = this.props.loading ? (
                    <div className="progress">
                      <div className="indeterminate"></div>
                    </div>
                  ) : (<div/>)

    let todoElements =
        this.props.todoTasks.map(function(task, index) {
          return (
            <Draggable type="todo" data={task.id} key={index}>
              <TaskCard task={task} />
            </Draggable>
          )
        })

    let doingElements = 
        this.props.doingTasks.map(function(task, index) {
          return (
            <Draggable type="doing" data={task.id} key={index}>
              <TaskCard task={task} />
            </Draggable>
          )
        })

    let doneElements = 
        this.props.doneTasks.map(function(task, index) {
          return (
            <Draggable type="done" data={task.id} key={index}>
              <TaskCard task={task} />
            </Draggable>
          )
        })

    let archiveElements = 
        this.props.archiveTasks.map(function(task, index) {
          return (
            <Draggable type="archive" data={task.id} key={index}>
              <TaskCard task={task} />
            </Draggable>
          )
        })

    return (
    	<div>

        {loading}

        <div className="row">

          <div className="col s3">

            <Droppable
                types={['doing', 'done', 'archive']}
                onDrop={this.toToDo.bind(this)}>

              <div>
                <div className="card teal">
                  <div className="card-content white-text">
                    <span className="card-title">To Do</span>
                  </div>
                  <div className="card-action">
                    <CreateTaskModal type="ToDo"/>
                  </div>
                </div>

                {todoElements}
              </div>
            </Droppable>

          </div>

          <div className="col s3">

            <Droppable
                types={['todo', 'done', 'archive']}
                onDrop={this.toDoing.bind(this)}>

              <div>

                <div className="card teal darken-1">
                  <div className="card-content white-text">
                    <span className="card-title">Doing</span>
                  </div>
                  <div className="card-action">
                    <CreateTaskModal type="Doing"/>
                  </div>
                </div>

                {doingElements}
              </div>
            </Droppable>

          </div>

          <div className="col s3">

            <Droppable
                types={['doing', 'todo', 'archive']}
                onDrop={this.toDone.bind(this)}>

              <div>

                <div className="card teal darken-2">
                  <div className="card-content white-text">
                    <span className="card-title">Done</span>
                  </div>
                  <div className="card-action">
                    <CreateTaskModal type="Done"/>
                  </div>
                </div>

                {doneElements}
              </div>
            </Droppable>

          </div>

          <div className="col s3">

            <Droppable
                types={['doing', 'done', 'todo']}
                onDrop={this.toArchive.bind(this)}>

              <div>

                <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <span className="card-title">Archive</span>
                  </div>
                  <div className="card-action">
                    <CreateTaskModal type="Archive"/>
                  </div>
                </div>

                {archiveElements}
              </div>
            </Droppable>

          </div>

        </div>

	    </div>
    )
  }

}

export default connectToStores(Board)
