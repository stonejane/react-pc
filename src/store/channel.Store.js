import { makeAutoObservable } from 'mobx'
import { http } from '@/utils'
class ChannelStore {
  channelList = []
  constructor() {
    makeAutoObservable(this)
  }
  //article publish均需要调用 因此在layout处使用
  loadChannelList = async () => {
    const res = await http.get('/channels')
    this.channelList = res.data.channels
  }
}
export default ChannelStore