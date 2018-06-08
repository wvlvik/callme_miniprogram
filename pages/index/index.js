Page({
  data: {
    typeid: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showRegister_module: true,
    phone: '18616614914'
  },
  onLoad(option) {

    let _this = this

    if (option.phone) this.data.phone = option.phone

    this.setData({
      showRegister_module: option.hide ? false : true,
      typeid: parseFloat(option.typeid) || 0
    })

    console.log(option)

    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)

              _this.setData({
                userInfo: res.userInfo
              })

            }
          })
        }
      }
    })

  },
  contactus() {

  },
  callmePhone() {
    this.data.userInfo && wx.makePhoneCall({
      phoneNumber: this.data.phone
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)

    !this.data.userInfo && e.detail.userInfo && this.setData({
      userInfo: e.detail.userInfo
    })

    this.callmePhone()
  }
})