import axios from 'axios'
import CFG from '@/config'
let handle;
let _fn;


axios.defaults.withCredentials=true; // 设置带cookie
axios.defaults.timeout = 6000000;
axios.interceptors.request.use( function( config ) {
	if ( config.url.indexOf( 'http' ) != 0 ) {
		config.url = CFG.host + config.url;
	}
	return config;
} );

axios.interceptors.response.use( function( config ) {
	if ( config && config.data && config.data.code * 1 == 8888 ) {
		window.location.replace('http://gw.ypzmkj.com/login?callbackUrl=' + encodeURIComponent( window.location.href) ); 
		return;
	}	
	return config.data || { code : -1 };
} );

handle = {
	post : function( url, param, callback ){
		if ( typeof param === 'function' ) {
			callback = param;
			param = {};
		}
		axios.post( url, { params : { param : param } } ).then( callback ).catch( callback );
	},
	postForm : function( url, param, callback ){
		if ( typeof param === 'function' ) {
			callback = param;
			param = {};
		}
		var form = new FormData(),
			p;
		for ( p in param ) {
			form.append( p, param[p] );
		}
		axios.post( url, form, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}} ).then( callback ).catch( callback );
	},
	get : function( url, param, callback ) {
		if ( typeof param === 'function' ) {
			callback = param;
			param = {};
		}		
		axios.get( url, { params : { param : param } } ).then( callback );
	}
}

export default handle;