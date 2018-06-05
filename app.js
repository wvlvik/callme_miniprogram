//app.js
App({
  onLaunch() {
    let _this = this
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx5ba56b1ca0d4af23&secret=07df5ad8499980b95020252ced909f65',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        _this.globalData.token = res.data.access_token
        console.log('get access_token success!')
      },
      fail: function (res) {
        console.log('isFail')
      }
    })

  },
  globalData: {
    token: ''
  }
})