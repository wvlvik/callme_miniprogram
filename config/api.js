
const rootUrl = {
	localUrl: 'http://192.168.1.212:8360/',
 	remoteUrl: 'https://salex.applinzi.com/'
}
module.exports = {

  localUrl: rootUrl.localUrl,
  remoteUrl: rootUrl.remoteUrl,

  // IndexUrl: ApiRootUrl + 'index/index', //首页数据接口
  // CatalogList: ApiRootUrl + 'catalog/index',  //分类目录全部分类数据接口
  // CatalogCurrent: ApiRootUrl + 'catalog/current',  //分类目录当前分类数据接口

  AuthLoginByWeixin: rootUrl.localUrl + 'api/auth/loginByWeixin', //微信登录
};