//app.js
const url = {
  local: 'http://192.168.1.222:8360/',
  remote: 'https://salex.applinzi.com/'
}

const util = require('./utils/util');
const api = require('./config/api');
const user = require('./service/user');


App({
  onLaunch() {
    let _this = this
    
    //获取用户的登录信息
    user.checkLogin().then(res => {
      console.log('app login')
      this.globalData.userInfo = wx.getStorageSync('userInfo');
      this.globalData.token = wx.getStorageSync('token');
    }).catch(() => {

    });
  },
  globalData: {
    apiUrl: url.local,
    userInfo: {
      nickname: 'Hi, 游客',
      username: '点击去登录',
      avatar: ''
    },
    token: '',
  }
})