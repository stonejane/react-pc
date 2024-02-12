//将所有模块执行统一处理
//导出一个统一的方法 useStore
import React from "react"
import LoginStore from './login.Store.js'
import UserStore from './user.Store.js'
import ChannelStore from "./channel.Store.js"
class RootState {
  constructor() {
    this.loginStore = new LoginStore()
    this.userStore = new UserStore()
    this.channelStore = new ChannelStore()
  }
}
//实例化根
const rootState = new RootState()
const context = React.createContext(rootState)

const useStore = () => React.useContext(context)
export { useStore }