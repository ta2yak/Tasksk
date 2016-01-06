import alt from '../alt'

class BoardActions {

  createToDo(data){
    this.dispatch(data)
  }

  createDoing(data){
    this.dispatch(data)
  }

  createDone(data){
    this.dispatch(data)
  }

  createArchive(data){
    this.dispatch(data)
  }

  moveToDo(id){
    this.dispatch(id)
  }

  moveDoing(id){
    this.dispatch(id)
  }

  moveDone(id){
    this.dispatch(id)
  }

  moveArchive(id){
    this.dispatch(id)
  }

  updateTask(data){
    this.dispatch(data)
  }

  closeTask(data){
    this.dispatch(data)
  }

}

export default alt.createActions(BoardActions)
