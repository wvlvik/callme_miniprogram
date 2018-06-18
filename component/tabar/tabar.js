Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    tabindex: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    canclick: true
  },

  ready() {
      let userInfo = wx.getStorageSync('userInfo');

      !userInfo && this.setData({
        canclick: false
      });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad() {
      
    }
  }
})
