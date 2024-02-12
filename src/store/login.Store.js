import { makeAutoObservable } from "mobx"
import { http, setToken, getToken, removeToken } from '@/utils'
class LoginStore {
  //注意！！‘=’
  token = getToken() || ''
  constructor() {
    //响应式
    makeAutoObservable(this)
  }
  getToken = async ({ mobile, code }) => {
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', { mobile, code })
    console.log(res)
    this.token = res.data.token
    //存入ls
    setToken(this.token)
  }
  loginOut = () => {
    this.token = ''
    removeToken()
  }
}
export default LoginStore