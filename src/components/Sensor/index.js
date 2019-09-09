import React from 'react'
import './Sensor.css'
import LatestMeasurement from '../LatestMeasurement'

class Sensor extends React.Component {
  componentDidMount () {
    fetch('/measurements/aliases')
      .then((aliases) => {
        console.log(JSON.stringify(aliases))
      })
  }

  render () {
    return (<div className='sensor'>
      <LatestMeasurement temperature={this.props.temperature}
        humidity='75.3%'
        pressure='32.2kPa'
        alias='testcol'
        timestamp='2019-09-09T14:44:36.601Z'/>
    </div>)
  }
}

export default Sensor
