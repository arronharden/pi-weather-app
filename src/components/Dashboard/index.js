import React from 'react'
import './Dashboard.css'
import LatestMeasurement from '../LatestMeasurement'

class Dashboard extends React.Component {
  componentDidMount () {
    fetch('/measurements/recent')
      .then((recent) => {
        this.setState({ recent })
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
      Temp: <LatestMeasurement temperature='33.1C' humidity='75.3%' pressure='32.2kPa' alias='testcol' timestamp='2019-09-09T14:44:36.601Z'/>
    </div>)
  }
}

export default Dashboard
