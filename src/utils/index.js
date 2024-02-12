//先把所有的工具函数导出的模板在这里导入，然后再统一导出（统一管理）
import { http } from './http'
import { setToken, getToken, removeToken } from './token'
export {
  http, setToken, getToken, removeToken
}