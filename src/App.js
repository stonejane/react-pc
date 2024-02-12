import { unstable_HistoryRouter as HistoryBrowser, BrowserRouter, Route, Routes } from "react-router-dom"
import { history } from "./utils/history"
import './App.css'

import { lazy, Suspense } from 'react'
const Layout = lazy(() => import("@/pages/Layout"))
const Login = lazy(() => import("@/pages/Login"))
import { AuthComponent } from "./components/AuthComponent"
import { Publish } from "./pages/Publish"
import { Home } from "./pages/Home"
import { Article } from "./pages/Article"
//核心组件 根组件
function App () {
  return (
    //路由配置
    <HistoryBrowser history={history}>
      <Suspense
        fallback={
          <div
            style={{
              textAlign: 'center',
              marginTop: 200
            }}
          >
            loading...
          </div>
        }
      ></Suspense>
      <div className="App">
        <Routes>
          {/* 创建路由path和组件的对应关系 */}
          <Route path='/' element={<AuthComponent><Layout></Layout></AuthComponent>}>
            <Route index element={<Home></Home>}></Route>
            <Route path='article' element={<Article></Article>}></Route>
            <Route path='publish' element={<Publish></Publish>}></Route>
          </Route>
          <Route path='/login' element={<Login></Login>}></Route>
        </Routes>
      </div>
    </HistoryBrowser>
  )
}

export default App
