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
    uploadImageUrl: ''
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

    // this.setData({
    //   tokens: app.globalData.token || ''
    // })


    // wx.request({
    //   url: 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=' + app.globalData.token,
    //   data: { "path": "pages/index/index?id=1", "width": 430 },
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //   },
    //   fail: function (res) {
    //     console.log('isFail')
    //   }
    // })

  },
  uploadImage() {
    let _this = this
    wx.chooseImage({
      success: function (res) {
        let tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: app.globalData.apiUrl + 'api/upload',
          filePath: tempFilePaths[0],
          name: 'image',
          success: function (res) {
            let data = JSON.parse(res.data)
            _this.setData({
              uploadImageUrl: data.data.fileUrl
            })
          }
        })
      }
    })
  },

  applyInfoSubmit(e) {
    wx.request({
      url: app.globalData.apiUrl + 'api/apply',
      data: e.detail.value,
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let data = res.data

        // supercode不够，管理员需要生成
        if (!data.data) {
          wx.showToast({
            title: data.errmsg,
            icon: 'none',
            duration: 2000
          })
          return
        }

        // 展示小程序二维码图片
        let imgUrl = app.globalData.apiUrl + 'uploads/code/' + data.data.codeImage
        // wx.previewImage({
        //   current: '',
        //   urls: [imgUrl]
        // })

        wx.saveImageToPhotosAlbum({
          filePath: imgUrl,
          success(res) {
            console.log('保存到相册')
          }
        })

      },
      fail: function (res) {
        console.log('isFail')
      }
    })
  },

  applyInfoReset() {

  }
})