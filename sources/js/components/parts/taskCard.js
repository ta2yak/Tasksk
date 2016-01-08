import React from 'react'
import moment from 'moment'
import md2react from 'md2react'

import EditTaskModal from '../../components/parts/editTaskModal'
import TimeHistoryModal from '../../components/parts/timeHistoryModal'

class TaskCard extends React.Component {

  isNearLimit(){
    let task = this.props.task
    if (!task.limit) return
    if (!task.days) task.days = 0

    let today = moment()
    let task_limit = moment(task.limit).subtract(task.days, 'days') // 作業を開始している必要がある日

    return (task_limit.isBefore(today, 'day')) // 工数を逆算した上でそろそろはじめなくてはいけない時期
  }

  isLimitToday(){
    let task = this.props.task
    if (!task.limit) return

    let today = moment()
    let limit = moment(task.limit)

    return (limit.isSame(today, 'day'))　 // 期限が当日ならTrue
  }

  isLimitOver(){
    let task = this.props.task
    if (!task.limit) return

    let today = moment()
    let limit = moment(task.limit)

    return (limit.isBefore(today, 'day')) // 期限が今日以前ならTrue
  }

  render() {

    let task    = this.props.task

    let cardColor = 'white'

    if (task.type == "ToDo" || task.type == "Doing") {

      cardColor     = this.isLimitOver() ?  'pink accent-2' : cardColor
      cardColor     = this.isLimitToday() ? 'pink lighten-3' : cardColor
      cardColor     = this.isNearLimit() ?  'pink lighten-5' : cardColor
    } else {

      cardColor     = 'grey lighten-3'
    }

    let cardClass = "card " + cardColor

    let bodyElement = md2react(task.body, {gfm: true, breaks: true})

    let tagsElement = task.tags ? task.tags.split(',').map(function(tag, index){
      return (
          <div className="chip teal lighten-3 white-text" key={task.id + ':' + index}>
            {tag}
          </div>
      )
    }) : null

    let card = (
      <div className={cardClass}>

        <div className="card-content">

          <h6>{task.title}</h6>

          <small>
            {bodyElement}
          </small>
          <br/>
          <small>
            予定工数　{task.days ? task.days + '日' : "未設定"} <br/>
            期限 {task.limit ? moment(task.limit).format('MM/DD まで') : "未設定"}
            {task.limit && task.days ? moment(task.limit).subtract(task.days, 'days').format('　(MM/DD には始めましょう)') : ""}
          </small>

          <br/>
          <br/>
          {tagsElement}

        </div>


        <div className="card-action">

          <EditTaskModal task={this.props.task}/>
          <TimeHistoryModal task={this.props.task}/>

        </div>

      </div>
    )

    return (
      task.visible ? card : null
    )

  }

}

TaskCard.propTypes = {
  task: React.PropTypes.object.isRequired
}


export default TaskCard
