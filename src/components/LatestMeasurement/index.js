import React from 'react'
import './LatestMeasurement.css'

class LatestMeasurement extends React.Component {
  _getValue(value) {
    const n = parseFloat(value)
    if(!isNaN(n)) {
      return n.toFixed(2)
    }
    return value;
  }

  render () {
    let temp
    let hum
    let pres
    if (this.props.temperature) {
      temp = (<div className='temperature'>
        <i className='icon fas fa-thermometer-half'></i>
        <span className='label'>Temperature</span>
        <span className='value'>{this._getValue(this.props.temperature)}°C</span>
      </div>
      )
    }
    if (this.props.humidity) {
      hum = (<div className='humidity'>
        <i className="icon fas fa-percentage"></i>
        <span className='label'>Humidity</span>
        <span className='value'>{this._getValue(this.props.humidity)}%</span>
      </div>
      )
    }
    if (this.props.pressure) {
      pres = (<div className='pressure'>
        <span className='label'>Pressure</span>
        <span className='value'>{this._getValue(this.props.pressure)}hPa</span>
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
        <div className='title'>Current reading</div>
        <div className='timestamp'> as of {ts}</div>
      </div>
      {temp}
      {hum}
      {pres}
    </div>)
  }
}

export default LatestMeasurement
