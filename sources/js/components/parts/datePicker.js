import React from 'react'
import moment from 'moment'

class DatePicker extends React.Component {

  componentDidMount(){
    this.setupDatePicker()
  }

  componentDidUpdate(){
    this.setupDatePicker()
  }

  setupDatePicker() {
    $(React.findDOMNode(this.refs.datePicker)).pickadate({
      format: 'yyyy-mm-dd',
      formatSubmit: 'yyyy-mm-dd',
      selectMonths: true,
      selectYears: 5,
      closeOnSelect: true
    })
  }

  render() {

    let defaultValue = this.props.defaultValue
    let value = defaultValue ? moment(defaultValue).format('YYYY-MM-DD') : ""

    return (
      <input type='date' ref='datePicker' 
             className={this.props.className} 
             placeholder={this.props.placeholder}
             defaultValue={value} 
             onChange={this.onDateChange} />
    )

  }

}

DatePicker.propTypes = {
  className: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  defaultValue: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.date])
}


export default DatePicker
