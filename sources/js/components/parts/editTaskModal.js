import React from 'react'
import Modal from 'simple-react-modal'
import keydown from 'react-keydown'
import moment from 'moment'
import BoardActions from '../../actions/board'

import DatePicker from '../../components/parts/datePicker'

class EditTaskModal extends React.Component {

  constructor(){
    super()
    this.state = {show: false}
  }

  show(){
    this.setState({show: true})
  }

  @keydown('esc')
  close(){
    this.setState({show: false})
  }

  @keydown('ctrl+s')
  updateTask(e) {
    let title = React.findDOMNode(this.refs.title).value.trim()
    let body = React.findDOMNode(this.refs.body).value.trim()
    let limit = React.findDOMNode(this.refs.limit).value
    limit = limit ? moment(React.findDOMNode(this.refs.limit).value) : null
    let tags = React.findDOMNode(this.refs.tags).value.trim()

    if (title.length == 0) return;

    let task = this.props.task
    task.title = title
    task.body = body
    task.limit = limit
    task.tags = tags

    BoardActions.updateTask(task)

    this.setState({show: false})
    Materialize.toast("タスクを更新しました", 5000)
  }

  closeTask(e) {

    let task = this.props.task
    BoardActions.closeTask(task)

    this.setState({show: false})
    Materialize.toast("タスクをクローズしました", 5000)
  }

  render() {

    let task  = this.props.task

    return (

      <span>
        <a className="btn-floating teal"><i className="material-icons" onClick={this.show.bind(this)}>edit</i></a>

        <Modal show={this.state.show} onClose={this.close.bind(this)} draggable="false" 
               closeOnOuterClick={true} style={{backgroundColor: 'rgba(255, 255, 255, 0.90)'}}>

          <div className="card teal">
            <div className="card-content">
              <h4 className="white-text">Edit {this.props.type}</h4>

              <div className="row">
                <div className="input-field col s12">
                  <input type="text" autoFocus className="white-text" ref="title" defaultValue={task.title}></input>
                  <label className="active white-text">Title</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <textarea className="white-text materialize-textarea" ref="body" defaultValue={task.body}></textarea>
                  <label className="active white-text">Body</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <DatePicker className="white-text" ref="limit" defaultValue={task.limit}/>
                  <label className="active white-text">Limit</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input type="text" className="white-text" ref="tags" defaultValue={task.tags}></input>
                  <label className="active white-text">Tags</label>
                </div>
              </div>

            </div>


            <div className="card-action">
              <a onClick={this.updateTask.bind(this)} className="btn waves-effect waves-light white-text">Update</a>
              <a onClick={this.closeTask.bind(this)} className="btn waves-effect waves-light pink white-text">Finish</a>
            </div>
          </div>
        </Modal>

      </span>

    )

  }

}

EditTaskModal.propTypes = {
  task: React.PropTypes.object.isRequired
}


export default EditTaskModal
