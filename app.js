//app.js
const url = {
  local: 'http://192.168.1.212:8360/',
  remote: 'https://salex.applinzi.com/'
}

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
    apiUrl: url.local
  }
})