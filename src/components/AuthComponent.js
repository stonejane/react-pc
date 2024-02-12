//判断token是否存在？正常渲染：重定向到登录路由
import { getToken } from "@/utils"
import { Navigate } from "react-router-dom"
//高阶组件：把一个组件当成另外一个组件的参数传入，然后通过一定的判断来返回新的组件
//用AuthComponent标签包裹Layout标签，因此这里的children也即layout
function AuthComponent ({ children }) {
  const isToken = getToken()
  if (isToken) {
    return <>{children}</>
  }
  else {
    return <Navigate to='/login'></Navigate>
  }
}
export { AuthComponent }