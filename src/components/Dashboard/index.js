import React from 'react'
import './Dashboard.css'
import Sensor from '../Sensor'

class Dashboard extends React.Component {
  componentDidMount () {
    fetch('/measurements/summary')
      .then(response => response.json())
      .then((body) => {
        const bodySorted = body.sort((a, b) => { return a.alias.localeCompare(b.alias) })

        const to = new Date()
        const from = new Date(to.getTime() - (24 * 60 * 60 * 1000) - 999999999)
        this.setState({ summary: bodySorted, fromDate: from, toDate: to })
      })
      .catch((err) => {
        console.error('Failed to read latest measurements', err)
      })
  }

  render () {
    if (!this.state || !this.state.summary) {
      // loading overlay
      return (<div>Loading...</div>)
    }

    return (<div className='dashboard'>
      {this.state.summary.map((value, index) => {
        return (<div className='sensor-container' key={value.alias}>
          <Sensor latest={value.latest} alias={value.alias} fromDate={this.state.fromDate} toDate={this.state.toDate}/>
        </div>)
      })}
    </div>)
  }
}

export default Dashboard
