const user = require('../../service/user');
const app = getApp()

Page({
  data: {
    userApply: {
      tel: '18616614914',
      type: 0
    },
    showRegister_module: true
  },
  onLoad(option) {
    let _this = this
    if (option.phone) this.data.phone = option.phone

    this.setData({
      showRegister_module: option.hide ? false : true,
      id: option.id || null
    })

    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log('GetUserInfo2')
              _this.setData({
                userInfo: res.userInfo
              })
              _this.scanAddRecord()
            }
          })
        }
      }
    })


    this.getUserApply()

  },

  // 注册新用户
  registerNewUser() {
    user.loginByWeixin().then(res => {
      console.log(res.code)
    })
  },

  // 联系
  callmePhone() {
    this.data.userInfo && wx.makePhoneCall({
      phoneNumber: this.data.userApply.tel
    })
  },

  // 获取用户信息
  bindGetUserInfo(e) {
    console.log('GetUserInfo1')

    !this.data.userInfo && e.detail.userInfo && this.setData({
      userInfo: e.detail.userInfo
    })

    this.callmePhone()
    this.scanAddRecord()
  },

  // 记录扫描
  scanAddRecord() {
    let _this = this
    _this.data.id && wx.request({
      url: app.globalData.apiUrl + 'api/scan',
      data: Object.assign({}, _this.data.userInfo, {
        supercode: _this.data.id
      }),
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let data = res.data
      },
      fail: function (res) {
        console.log('isFail')
      }
    })
  },

  // 获取联系件信息
  getUserApply() {
    let _this = this
    _this.data.id && wx.request({
      url: app.globalData.apiUrl + 'api/apply?supercode_id=' + _this.data.id,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let data = res.data
      
        _this.setData({
          userApply: data.data
        })
      },
      fail: function (res) {
        console.log('isFail')
      }
    })
  }

})