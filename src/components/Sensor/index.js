import React from 'react'
import './Sensor.css'
import SensorChart from '../SensorChart'
import SensorSummary from '../SensorSummary'

class Sensor extends React.Component {
  componentDidMount () {
    this.fetchData()
  }
  
  componentDidUpdate (prevProps) {
    if(this.props.fromDate.getTime() !== prevProps.fromDate.getTime() || this.props.toDate.getTime() !== prevProps.toDate.getTime()) {
      // date range has changed - refetch
      this.fetchData()
    }
  }

  fetchData () {
    fetch(`/measurements?fromDate=${this.props.fromDate.toISOString()}&toDate=${this.props.toDate.toISOString()}&alias=${this.props.alias}`)
      .then(response => response.json())
      .then((body) => {
        this.setState({ data: body })
      })
  }

  _renderMeasurement (label, name, unitsLabel) {
    const result = {}
    if (this.props && this.props.latest && Object.prototype.hasOwnProperty.call(this.props.latest, name) && this.props.latest[name] !== null) {
      result.summary = Object.assign({}, result.summary, { latest: this.props.latest[name] })
    }
    if (this.state && this.state.data && this.state.data.length > 0 && this.state.data[0][name]) {
      // build chart
      result.chart = (<SensorChart data={this.state.data} label={label} name={name} unitsLabel={unitsLabel}/>)
      const values = this.state.data.map((item) => item[name])
      result.summary = Object.assign({}, result.summary, {
        minimum: Math.min(...values),
        maximum: Math.max(...values)
      })
    }
    return result
  }

  render () {
    const temp = this._renderMeasurement('Temperature', 'temperature', '°C')
    const pressure = this._renderMeasurement('Pressure', 'pressure', 'hPa')
    const humidity = this._renderMeasurement('Humidity', 'humidity', '%')

    return (<div className='sensor'>
      <div className='summary-container'>
        <SensorSummary
          temperature={temp.summary}
          humidity={humidity.summary}
          pressure={pressure.summary}
          alias={this.props.alias}
          timestamp={this.props && this.props.latest && this.props.latest.timestamp}/>
      </div>
      <div className='chart-container'>
        {temp ? temp.chart : null}
        {pressure ? pressure.chart : null}
        {humidity ? humidity.chart : null}
      </div>
    </div>)
  }
}

export default Sensor
