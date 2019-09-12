import React, { PureComponent } from 'react'
import './Sensor.css'
import MeasurementSummary from '../MeasurementSummary'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


class Sensor extends React.Component {
  componentDidMount () {
    const to = new Date()
    const from = new Date(to.getTime() - (24 * 60 * 60 * 1000))
    fetch(`/measurements?fromDate=${from.toISOString()}&toDate=${to.toISOString()}&alias=${this.props.alias}`)
      .then(response => response.json())
      .then((body) => {
          this.setState({ data: body })
      })
  }
  
  _tickFormat(timeStr) {
    const d = new Date(timeStr)
    return d.toLocaleTimeString()
  }

  _renderMeasurement(name, unitsLabel) {
    let result = {}
    if(this.props && this.props.latest && this.props.latest.hasOwnProperty(name) && this.props.latest[name] !== null) {
      result.summary = Object.assign({}, result.summary, { latest: this.props.latest[name] })
    }
    if(this.state && this.state.data && this.state.data.length > 0 && this.state.data[0][name]) {
      // build chart
      result.chart = (<div className="chart">
        <LineChart width={500} height={300} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} data={this.state.data}>
          <XAxis dataKey="timestamp" tickFormatter={this._tickFormat} />
          <YAxis label={unitsLabel}/>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
          <Line type="basis" dataKey={name} stroke="#8884d8" dot={false}/>
          <Tooltip/>
        </LineChart>
      </div>)
      const values = this.state.data.map((item) => item[name])
      result.summary = Object.assign({}, result.summary, { 
        minimum: Math.min(...values),
        maximum: Math.max(...values)
      })
    }
    return result
  }

  render () {
    let temp = this._renderMeasurement("temperature", "°C")
    let pressure = this._renderMeasurement("pressure", "hPa")
    let humidity = this._renderMeasurement("humidity", "%")

    return (<div className='sensor'>
        <div className='header'>
          <div className='alias'>{this.props.alias}</div>
        </div>
        <div className='summary'>
          <MeasurementSummary 
            temperature={temp.summary}
            humidity={humidity.summary}
            pressure={pressure.summary}
            alias={this.props.alias}
            timestamp={this.props && this.props.latest && this.props.latest.timestamp}/>
        </div>
        {temp ? temp.chart : null}
        {pressure ? pressure.chart : null}
        {humidity ? humidity.chart : null}
    </div>)
  }
}

export default Sensor
