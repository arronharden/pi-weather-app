import React from 'react'
import './LatestMeasurement.css'

class LatestMeasurement extends React.Component {
  render () {
    let temp
    let hum
    let pres
    if (this.props.temperature) {
      temp = (<div className='temperature'>
        <i className='icon fas fa-thermometer-half'></i>
        <span className='label'>Temperature</span>
        <span className='value'>{this.props.temperature}</span>
      </div>
      )
    }
    if (this.props.humidity) {
      hum = (<div className='humidity'>
        <i className="icon fas fa-percentage"></i>
        <span className='label'>Humidity</span>
        <span className='value'>{this.props.humidity}</span>
      </div>
      )
    }
    if (this.props.pressure) {
      pres = (<div className='pressure'>
        <span className='label'>Pressure</span>
        <span className='value'>{this.props.pressure}</span>
      </div>
      )
    }

    let ts
    if (this.props.timestamp) {
      ts = new Date(this.props.timestamp).toLocaleString()
    } else {
      ts = new Date().toLocaleString()
    }

    return (<div className='latest-Measurement'>
      <div className='header'>
        <div className='alias'>{this.props.alias}</div>
        <div className='timestamp'> as of {ts}</div>
      </div>
      {temp}
      {hum}
      {pres}
    </div>)
  }
}

export default LatestMeasurement
