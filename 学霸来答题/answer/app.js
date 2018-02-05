var EVT = 'online',
	host,url;

host = {
	online : 'https://summer.buluotech.com/',
	test : 'https://summer.buluotech.com/'
};


// 这个URI可以封装在services里，这样便于每个业务模块自己管理。
url={
  POST_LOGIN:"api/answer_v1/wechat_auths",//微信登录认证接口
  POST_verification_requests:"api/answer_v1/auth/verification_requests",//注册发送验证码
  POST_verification:"api/answer_v1/auth/verifications",//验证码校验
  userInfo:'api/answer_v1/user',//get 获取 put 更新
  GET_cities:'api/answer_v1/cities',//获取城市列表
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
