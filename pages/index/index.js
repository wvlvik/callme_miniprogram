Page({
  data: {
    typeid: 0,
    showRegister_module: true,
    phone: '18616614914'
  },
  onLoad(option) {
    if (option.phone) this.data.phone = option.phone

    this.setData({
      showRegister_module: option.hide ? false : true,
      typeid: parseFloat(option.typeid) || 0
    })

    console.log(option)
    // console.log(decodeURIComponent(option.scene))

  },
  callmePhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.phone
    })
  }
})