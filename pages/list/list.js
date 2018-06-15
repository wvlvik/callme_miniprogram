const api = require('../../config/api.js');
const util = require('../../utils/util.js');

Page({
  data: {
    rootUrl: api.rootUrl,
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

    wx.showLoading({
      title: '加载中',
    })

    // 检查登录状态
    util.checkSession().then(res => {
      let userInfo = wx.getStorageSync('userInfo');

      wx.request({
        url: api.rootUrl + 'api/apply?user_id=' + userInfo.username,
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          _this.setData({
            lists: res.data.data
          });
          wx.hideLoading();
        }
      })

    }).catch(e => {
      console.log('跳登录页面');
    })

    
  },


  onEditItem(e) {
    let ind = e.currentTarget.dataset.ind

    this.setData({
      currentItemInd: ind || 0
    });

    if(ind) {
      wx.navigateTo({
        url: '/pages/add/add?edit=' + ind,
      })
    }else {
      util.showErrorToast('ID为空');
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
  },


  formatTime(da) {
    console.log(da)
    return util.formatTime(da);
  } 
})