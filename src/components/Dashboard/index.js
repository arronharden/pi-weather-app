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
        return (<div className='sensor-container'>
            <Sensor latest={value.latest} alias={value.alias}/>
          </div>)
      })}
    </div>)
  }
}

export default Dashboard
