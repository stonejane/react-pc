import { makeAutoObservable } from 'mobx'
import { http } from '@/utils'
class UserStore {
  userInfo = {}  //初始是空的，第二次渲染时应该在需要数据的组件JS文件中使用observer进行连接，否则无法显示
  constructor() {
    makeAutoObservable(this)
  }
  getUserInfo = async () => {
    const res = await http.get('./user/profile')
    this.userInfo = res.data
  }
}
export default UserStore