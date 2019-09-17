import React from 'react'
import './SensorSummary.css'

class SensorSummary extends React.Component {
  _getValue (value, name) {
    const n = parseFloat(value)
    if (!isNaN(n)) {
      if(name === 'pressure') {
        return n.toPrecision(4)
      }
      return n.toFixed(2)
    }
    return value
  }

  _renderMeasurementRow (labels, latestSmall, latestLarge, min, max, label, name, iconClassName, unitsLabel) {
    if (this.props && this.props[name]) {
      labels.push((<div className='summary-row' key={name}>
        { iconClassName ? (<i className={'summary-icon ' + iconClassName}></i>) : null }
        <span className='summary-label'>{label}</span>
      </div>))

      const latestVal = `${this._getValue(this.props[name].latest, name)}`
      const minVal = `${Object.prototype.hasOwnProperty.call(this.props[name], 'minimum') ? this._getValue(this.props[name].minimum, name) : '--'}`
      const maxVal =  `${Object.prototype.hasOwnProperty.call(this.props[name], 'maximum') ? this._getValue(this.props[name].maximum, name) : '--'}`
      latestSmall.push(<div className='summary-value' key={name}>{latestVal}{unitsLabel}  ({maxVal}  /  {minVal})</div>)
      latestLarge.push(<div className='summary-value' key={name}>{latestVal}{unitsLabel}</div>)
      min.push(<div className='summary-value' key={name}>{minVal}{unitsLabel}</div>)
      max.push(<div className='summary-value' key={name}>{maxVal}{unitsLabel}</div>)
    }
  }

  render () {
    const labels = [], latestLarge = [], latestSmall = [], min = [], max = []

    this._renderMeasurementRow(labels, latestSmall, latestLarge, min, max, 'Temperature', 'temperature', 'fas fa-thermometer-half', '°C')
    this._renderMeasurementRow(labels, latestSmall, latestLarge, min, max, 'Humidity', 'humidity', 'fas fa-percentage', '%')
    this._renderMeasurementRow(labels, latestSmall, latestLarge, min, max, 'Pressure', 'pressure', null, 'hPa')

    let ts
    if (this.props.timestamp) {
      ts = new Date(this.props.timestamp).toLocaleString()
    } else {
      ts = new Date().toLocaleString()
    }

    return (<div className='sensor-summary'>
      <div className='summary-header'>
        <div className='summary-title'>
          <span className='summary-alias'>{this.props.alias}</span>
        </div>
      </div>
      <div className='summary-label-column'>{labels} </div>
      <div className='summary-latest-column-lg'>
        <div className='summary-column-label'>
          Latest
          <div className='summary-latest-timestamp'>{ts}</div>
        </div>
        {latestLarge}
      </div>
      <div className='summary-latest-column-sm'>
        <div className='summary-column-label'>
          Latest
          <div className='summary-latest-timestamp'>{ts}</div>
        </div>
        {latestSmall}
      </div>
      <div className='summary-minimum-column-lg'>
        <div className='summary-column-label'>Minimum</div>
        {min}
      </div>
      <div className='summary-maximum-column-lg'>
        <div className='summary-column-label'>Maximum</div>
        {max}
      </div>
    </div>)
  }
}

export default SensorSummary
