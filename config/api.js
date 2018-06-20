
const rootUrl = {
	localUrl: 'http://192.168.1.222:8360/',
 	remoteUrl: 'https://salex.applinzi.com/'
}
const url = rootUrl.localUrl;

module.exports = {

  rootUrl: url,

  AuthLoginByWeixin: url + 'api/auth/loginByWeixin', //微信登录
  
};