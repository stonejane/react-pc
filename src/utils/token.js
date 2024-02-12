//封装ls存取token的工具函数
//注意要返回操作结果
const key = 'pc-key'
const setToken = (token) => {

  return window.localStorage.setItem(key, token)
}
const getToken = () => {
  return window.localStorage.getItem(key)

}
const removeToken = () => {
  return window.localStorage.removeItem(key)
}
export {
  setToken, getToken, removeToken
}