//app.js
App({
  onLaunch() {
    let _this = this
    // wx.request({
    //   url: this.globalData.apiUrl + 'index/token',
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     _this.globalData.token = res.data.data.access_token
    //   },
    //   fail: function (res) {
    //     console.log('isFail')
    //   }
    // })
  },
  globalData: {
    apiUrl: 'http://192.168.1.222:8360/api/'
  }
})