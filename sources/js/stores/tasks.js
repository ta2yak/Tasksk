import Alt from '../alt'
import BoardActions from '../actions/board'
import moment from 'moment'

class TasksStore {

  // **************************************************** 
  // コンストラクタ
  // **************************************************** 
  constructor() {
    this.bindActions(BoardActions)

    // 初期処理 (localStorage)
    if (!localStorage.state) localStorage.state = JSON.stringify({
      loading: false,
      todoTasks: [
      ],
      doingTasks: [
      ],
      doneTasks: [
      ],
      archiveTasks: [
      ],
      errors: [],
    })
    if (!localStorage.rowNumber || localStorage.rowNumber < 0) localStorage.rowNumber = 0

    this.state = JSON.parse(localStorage.state)
  }

  // **************************************************** 
  // ToDoステータスのタスクを作成
  // **************************************************** 
  onCreateToDo(data){

    let id = localStorage.rowNumber + 1

    data = _.extend({id: id, type: "ToDo", createdAt: new Date(), updatedAt: new Date(), movedAt: null, closedAt: null, visible: true}, data)
    var todos = this.state.todoTasks;
    todos = _.union(todos, [data])

    todos = _.sortBy(todos, function(todo){ return moment(todo.limit).subtract(todo.days, 'days').format('X') })
    this.setState({ loading: false, errors: [], todoTasks: todos })
    localStorage.state = JSON.stringify(this.state)

    localStorage.rowNumber = id
  }

  // **************************************************** 
  // Doingステータスのタスクを作成
  // **************************************************** 
  onCreateDoing(data){
    let id = localStorage.rowNumber + 1

    data = _.extend({id: id, type: "Doing", createdAt: new Date(), updatedAt: new Date(), movedAt: null, closedAt: null, visible: true}, data)
    var doings   = this.state.doingTasks;
    doings = _.union(doings, [data])

    doings = _.sortBy(doings, function(todo){ return moment(todo.limit).subtract(todo.days, 'days').format('X') })
    this.setState({ loading: false, errors: [], doingTasks: doings })
    localStorage.state = JSON.stringify(this.state)

    localStorage.rowNumber = id
  }

  // **************************************************** 
  // Doneステータスのタスクを作成
  // **************************************************** 
  onCreateDone(data){
    let id = localStorage.rowNumber + 1

    data = _.extend({id: id, type: "Done", createdAt: new Date(), updatedAt: new Date(), movedAt: null, closedAt: null, visible: true}, data)
    var dones    = this.state.doneTasks;
    dones = _.union(dones, [data])

    dones = _.sortBy(dones, function(todo){ return moment(todo.limit).subtract(todo.days, 'days').format('X') })
    this.setState({ loading: false, errors: [], doneTasks: dones })
    localStorage.state = JSON.stringify(this.state)

    localStorage.rowNumber = id
  }

  // **************************************************** 
  // Archiveステータスのタスクを作成
  // **************************************************** 
  onCreateArchive(data){
    let id = localStorage.rowNumber + 1

    data = _.extend({id: id, type: "Archive", createdAt: new Date(), updatedAt: new Date(), movedAt: null, closedAt: null, visible: true}, data)
    var archives = this.state.archiveTasks;
    archives = _.union(archives, [data])

    archives = _.sortBy(archives, function(todo){ return moment(todo.limit).subtract(todo.days, 'days').format('X') })
    this.setState({ loading: false, errors: [], archiveTasks: archives })
    localStorage.state = JSON.stringify(this.state)

    localStorage.rowNumber = id
  }

  // **************************************************** 
  // ToDoステータスへタスクを移動
  // **************************************************** 
  onMoveToDo(id) {
    var todos    = this.state.todoTasks;
    var doings   = this.state.doingTasks;
    var dones    = this.state.doneTasks;
    var archives = this.state.archiveTasks;

    var filterdDoings = _.filter(doings, function(task){ return task.id == id; });
    if (filterdDoings.length > 0){
      _.each(filterdDoings, function(task){
        task.movedAt = new Date() 
        task.type = "ToDo" 
      })
      todos  = _.union(todos, filterdDoings)
      doings = _.reject(doings, function(task){ return task.id == id; });
    }

    var filterdDones = _.filter(dones, function(task){ return task.id == id; });
    if (filterdDones.length > 0){
      _.each(filterdDones, function(task){ 
        task.movedAt = new Date()
        task.type = "ToDo" 
      })
      todos = _.union(todos, filterdDones)
      dones = _.reject(dones, function(task){ return task.id == id; });
    }

    var filterdArchives = _.filter(archives, function(task){ return task.id == id; });
    if (filterdArchives.length > 0){
      _.each(filterdArchives, function(task){ 
        task.movedAt = new Date()
        task.type = "ToDo" 
      })
      todos    = _.union(todos, filterdArchives)
      archives = _.reject(archives, function(task){ return task.id == id; });
    }

    todos    = _.sortBy(todos, function(todo){ return moment(todo.limit).subtract(todo.days, 'days').format('X') })
    doings   = _.sortBy(doings, function(todo){ return moment(todo.limit).subtract(todo.days, 'days').format('X') })
    dones    = _.sortBy(dones, function(todo){ return moment(todo.limit).subtract(todo.days, 'days').format('X') })
    archives = _.sortBy(archives, function(todo){ return moment(todo.limit).subtract(todo.days, 'days').format('X') })
    this.setState({ loading: false, errors: [], 
                    todoTasks: todos, doingTasks: doings, doneTasks: dones, archiveTasks: archives })
    localStorage.state = JSON.stringify(this.state)
  }

  // **************************************************** 
  // Doingステータスへタスクを移動
  // **************************************************** 
  onMoveDoing(id) {
    var todos    = this.state.todoTasks;
    var doings   = this.state.doingTasks;
    var dones    = this.state.doneTasks;
    var archives = this.state.archiveTasks;

    var filterdToDos = _.filter(todos, function(task){ return task.id == id; });
    if (filterdToDos.length > 0){
      _.each(filterdToDos, function(task){ 
        task.movedAt = new Date()
        task.type = "Doing" 
      })
      doings = _.union(doings, filterdToDos)
      todos  = _.reject(todos, function(task){ return task.id == id; });
    }

    var filterdDones = _.filter(dones, function(task){ return task.id == id; });
    if (filterdDones.length > 0){
      _.each(filterdDones, function(task){ 
        task.movedAt = new Date()
        task.type = "Doing" 
      })
      doings = _.union(doings, filterdDones)
      dones  = _.reject(dones, function(task){ return task.id == id; });
    }

    var filterdArchives = _.filter(archives, function(task){ return task.id == id; });
    if (filterdArchives.length > 0){
      _.each(filterdArchives, function(task){ 
        task.movedAt = new Date()
        task.type = "Doing" 
      })
      doings   = _.union(doings, filterdArchives)
      archives = _.reject(archives, function(task){ return task.id == id; });
    }

    todos    = _.sortBy(todos, function(todo){ return moment(todo.limit).subtract(todo.days, 'days').format('X') })
    doings   = _.sortBy(doings, function(todo){ return moment(todo.limit).subtract(todo.days, 'days').format('X') })
    dones    = _.sortBy(dones, function(todo){ return moment(todo.limit).subtract(todo.days, 'days').format('X') })
    archives = _.sortBy(archives, function(todo){ return moment(todo.limit).subtract(todo.days, 'days').format('X') })
    this.setState({ loading: false, errors: [], 
                    todoTasks: todos, doingTasks: doings, doneTasks: dones, archiveTasks: archives })
    localStorage.state = JSON.stringify(this.state)
  }

  // **************************************************** 
  // Doneステータスへタスクを移動
  // **************************************************** 
  onMoveDone(id) {
    var todos = this.state.todoTasks;
    var doings = this.state.doingTasks;
    var dones = this.state.doneTasks;
    var archives = this.state.archiveTasks;

    var filterdToDos = _.filter(todos, function(task){ return task.id == id; });
    if (filterdToDos.length > 0){
      _.each(filterdToDos, function(task){ 
        task.movedAt = new Date()
        task.type = "Done" 
      })
      dones = _.union(dones, filterdToDos)
      todos = _.reject(todos, function(task){ return task.id == id; });
    }

    var filterdDoings = _.filter(doings, function(task){ return task.id == id; });
    if (filterdDoings.length > 0){
      _.each(filterdDoings, function(task){ 
        task.movedAt = new Date()
        task.type = "Done" 
      })
      dones  = _.union(dones, filterdDoings)
      doings = _.reject(doings, function(task){ return task.id == id; });
    }

    var filterdArchives = _.filter(archives, function(task){ return task.id == id; });
    if (filterdArchives.length > 0){
      _.each(filterdArchives, function(task){ 
        task.movedAt = new Date()
        task.type = "Done" 
      })
      dones    = _.union(dones, filterdArchives)
      archives = _.reject(archives, function(task){ return task.id == id; });
    }

    todos    = _.sortBy(todos, function(todo){ return moment(todo.limit).subtract(todo.days, 'days').format('X') })
    doings   = _.sortBy(doings, function(todo){ return moment(todo.limit).subtract(todo.days, 'days').format('X') })
    dones    = _.sortBy(dones, function(todo){ return moment(todo.limit).subtract(todo.days, 'days').format('X') })
    archives = _.sortBy(archives, function(todo){ return moment(todo.limit).subtract(todo.days, 'days').format('X') })
    this.setState({ loading: false, errors: [], 
                    todoTasks: todos, doingTasks: doings, doneTasks: dones, archiveTasks: archives })
    localStorage.state = JSON.stringify(this.state)
  }

  // **************************************************** 
  // Archiveステータスへタスクを移動
  // **************************************************** 
  onMoveArchive(id) {
    var todos = this.state.todoTasks;
    var doings = this.state.doingTasks;
    var dones = this.state.doneTasks;
    var archives = this.state.archiveTasks;

    var filterdToDos = _.filter(todos, function(task){ return task.id == id; });
    if (filterdToDos.length > 0){
      _.each(filterdToDos, function(task){ 
        task.movedAt = new Date()
        task.type = "Archive" 
      })
      archives = _.union(archives, filterdToDos)
      todos    = _.reject(todos, function(task){ return task.id == id; });
    }

    var filterdDoings = _.filter(doings, function(task){ return task.id == id; });
    if (filterdDoings.length > 0){
      _.each(filterdDoings, function(task){ 
        task.movedAt = new Date()
        task.type = "Archive" 
      })
      archives = _.union(archives, filterdDoings)
      doings   = _.reject(doings, function(task){ return task.id == id; });
    }

    var filterdDones = _.filter(dones, function(task){ return task.id == id; });
    if (filterdDones.length > 0){
      _.each(filterdDones, function(task){ 
        task.movedAt = new Date()
        task.type = "Archive" 
      })
      archives = _.union(archives, filterdDones)
      dones    = _.reject(dones, function(task){ return task.id == id; });
    }

    todos    = _.sortBy(todos, function(todo){ return moment(todo.limit).subtract(todo.days, 'days').format('X') })
    doings   = _.sortBy(doings, function(todo){ return moment(todo.limit).subtract(todo.days, 'days').format('X') })
    dones    = _.sortBy(dones, function(todo){ return moment(todo.limit).subtract(todo.days, 'days').format('X') })
    archives = _.sortBy(archives, function(todo){ return moment(todo.limit).subtract(todo.days, 'days').format('X') })
    this.setState({ loading: false, errors: [], 
                    todoTasks: todos, doingTasks: doings, doneTasks: dones, archiveTasks: archives })
    localStorage.state = JSON.stringify(this.state)
  }

  // **************************************************** 
  // タスク情報の更新
  // **************************************************** 
  onUpdateTask(data) {

    var todos = this.state.todoTasks;
    var doings = this.state.doingTasks;
    var dones = this.state.doneTasks;
    var archives = this.state.archiveTasks;

    _.each(todos, function(task){
      if (data.id == task.id){
        task.title     = data.title
        task.body      = data.body
        task.limit      = data.limit
        task.days      = data.days
        task.tags      = data.tags
        task.updatedAt = new Date()
        task.visible = true
      } 
    });
        
    _.each(doings, function(task){
      if (data.id == task.id){
        task.title     = data.title
        task.body      = data.body
        task.limit      = data.limit
        task.days      = data.days
        task.tags      = data.tags
        task.updatedAt = new Date()
        task.visible = true
      }
    });

    _.each(dones, function(task){
      if (data.id == task.id){
        task.title     = data.title
        task.body      = data.body
        task.limit      = data.limit
        task.days      = data.days
        task.tags      = data.tags
        task.updatedAt = new Date()
        task.visible = true
      }
    });

    _.each(archives, function(task){
      if (data.id == task.id){
        task.title     = data.title
        task.body      = data.body
        task.limit      = data.limit
        task.days      = data.days
        task.tags      = data.tags
        task.updatedAt = new Date()
        task.visible = true
      }
    });

    todos    = _.sortBy(todos, function(todo){ return moment(todo.limit).subtract(todo.days, 'days').format('X') })
    doings   = _.sortBy(doings, function(todo){ return moment(todo.limit).subtract(todo.days, 'days').format('X') })
    dones    = _.sortBy(dones, function(todo){ return moment(todo.limit).subtract(todo.days, 'days').format('X') })
    archives = _.sortBy(archives, function(todo){ return moment(todo.limit).subtract(todo.days, 'days').format('X') })
    this.setState({ loading: false, errors: [], 
                    todoTasks: todos, doingTasks: doings, doneTasks: dones, archiveTasks: archives })
    localStorage.state = JSON.stringify(this.state)
  }

  // **************************************************** 
  // タスク情報の非表示化
  // **************************************************** 
  onCloseTask(data) {

    var todos = this.state.todoTasks;
    var doings = this.state.doingTasks;
    var dones = this.state.doneTasks;
    var archives = this.state.archiveTasks;

    _.each(todos, function(task){
      if (data.id == task.id){
        task.visible = false
        task.closedAt = new Date()
      }
    });
        
    _.each(doings, function(task){
      if (data.id == task.id){
        task.visible = false
        task.closedAt = new Date()
      }
    });

    _.each(dones, function(task){
      if (data.id == task.id){
        task.visible = false
        task.closedAt = new Date()
      }
    });

    _.each(archives, function(task){
      if (data.id == task.id){
        task.visible = false
        task.closedAt = new Date()
      }
    });

    this.setState({ loading: false, errors: [], 
                    todoTasks: todos, doingTasks: doings, doneTasks: dones, archiveTasks: archives })
    localStorage.state = JSON.stringify(this.state)
  }


}

export default Alt.createStore(TasksStore, 'TasksStore')
