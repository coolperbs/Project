// component/mModal.js
Component({
  /**
   * 组件的初始数据
   */
  data: {
    title: '提示',
    content: '',
    showCancel: true,
    cancelText: '取消',
    confirmText: '确认',
    success: null,
    zIndex: -9999
  },

  /**
   * 组件的方法列表
   */
  ready() {
    this.mAni = wx.createAnimation({
      duration: 450,
      timingFunction: "ease",
      delay: 0
    })
  },
  methods: {
    showModal(object) {
      //todo 可能需要过滤
      console.log('进来了~~~~')
      this.setData({...object});
      this.show()
    },
    show() {
      this.setData({
        zIndex: 9999
      });
      this.mAni.opacity(1).step();
      this.setData({
        mAni: this.mAni.export()
      })
    },
    hide() {
      this.mAni.opacity(0).step();
      this.setData({
        mAni: this.mAni.export()
      });
      setTimeout(() => {
        this.setData({
          zIndex: -9999
        })
      }, 500)
    },
    tapEvt(e) {
      let type = e.currentTarget.dataset.type;
      if (typeof this.data.success == 'function') {
        this.data.success({result: type})
      }
      this.hide();
    }
  }
})
