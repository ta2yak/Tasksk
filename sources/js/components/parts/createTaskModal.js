import React from 'react'
import Modal from 'simple-react-modal'
import keydown from 'react-keydown'
import moment from 'moment'
import BoardActions from '../../actions/board'

import DatePicker from '../../components/parts/datePicker'

class CreateTaskModal extends React.Component {

  constructor(){
    super()
    this.state = {show: false}
  }

  show(){
    this.setState({show: true})
  }

  close(){
    this.setState({show: false})
  }

  @keydown('ctrl+s')
  createTask(e) {
    let title = React.findDOMNode(this.refs.title).value.trim()
    let body = React.findDOMNode(this.refs.body).value.trim()
    let limit = React.findDOMNode(this.refs.limit).value
    limit = limit ? moment(React.findDOMNode(this.refs.limit).value) : null
    let tags = React.findDOMNode(this.refs.tags).value.trim()

    if (title.length == 0) return;

    switch (this.props.type){
     case 'ToDo':
        BoardActions.createToDo({title: title, body: body, limit: limit, tags: tags})
        break;
      case 'Doing':
        BoardActions.createDoing({title: title, body: body, limit: limit, tags: tags})
        break;
      case 'Done':
        BoardActions.createDone({title: title, body: body, limit: limit, tags: tags})
        break;
      case 'Archive':
        BoardActions.createArchive({title: title, body: body, limit: limit, tags: tags})
        break;
    }

    React.findDOMNode(this.refs.title).value = ""
    React.findDOMNode(this.refs.body).value = ""
    React.findDOMNode(this.refs.limit).value = ""
    React.findDOMNode(this.refs.tags).value = ""

    this.setState({show: false})
    Materialize.toast("タスクを追加しました", 5000)
  }

  render() {

    return (

      <div>

        <a className="btn waves-effect waves-light white-text" onClick={this.show.bind(this)} >
          Add Task
          <i className="material-icons right">add</i>
        </a>

        <Modal show={this.state.show} onClose={this.close.bind(this)} 
               closeOnOuterClick={true} style={{backgroundColor: 'rgba(255, 255, 255, 0.75)'}}>

          <div className="card teal">
            <div className="card-content">
              <h4 className="white-text">Add {this.props.type}</h4>

              <div className="row">
                <div className="input-field col s12">
                  <input autoFocus type="text" className="white-text" ref="title"></input>
                  <label className="white-text">Title</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <textarea className="white-text materialize-textarea" ref="body"></textarea>
                  <label className="white-text">Body</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <DatePicker className="white-text" ref="limit"/>
                  <label className="white-text">Limit</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input type="text" className="white-text" ref="tags"></input>
                  <label className="white-text">Tags</label>
                </div>
              </div>

            </div>
            <div className="card-action">
              <a onClick={this.createTask.bind(this)} className="btn waves-effect waves-light white-text">Create</a>
            </div>
          </div>

        </Modal>

      </div>

    )

  }

}

CreateTaskModal.propTypes = {
  type: React.PropTypes.oneOf(['ToDo', 'Doing', 'Done', 'Archive']).isRequired
}


export default CreateTaskModal
