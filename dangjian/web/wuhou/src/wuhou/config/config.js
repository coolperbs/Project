define('wuhou/config/config', function( require ) {
	var handle,
		host = 'http://zfgw.yimeixinxijishu.com',
		newsHost = 'http://zfcmsgw.yimeixinxijishu.com';

	handle = {
		url : {
			login : host + '/login',
			register : host + '/regist',
			projectAdd : host + '/app/project/add',
			projectSearch : host + '/app/project/search',
			upload : host + '/app/file/upload',
			partyAdd : host + '/app/party/apply/add',
			partyChange : host + '/app/party/transfer/add',
			newsList : newsHost + '/act/search',
			newsDetail : newsHost + '/act/view',
			projectClaim : host + '/app/project/claim',
			projectFinish : host + '/app/project/filish',
			projectNote : host + '/app/project/note',
			commentAdd : host + '/app/comment/submit',
			commentList : host + '/app/comment/list',
			analysis : host + '/info',
			home : newsHost + '/act/index',
			header : host + '/index/info'
		}
	}
	return handle;
} );