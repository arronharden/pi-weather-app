import React, { PureComponent } from 'react'
import './SensorChart.css'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

class CustomizedAxisTick extends PureComponent {
  render () {
    const {
      x, y, payload
    } = this.props
    const d = new Date(payload.value)
    const text1 = d.toLocaleDateString()
    const text2 = d.toLocaleTimeString()

    return (
      <g transform={`translate(${x},${y})`}>
        <text width={20} x={0} y={0} dy={16} textAnchor="middle" fill="#666">
          <tspan x={0} dy='1em'>{text1}</tspan>
          <tspan x={0} dy='1em'>{text2}</tspan>
        </text>
      </g>
    )
  }
}

class SensorChart extends React.Component {
  _tooltipFormatter = (value, name, props) => {
    return [`${value.toFixed(2)}${this.props.unitsLabel}`, this.props.label]
  }

  _xAxisFormatter = (time) => {
    const d = new Date(time)
    const text = d.toLocaleString()
    return text
  }

  render () {
    let yAxisLabelOffset = null
    let chartMarginLeft =  null
    let yAxisDomain = [0, 'auto']
    if (this.props.name === 'pressure' ) {
      yAxisDomain = [dataMin => (Math.floor(dataMin / 25) - 1) * 25, dataMin => (Math.ceil(dataMin / 25) + 1) * 25]
      yAxisLabelOffset =-20
      chartMarginLeft = 40
    } 
    else if (this.props.name === 'humidity' ) {
      yAxisDomain = [0, 100]
    }
    return (<div className="sensor-chart">
      <div className="chart-label">{this.props.label}</div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart margin={{ left: chartMarginLeft, bottom: 30, top: 5 }} data={this.props.data}>
          <XAxis scale="time" dataKey="timestamp" tick={<CustomizedAxisTick/>} type="number" domain={[this.props.fromDate.getTime(), this.props.toDate.getTime()]} />
          <YAxis label={{ value: this.props.unitsLabel, position: 'insideLeft', offset: yAxisLabelOffset }} domain={yAxisDomain}/>
          <CartesianGrid stroke="#d6d6d6" strokeDasharray="5 5"/>
          <Line type="basis" dataKey={this.props.name} stroke="#8884d8" dot={false}/>
          <Tooltip labelFormatter={this._xAxisFormatter} formatter={this._tooltipFormatter}/>
        </LineChart>
      </ResponsiveContainer>
    </div>)
  }
}

export default SensorChart
