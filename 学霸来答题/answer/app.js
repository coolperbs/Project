var EVT = 'online',
	host,url;

host = {
	online : 'https://summer.buluotech.com/',
	test : 'https://summer.buluotech.com/'
};

url={
  POST_LOGIN:"api/answer_v1/auths",//微信登录认证接口
  POST_verification_requests:"api/answer_v1/auth/verification_requests",//注册发送验证码
  POST_verification:"api/answer_v1/auth/verifications",//验证码校验
};

App( {
	HOST : host[EVT],
  GET_API:function (key) {
	  if(!url[key]){
	    return ''
    }
    return this.HOST+ url[key];
  },
});
