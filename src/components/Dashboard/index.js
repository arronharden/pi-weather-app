import React from 'react'
import './Dashboard.css'
import Sensor from '../Sensor'

class Dashboard extends React.Component {
  componentDidMount () {
    fetch('/measurements/recent')
      .then(response => response.json())
      .then((body) => {
        const bodySorted = body.sort((a, b) => { return a.alias.localeCompare(b.alias) })
        this.setState({ recent: bodySorted })
      })
      .catch((err) => {
        console.error('Failed to read latest measurements', err)
      })
  }

  render () {
    if (!this.state || !this.state.recent) {
      // loading overlay
      return (<div>Loading...</div>)
    }

    return (<div className='dashboard'>
      {this.state.recent.map((value, index) => {
        return <Sensor 
          recent={value}
          alias={value.alias}/>
      })}
    </div>)
  }
}

export default Dashboard
