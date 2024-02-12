import Bar from '@/components/Bar'
import './index.scss'
const Home = () => {
  return (
    //准备一个挂载节点
    <div>
      <Bar
        title='近期运动量'
        xData={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
        yData={[2, 1, 1.5, 2, 0.5, 1, 1.5]}
        style={{ width: '500px', height: '400px' }}
      ></Bar>
      <Bar
        title='近期身体数据'
        xData={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
        yData={[49.8, 49.8, 49.9, 49.7, 49.75, 49.7, 49.65]}
        style={{ width: '500px', height: '400px' }}
      ></Bar></div>
  )
}
export { Home }