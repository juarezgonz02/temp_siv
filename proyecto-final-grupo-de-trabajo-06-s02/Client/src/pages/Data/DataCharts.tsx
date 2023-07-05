import { useState, useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import { confgType } from './DataAnalysis'

const DataChart = ({ config, data }: ({ config: confgType, data: any })) => {

  const cxt = useRef<HTMLCanvasElement>(document.createElement("canvas"))
  const chartRef = useRef<Chart>();
  useEffect(() => {

    if (chartRef.current != null) {
      chartRef.current.destroy();
    }

    console.log(data)
    console.log(config.label)

    const chart = new Chart(
      cxt.current,
      {
        type: config.type,
        options: {
          responsive: true,
          maintainAspectRatio: true
        },
        data: {
          labels: config.label,
          datasets: [
            {
              label: config.name,
              data: data,
              backgroundColor: config.backgroundColor
            }
          ],
        },        
      }
    )

    chartRef.current = chart

}, [config, data])


return (
  <div className='chart'>
    <canvas ref={cxt} id={config.id}></canvas>
  </div>
)
}

DataChart.propTypes = {}

export default DataChart