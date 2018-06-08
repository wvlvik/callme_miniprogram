const app = getApp()

const config = {
  url: 'http://upload.uimix.com/',
  remoteUrl: 'http://demo.uimix.com/lib/upload/'
}

const remoteUrl = config.url


Page({
  data: {
    index: 0,
    fieldDefualt: {},
    hideTabar: false,
    array: ['车主', '店主'],
    uploadImageUrl: remoteUrl + 'upload/wxf6a57be7d6affef1.o6zAJs-Je37vTK20ReGQgY3JysZQ.BVieEYW1BsFqa1a6caa00e2d5e4433e7724396de3b98.jpg'
  },
  onReady() {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#f2f2f2'
    })
  },
  onLoad(option) {
    this.setData({
      fieldDefualt: option,
      hideTabar: !!option.edit || false,
    })


  },
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  createwxaqrcode() {

    this.setData({
      tokens: app.globalData.token || ''
    })


    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=' + app.globalData.token,
      data: { "path": "pages/index/index?id=1", "width": 430 },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      },
      fail: function (res) {
        console.log('isFail')
      }
    })
  },
  uploadImage() {
    let _this = this
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: remoteUrl, //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            var data = JSON.parse(res.data)
            _this.setData({
              uploadImageUrl: remoteUrl + data.result
            })
          }
        })
      }
    })
  }
})