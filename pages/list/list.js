const user = require('../../service/user');
const api = require('../../config/api.js');
const util = require('../../utils/util.js');

Page({
  data: {
    rootUrl: api.rootUrl,
    user_count: 0
  },
  onReady() {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#f2f2f2'
    })
  },


  onLoad(option) {
    
  },


  onShow() {
    this.initList();
  },


  getUserCount() {
    let _this = this;
    let userInfo = wx.getStorageSync('userInfo');

    // 获取可用联系件数
    wx.request({
      url: api.rootUrl + 'api/auth/allCount?id=' + userInfo.id,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.setStorageSync('user_count', res.data.data.count);

        _this.setData({
          user_count: res.data.data.count
        });
      }
    });

  },


  initList() {
    let _this = this;

    wx.showLoading({
      title: '加载中',
    });

    // 检查登录状态
    util.checkSession().then(res => {
      let userInfo = wx.getStorageSync('userInfo');

      _this.getUserCount();

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
      });


    }).catch(e => {
      wx.hideLoading();
      console.log('跳登录页面');
    });

  },


  onAddNewContact(e) {
    let _this = this;

    if (!e.detail.userInfo) {
      util.showErrorToast('受权失败');
      return;
    }

    // 登录成功跳转至列表页
    user.loginByWeixin().then(res => {
      _this.getUserCount();

      wx.redirectTo({
        url: '/pages/add/add'
      });
    }).catch((err) => {
      util.showErrorToast('登录失败');
    });
  },


  onEditItem(e) {
    let ind = e.currentTarget.dataset.ind;

    if(ind) {
      wx.navigateTo({
        url: '/pages/add/add?id=' + ind,
      })
    }else {
      util.showErrorToast('ID为空');
    }
  },


  onDeleteItem(e) {
    let ind = e.currentTarget.dataset.ind

    if(ind) {
      wx.showModal({
        title: '删除提示',
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