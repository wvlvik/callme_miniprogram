const api = require('../../config/api.js');
const util = require('../../utils/util.js');
const app = getApp();


Page({
  data: {
    rootUrl: api.rootUrl,
    uploadImageUrl: '',
    index: 0,
    hideTabar: false,
    array: ['车主', '店主']
  },


  onReady() {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#f2f2f2'
    })
  },


  onLoad(option) {
    this.setData({
      hideTabar: !!option.edit || false,
    })
  },


  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },


  uploadImage() {
    let _this = this;

    wx.chooseImage({
      success: function (res) {
        let tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: api.rootUrl + 'api/upload',
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
    // 检查登录状态
    util.checkSession().then(res => {
      let userInfo = wx.getStorageSync('userInfo');

      wx.request({
        url: api.rootUrl + 'api/apply',
        data: Object.assign({}, e.detail.value, {user_id: userInfo.username}),
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          let data = res.data;
          let _this = this;

          // supercode不够，管理员需要生成
          if (!data.data) {
            util.showErrorToast(data.errmsg);
            return;
          }

          // 展示小程序二维码图片
          let imgUrl = api.rootUrl + 'uploads/code/' + data.data.codeImage;
          // wx.previewImage({
          //   current: '',
          //   urls: [imgUrl]
          // })

          util.showSuccessToast('已保存至相册');

          wx.saveImageToPhotosAlbum({
            filePath: imgUrl,
            success(res) {
            
              console.log(res)

            }
          });

        },
        fail: function (res) {
          console.log('isFail')
        }
      })



    }).catch(e => {
      console.log('跳登录页面');
    })

    
  },

  applyInfoReset() {

  }
})