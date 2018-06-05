Page({
  data: {
    currentItemInd: 0
  },
  onReady() {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#f2f2f2'
    })
  },
  onLoad(option) {
    let _this = this
    wx.request({
      url: 'https://salex.applinzi.com/api',
      success: function (res) {
        _this.setData({
          lists: res.data.data
        })
        console.log(res.data.data)
      }
    })
  },
  onEditItem(e) {
    let ind = e.currentTarget.dataset.ind

    this.setData({
      currentItemInd: ind || 0
    })

    if(ind) {
      wx.navigateTo({
        url: '/pages/add/add?edit=' + ind,
      })
    }else {
      wx.showToast({
        title: 'ID为空',
        icon: 'none',
        duration: 2000
      })
    }
  },
  onDeleteItem(e) {
    let ind = e.currentTarget.dataset.ind

    if(ind) {
      wx.showModal({
        title: '删除提示',
        content: `确认删除${ind}？`,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.showToast({
        title: 'ID为空',
        icon: 'none',
        duration: 2000
      })
    }
  }
})