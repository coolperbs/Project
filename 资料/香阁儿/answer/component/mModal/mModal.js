// component/mModal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: '提示',
    content: '',
    showCancel: true,
    cancelText: '取消',
    cancelColor:'#000000',
    confirmText: '确认',
    confirmColor: '#3CC51F',
    success: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showModal(object){
      this.setData({...object});
      this.show()
    },
    show(){

    },
    hide(){

    },
    clickEvt(e){

    }
  }
})
