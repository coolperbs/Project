import axios from 'axios'
import CFG from '@/config'
let handle;
let _fn;


axios.defaults.withCredentials=true; // 设置带cookie
axios.interceptors.request.use( function( config ) {
	if ( config.url.indexOf( 'http' ) != 0 ) {
		config.url = CFG.host + config.url;
	}
	return config;
} );

axios.interceptors.response.use( function( config ) {
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
	get : function( url, param, callback ) {
		if ( typeof param === 'function' ) {
			callback = param;
			param = {};
		}		
		axios.get( url, { params : { param : param } } ).then( callback );
	}
}

export default handle;