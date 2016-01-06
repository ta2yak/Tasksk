import React from 'react'
import Modal from 'simple-react-modal'
import keydown from 'react-keydown'
import moment from 'moment'

class TimeHistoryModal extends React.Component {

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

  render() {

    let task  = this.props.task

    return (

      <span>
        <a className="btn-floating yellow darken-1"><i className="material-icons" onClick={this.show.bind(this)}>query_builder</i></a>

        <Modal show={this.state.show} onClose={this.close.bind(this)} draggable="false" 
               closeOnOuterClick={true} style={{backgroundColor: 'rgba(255, 255, 255, 0.90)'}}>

          <div className="card teal">
            <div className="card-content">

              <h4 className="white-text">タイムヒストリー</h4>

              <h6 className="white-text">期限 </h6>
              <p>{task.limit ? moment(task.limit).fromNow() : "Not Set"}</p>
              <br/>
              
              <h6 className="white-text">作成 </h6>
              <p>{task.createdAt ? moment(task.createdAt).fromNow() : "Not Set"}</p>
              <br/>
              
              <h6 className="white-text">編集 </h6>
              <p>{task.updatedAt ? moment(task.updatedAt).fromNow() : "Not Set"}</p>
              <br/>
              
              <h6 className="white-text">移動 </h6>
              <p>{task.movedAt ? moment(task.movedAt).fromNow() : "Not Set"}</p>
              <br/>

              <h6 className="white-text">完了 </h6>
              <p>{task.closedAt ? moment(task.closedAt).fromNow() : "Not Set"}</p>
              <br/>

            </div>

          </div>
        </Modal>

      </span>

    )

  }

}

TimeHistoryModal.propTypes = {
  task: React.PropTypes.object.isRequired
}


export default TimeHistoryModal
