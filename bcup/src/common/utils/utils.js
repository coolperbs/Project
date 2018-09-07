let handle;

handle = {
	isErrorRes : function( res ) {
		if ( !res || !res.success || res.code != '0000' ) {
			return true;
		}
		return false;
	},

	// 便于后面替换
	showError : function( msg ) {
		console.error( '页面错误:' + msg );
	},

	fixPrice : function( s ) {
		s = s * 1 / 100;
		s = s + '';
        if(/[^0-9\.]/.test(s)) return "invalid value";
        s=s.replace(/^(\d*)$/,"$1.");
        s=(s+"00").replace(/(\d*\.\d\d)\d*/,"$1");
        s=s.replace(".",",");
        var re=/(\d)(\d{3},)/;
        while(re.test(s))
                s=s.replace(re,"$1,$2");
        s=s.replace(/,(\d\d)$/,".$1");
        return s.replace(/^\./,"0.")
    },
	getCookie : function(name) { 
	    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	 
	    if(arr=document.cookie.match(reg))
	        return unescape(arr[2]); 
	    else 
	        return null; 
	} 
}

export default handle;