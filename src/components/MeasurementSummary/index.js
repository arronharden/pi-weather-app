import React from 'react'
import './MeasurementSummary.css'

class MeasurementSummary extends React.Component {
  _getValue(value) {
    const n = parseFloat(value)
    if(!isNaN(n)) {
      return n.toFixed(2)
    }
    return value;
  }

  _renderMeasurementRow(labels, latest, min, max, label, name, iconClassName, unitsLabel) {
    if (this.props && this.props[name]) {
      labels.push((<div className='summary-row'>
        { iconClassName ? (<i className={"icon " + iconClassName}></i>) : null }
        <span className='summary-label'>{label}</span>
      </div>))
      latest.push(<div className='summary-value'>{this._getValue(this.props[name].latest)}{unitsLabel}</div>)
      min.push(<div className='summary-value'>
        {this.props[name].hasOwnProperty("minimum") ? this._getValue(this.props[name].minimum) : "N/A"}{unitsLabel}
      </div>)
      max.push(<div className='summary-value'>
        {this.props[name].hasOwnProperty("maximum") ? this._getValue(this.props[name].maximum) : "N/A"}{unitsLabel}
      </div>)
    }
  }

  render () {
    let labels = [], latest = [], min = [], max = []

    this._renderMeasurementRow(labels, latest, min, max, "Temperature", "temperature", "fas fa-thermometer-half", "°C")
    this._renderMeasurementRow(labels, latest, min, max, "Humidity", "humidity", "fas fa-percentage", "%")
    this._renderMeasurementRow(labels, latest, min, max, "Pressure", "pressure", null, "hPa")

    let ts
    if (this.props.timestamp) {
      ts = new Date(this.props.timestamp).toLocaleString()
    } else {
      ts = new Date().toLocaleString()
    }

    return (<div className='measurement-summary'>
      <div className='summary-header'>
        <div className='summary-title'>
          <span>Sensor </span> 
          <span className='summary-alias'>{this.props.alias}</span>
        </div>
      </div>
      <div className='summary-label-column'>{labels} </div>
      <div className='summary-latest-column'>
        <div className='summary-columm-label'>
          Latest
          <div className='summary-latest-timestamp'>{ts}</div>
        </div>
        {latest}
      </div>
      <div className='summary-minimum-column'>
        <div className='summary-columm-label'>Minimum</div>
        {min}
      </div>
      <div className='summary-maximum-column'>
        <div className='summary-columm-label'>Maximum</div>
        {max}
      </div>
    </div>)
  }
}

export default MeasurementSummary