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

  handleTypeChange= (event) => {
    const dateRange = {
      rangeType: event.target.value
    }
    if(dateRange.rangeType === 'custom') {
      dateRange.fromDate = this.props.fromDate
      dateRange.toDate = this.props.toDate
    }
    this.props.onDateRangeChanged(dateRange)
  }

  render () {
    let customRange;
    if(this.props.rangeType === 'custom') {
      customRange = (<div className='header-custom-range'>
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
      </div>)
    }

    return (<div className='dashboard-header'>
      <div className='header-title'>
        <h2>Weather Station Dashboard</h2>
      </div>
      <div className='header-right'>
        <select value={this.props.rangeType} onChange={this.handleTypeChange}>
          <option value="last24hours">Last 24 hours</option>
          <option value="last7days">Last 7 days</option>
          <option value="last30days">Last 30 days</option>
          <option value="last90days">Last 90 days</option>
          <option value="custom">Custom</option>
        </select>
        {customRange}
      </div>
    </div>)
  }
}

export default DashboardHeader
