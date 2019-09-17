import React from 'react'
import Dashboard from './components/Dashboard'
import DashboardHeader from './components/DashboardHeader'

class App extends React.Component {
  state = { rangeType: 'last7days' }

  onDateRangeChanged = (dateRange) => {
    this.setState({ ...dateRange })
  }
  
  render() {
    let toDate, fromDate
    if(this.state.rangeType === 'last7days') {
      toDate = new Date()
      fromDate = new Date(toDate.getTime() - (7 * 24 * 60 * 60 * 1000)) // the last 7 days
    }
    else if(this.state.rangeType === 'last30days') {
      toDate = new Date()
      fromDate = new Date(toDate.getTime() - (30 * 24 * 60 * 60 * 1000)) // the last 30 days
    }
    else  {
      toDate = this.toDate
      fromDate = this.state.fromDate
    }
    return (
      <div className="app">
        <DashboardHeader rangeType={this.state.rangeType} fromDate={fromDate} toDate={toDate} onDateRangeChanged={this.onDateRangeChanged}></DashboardHeader>
        <Dashboard fromDate={fromDate} toDate={toDate}/>
      </div>
    )
  }
}

export default App
