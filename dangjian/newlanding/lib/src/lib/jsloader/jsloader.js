		/* js、css资源加载器 */
		( function() {
			var _fn, Loader, cookie, CFG, SOURCE_ROOT;

			CFG = {
				COOKIE_UPDATE_TIME : 'updateTime', 
				COOKIE_INITED : 'inited',
				STATIC_URL : window.kayak.root
			}
			Loader = {
				loadJs : function( callback, version ) {
					version = version + '' || '';
					var scripts = document.getElementsByTagName( 'script' ),
						root = _fn.getSourceRoot(),
						updateTime = cookie.get( CFG.COOKIE_UPDATE_TIME ),
						list = [], i, s, link;

					for ( i = 0; s = scripts[i]; ++i ) {
						link = s.getAttribute( 'data-src' );
						if ( link ) {
							link = root + link;
							link = version ? link + '?t=' + version : link;
							//link += '&updatetime=' + updateTime;
							list.push( link );
						}
					}
					_fn.loadJsWrapper( list, callback );
				},
				loadCss : function( version ) {
					version = version + '' || '';
					var styles = document.getElementsByTagName( 'link' ),
						root = _fn.getSourceRoot(),
						updateTime = cookie.get( CFG.COOKIE_UPDATE_TIME ),
						i, link, href;

					for ( i = 0; link = styles[i]; ++i ) {
						href = link.getAttribute( 'data-href' );
						if ( href ) {
							href = root + href;
							href = version ? href + '?t=' + version : href;
							//href += '&updatetime=' + updateTime;
							link.href = href;
						}
					}
				}
			}

		    cookie = {
		        get: function( b ) {
		            var c = new RegExp("(^|;|\\s+)" + b + "=([^;]*)(;|$)"),
		            	a = document.cookie.match(c);

		            return ( !a ? '' : unescape( a[2] ) );
		        },

		        add: function( sName, sValue, day, path, domain ) {
		            var expireDate = new Date(),
		                defaultDay = 30;

		            // 微信失效时间为30天，浏览器失效时间为1天
		            day = day || defaultDay;
		            expireDate.setDate(expireDate.getDate() + day);
		            path = path || '/';
		            domain = document.domain || 'dmall.com';
		            //设置失效时间
		            document.cookie = escape(sName) + '=' + escape(sValue)
		                                +';expires=' + expireDate.toGMTString()
		                                + ';path=' + path
		                                + ';domain=' + domain ;
		            //escape()汉字转成unicode编码,toGMTString() 把日期对象转成字符串
		        },


		        del: function( a, path, domain ) {
		            var date = new Date(),
		                path = path || '/';

		            domain =  domain || 'dmall.com';
		            date.setTime( date.getTime() - 10000 );
		            document.cookie = a + "=; expires=" + date.toGMTString()
		                                + ';path=' + path
		                                + ';domain=' + domain;
		        }
		    }

			_fn = {
				checkInit : function() {	
					var inited = cookie.get( CFG.COOKIE_INITED ),
						updateTime = cookie.get( CFG.COOKIE_UPDATE_TIME ),
						domain = document.domain, 
						day = 30;
					if ( inited + '' != 'true' || updateTime + '' == '' ) {	
						cookie.add( CFG.COOKIE_UPDATE_TIME, new Date().getTime(), day, '/', domain );
					}
					cookie.add( CFG.COOKIE_INITED, 'false', day, '/', domain );
				},

				getSourceRoot : function() {
					var href = window.location.href,
						param = _fn.getRequest(),
						result = '';	

					// 已经有了直接走内存变量
					if ( SOURCE_ROOT ) {
						return SOURCE_ROOT;
					}
					// 调试模式走调试地址
					if ( param.debuglocation && /http:\/\/[A-Za-z0-9]+.dmall.com/.test( param.debuglocation ) ) {
						SOURCE_ROOT = param.debuglocation;
						return SOURCE_ROOT;
					}
					// 默认走环境+静态资源路径
					SOURCE_ROOT = CFG.STATIC_URL;
					return SOURCE_ROOT;
				},

				getEvt : function() {
					var href = window.location.href,
						result = '';
					if ( href.indexOf( 'http://test' ) == 0 && href.indexOf( 'http://test.' ) == -1 ) {
						result = 'http://test';
					} else if ( href.indexOf( 'http://dev' ) == 0 && href.indexOf( 'http://dev.' ) == -1 ) {
						result = 'http://dev';
					} else {
						result = 'http://';
					}
					return result;
				},

				getRequest : function( type ) {
				    var url,
				   	   theRequest = {},
				   	   i, strs;


				   	type = type || 'search';
				   	switch ( type ) {
				   		case 'hash' :
				   		 	url = window.top.location.href.split( '#' )[1] || '';
				   		 	break;
				   		case 'search' :
				   			// 避免hash不规范情况
				   			url = window.top.location.href.split( '?' )[1] || '';
				   			url = url.split( '#' )[0];
				   			break;
				   	}
					strs = url.split( '&' );
					for( i = 0; i < strs.length; i ++) {
					 	theRequest[strs[i].split( '=' )[0]] = unescape(strs[i].split( '=' )[1]);
					}
				    return theRequest;
				},				

				loadJsWrapper : function( list, callback ) {
					list = list || [];
					var i, link, 
						charset = 'UTF-8';

					if ( typeof list == 'string' ) {
						list = [list];
					}
					link = list.shift();
					if ( !link || !link.length ) {
						if ( typeof callback == 'function' ) {
							callback();
						}
						return;
					}
					_fn.loadJs( link, charset, function(){ 
						_fn.loadJsWrapper( list, callback );
					} );
				},

				loadJs : function( src, charset, callback ) {
					var script = document.createElement( 'script' ),
						head = document.getElementsByTagName( 'head' )[0] || document.body;
					if ( script.readyState ) {
						script.onreadystatechange = function() {
							if ( script.readyState == 'loaded' || script.readyState == 'complete' ) {
								script.onreadystatechange = null;
								if ( typeof callback === 'function' ) {
									callback();
								}
							}
						}
					} else {
						script.onload = function() {
							if ( typeof callback === 'function' ) {
								callback();
							}					
						}
					}
					script.charset = charset;
					script.src = src;
					head.appendChild( script );
				}					
			}

			_fn.checkInit();
			window.kayak = window.kayak || {};
			window.kayak.Loader = Loader;
		} )();