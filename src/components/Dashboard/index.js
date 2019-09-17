import React from 'react'
import './Dashboard.css'
import Sensor from '../Sensor'

class Dashboard extends React.Component {
  componentDidMount () {
    fetch('/measurements/summary')
      .then(response => response.json())
      .then((body) => {
        const bodySorted = body.sort((a, b) => { return a.alias.localeCompare(b.alias) })
        this.setState({ summary: bodySorted })
      })
      .catch((err) => {
        console.error('Failed to read measurements summary', err)
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
          <Sensor latest={value.latest} alias={value.alias} fromDate={this.props.fromDate} toDate={this.props.toDate}/>
        </div>)
      })}
    </div>)
  }
}

export default Dashboard
