Page({
  data: {
    
  },
  onLoad(option) {
    if (option.id) {
      wx.redirectTo({
        url: '/pages/home/home?id=' + option.id,
      });
    }else {
      wx.redirectTo({
        url: '/pages/list/list',
      })
    }

  }
});