import { useEffect, useRef } from "react"
import * as echarts from 'echarts'
function Bar ({ title, xData, yData, style }) {
  const domRef = useRef(null)
  const chartInit = () => {
    const myChart = echarts.init(domRef.current)
    // 绘制图表
    myChart.setOption({
      title: {
        text: title
      },
      tooltip: {},
      xAxis: {
        data: xData
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: yData
        }
      ]
    })
  }
  useEffect(() => {
    chartInit()
  }, [])
  return (
    //准备一个挂载节点
    <div ref={domRef} style={style}></div>
  )
}
export default Bar