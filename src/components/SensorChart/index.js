import React from 'react'
import './SensorChart.css'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

class SensorChart extends React.Component {
  _tickFormat (timeStr) {
    const d = new Date(timeStr)
    return d.toLocaleTimeString()
  }

  render () {
    return (<div className="sensor-chart">
      <div className="chart-label">{this.props.label}</div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart margin={{ left: 20, bottom: 5 }} data={this.props.data}>
          <XAxis dataKey="timestamp" tickFormatter={this._tickFormat} />
          <YAxis label={this.props.unitsLabel}/>
          <CartesianGrid stroke="#d6d6d6" strokeDasharray="5 5"/>
          <Line type="basis" dataKey={this.props.name} stroke="#8884d8" dot={false}/>
          <Tooltip/>
        </LineChart>
      </ResponsiveContainer>
    </div>)
  }
}

export default SensorChart
