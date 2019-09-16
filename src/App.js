import React from 'react'
import Dashboard from './components/Dashboard'
import DashboardHeader from './components/DashboardHeader'

class App extends React.Component {
  state = {
  }
  
  componentDidMount() {
    const toDate = new Date()
    const fromDate = new Date(toDate.getTime() - (24 * 60 * 60 * 1000))
    this.setState({ fromDate: fromDate, toDate: toDate })
  }

  onDateRangeChanged = (dateRange) => {
    this.setState({ fromDate: dateRange.fromDate, toDate: dateRange.toDate })
  }
  
  render() {
    return (
      <div className="app">
        <DashboardHeader fromDate={this.state.fromDate} toDate={this.state.toDate} onDateRangeChanged={this.onDateRangeChanged}></DashboardHeader>
        <Dashboard fromDate={this.state.fromDate} toDate={this.state.toDate}/>
      </div>
    )
  }
}

export default App
