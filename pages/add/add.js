const api = require('../../config/api.js');
const util = require('../../utils/util.js');
const app = getApp();


Page({
  data: {
    rootUrl: api.rootUrl,
    array: ['车主', '店主'],
    type: 0,
    savetoAlbum: true,
    showPreviewButton: false,
    user_count: 0
  },


  onReady() {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#f2f2f2'
    })
  },


  onLoad(option) {
    if(option.id) {
      this.setData({
        savetoAlbum: true,
        id: option.id
      });
      this.runEidt();
    }else {
      this.setData({
        savetoAlbum: wx.getStorageSync('user_count') > 0 ? true : false
      });
    }
  },


  onShow() {
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      user_count: wx.getStorageSync('user_count'),
      user_id: userInfo.id
    });
  },


  runEidt() {
    let _this = this;
    if(_this.data.id) {
      // 检查登录状态
      util.checkSession().then(res => {
        let userInfo = wx.getStorageSync('userInfo');

        wx.request({
          url: api.rootUrl + 'api/apply/' + this.data.id,
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            let data = res.data.data;

            _this.setData({
              name: data.name,
              image: data.image,
              tel: data.tel,
              type: data.type,
              supercode_id: data.supercode_id,
              savetoAlbum: data.supercode_id !== '' ? true : false,
              showPreviewButton: data.supercode_id !== '' ? true : false,
            });
          }
        })

      }).catch(e => {
        console.log('跳登录页面');
      });

    }
  },


  bindPickerChange(e) {
    this.setData({
      type: e.detail.value
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
            let data = JSON.parse(res.data);

            _this.setData({
              image: data.data.fileUrl
            });

          }
        })
      }
    })
  },


  applyInfoSubmit(e) {
    let _this = this;
    // 检查登录状态
    util.checkSession().then(res => {
      let userInfo = wx.getStorageSync('userInfo');
      let page = 'api/apply';
      let method = 'POST';

      if(_this.data.id) {
        page = page + '/' + _this.data.id;
        method = 'PUT';
      }



      wx.request({
        url: api.rootUrl + page,
        data: Object.assign({}, e.detail.value, {user_id: userInfo.username}),
        method: method,
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          let data = res.data;


          // supercode不够，管理员需要生成
          if (!data.data) {
            util.showErrorToast(data.errmsg);
            return;
          }

          // 展示小程序二维码图片
          if (data.data.codeImage) {
            let imgUrl = api.rootUrl + 'uploads/code/' + data.data.codeImage;
            wx.previewImage({
              current: '',
              urls: [imgUrl]
            });
          }

          !_this.data.id && wx.redirectTo({
            url: '/pages/list/list',
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