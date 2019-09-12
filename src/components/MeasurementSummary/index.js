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
      labels.push((<div className='row'>
        { iconClassName ? (<i className={"icon " + iconClassName}></i>) : null }
        <span className='label'>{label}</span>
      </div>))
      latest.push(<div className='value'>{this._getValue(this.props[name].latest)}{unitsLabel}</div>)
      min.push(<div className='value'>
        {this.props[name].hasOwnProperty("minimum") ? this._getValue(this.props[name].minimum) : "N/A"}{unitsLabel}
      </div>)
      max.push(<div className='value'>
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
      <div className='header'>
        <div className='title'>Current reading</div>
        <div className='timestamp'> as of {ts}</div>
      </div>
      <div className='label-column'>{labels} </div>
      <div className='latest-column'><div className='columm-label'>Latest</div>{latest}</div>
      <div className='minimum-column'><div className='columm-label'>Minimum</div>{min}</div>
      <div className='maximum-column'><div className='columm-label'>Maximum</div>{max}</div>
    </div>)
  }
}

export default MeasurementSummary
