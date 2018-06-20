const user = require('../../service/user');
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const app = getApp()

Page({
  data: {
    rootUrl: api.rootUrl,
    userApply: {
      tel: '18616614914',
      type: 0
    }
  },
  onLoad(option) {
    let _this = this;

    this.setData({
      showRegister_module: option.hide ? false : true,
      id: option.id || null
    });


    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {

          wx.getUserInfo({
            success: function (res) {
              _this.setData({
                userInfo: res.userInfo
              });

              _this.data.showRegister_module && _this.scanAddRecord();
            }
          });

        }
      }
    });


    wx.showShareMenu({
      withShareTicket: true
    });


    this.getApply();

  },

  // 注册新用户
  registerNewUser(e) {
    if (!e.detail.userInfo) {
      util.showErrorToast('受权失败');
      return;
    }

    let dataset = e.currentTarget.dataset;
    // 登录成功跳转至列表页
    user.loginByWeixin().then(res => {
      wx.navigateTo({
        url: dataset.url
      });
    }).catch((err) => {
      util.showErrorToast('登录失败');
    });

  },


  // 联系
  callmePhone() {
    this.data.userInfo && wx.makePhoneCall({
      phoneNumber: this.data.userApply.tel
    })
  },


  // 获取用户信息
  bindGetUserInfo(e) {
    if (!e.detail.userInfo) {
      util.showErrorToast('受权失败');
      return;
    }

    !this.data.userInfo && e.detail.userInfo && this.setData({
      userInfo: e.detail.userInfo
    })

    this.callmePhone();
    this.data.showRegister_module && this.scanAddRecord();
  },


  // 记录扫描
  scanAddRecord() {
    let _this = this
    _this.data.id && !_this.data.showRegister_module && wx.request({
      url: app.globalData.apiUrl + 'api/scan',
      data: Object.assign({}, _this.data.userInfo, {
        supercode: _this.data.id
      }),
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let data = res.data;
      },
      fail: function (res) {
        console.log('isFail')
      }
    })
  },

  // 获取联系件信息
  getApply() {
    let _this = this;
    
    _this.data.id && wx.request({
      url: api.rootUrl + 'api/apply?supercode_id=' + _this.data.id,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let data = res.data;
        
        _this.setData({
          userApply: data.data
        });

        _this.getUserCard(data.data.user_id);

      },
      fail: function (res) {
        console.log('isFail')
      }
    })
  },



  getUserCard(user_id) {
    let _this = this;

    wx.request({
      url: api.rootUrl + 'api/auth/getUser?user_id=' + user_id,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let data = res.data;

        // console.log(data.data)
        
        _this.setData({
          userCard: data.data
        });

      },
      fail: function (res) {
        console.log('isFail')
      }
    });
  },

  // 分享
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    return {
      title: 'Call我吧',
      path: '/pages/home/home?id=' + this.data.userApply.supercode_id
    }
  }



});