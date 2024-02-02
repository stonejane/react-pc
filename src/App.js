import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "@/pages/Layout"
import Login from "@/pages/Login"
import { Button } from 'antd'
//核心组件 根组件
function App () {
  return (
    //路由配置
    <BrowserRouter>
      <div className="App">
        <Button type="primary">Primary Button</Button>
        <Routes>
          {/* 创建路由path和组件的对应关系 */}
          <Route path='/' element={<Layout></Layout>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
