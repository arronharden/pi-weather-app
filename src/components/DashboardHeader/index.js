import React from 'react'
import './DashboardHeader.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

class DashboardHeader extends React.Component {
  handleFromChange = date => {
    this.props.onDateRangeChanged({
      fromDate: date,
      toDate: this.props.toDate
    })
  }

  handleToChange = date => {
    this.props.onDateRangeChanged({
      fromDate: this.props.fromDate,
      toDate: date
    })
  }

  render () {
    return (<div className='dashboard-header'>
      <div className='header-title'>
        <h2>Arron's Weather Station Dashboard</h2>
      </div>
      <div className='header-right'>
        <div className='header-from'>
          From
          <DatePicker
            showTimeSelect
            selected={this.props.fromDate}
            onChange={this.handleFromChange}
            dateFormat="Pp"
          />
        </div>
        <div className='header-to'>
          To
          <DatePicker
            showTimeSelect
            selected={this.props.toDate}
            onChange={this.handleToChange}
            dateFormat="Pp"
            popperModifiers={{
              preventOverflow: {
                enabled: true,
                escapeWithReference: false,
                boundariesElement: 'viewport'
              }
            }}
          />
        </div>
      </div>
    </div>)
  }
}

export default DashboardHeader
