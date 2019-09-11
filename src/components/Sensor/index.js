import React, { PureComponent } from 'react'
import './Sensor.css'
import LatestMeasurement from '../LatestMeasurement'
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

  render () {
    let chartTemp, chartPressure, chartHumidity;
    if(this.state && this.state.data && this.state.data.length > 0) {
      if(this.state.data[0].temperature) {
        // temp chart
        chartTemp = (<div className="chart">
          <LineChart width={500} height={300} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} data={this.state.data}>
            <XAxis dataKey="timestamp" tickFormatter={this._tickFormat} />
            <YAxis label="°C"/>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Line type="basis" dataKey="temperature" stroke="#8884d8" dot={false}/>
            <Tooltip/>
          </LineChart>
        </div>)
      }
      if(this.state.data[0].pressure) {
        // pressure chart
        chartPressure = (<div className="chart">
          <LineChart width={500} height={300} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} data={this.state.data}>
            <XAxis dataKey="timestamp" tickFormatter={this._tickFormat} />
            <YAxis label="hPa"/>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Line type="basis" dataKey="pressure" stroke="#8884d8" dot={false}/>
            <Tooltip/>
          </LineChart>
        </div>)
      }
      if(this.state.data[0].humidity) {
        // humidity chart
        chartHumidity = (<div className="chart">
          <LineChart width={500} height={300} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} data={this.state.data}>
            <XAxis dataKey="timestamp" tickFormatter={this._tickFormat} />
            <YAxis label="%" domain={[0, 100]}/>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Line type="basis" dataKey="humidity" stroke="#8884d8" dot={false}/>
            <Tooltip/>
          </LineChart>
        </div>)
      }
    }

    return (<div className='sensor'>
        <div className='header'>
          <div className='alias'>{this.props.alias}</div>
        </div>
        {chartTemp}
        {chartPressure}
        {chartHumidity}
        <LatestMeasurement 
          temperature={this.props.recent.temperature}
          humidity={this.props.recent.humidity}
          pressure={this.props.recent.pressure}
          alias={this.props.alias}
          timestamp={this.props.recent.timestamp}/>
    </div>)
  }
}

export default Sensor
