import ajax from '../../common/ajax/ajax'

export default {
  battleOneConnect(){
    ajax.connectSocket('ws://gamegw.soofylia.net/ws/singleFightAgainst',{userId:123456,danGrading:1})
  },
  battleOneOnSocket(callback){
    ajax.onSocketMessage(res=>{
      debugger
    })
  }
}