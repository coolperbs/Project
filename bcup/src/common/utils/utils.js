let handle;

handle = {
	isErrorRes : function( res ) {
		if ( !res || !res.success ) {
			return true;
		}
		return false;
	},

	// 便于后面替换
	showError : function( msg ) {
		console.error( '页面错误:' + msg );
	},

	fixPrice : function( s ) {
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
     }
}

export default handle;