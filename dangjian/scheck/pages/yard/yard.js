Page({
    data : {
        markers : [{
            id : 0,
            longitude : 104.00453,
            latitude : 30.63008
        }]
    },

    callPhone : function() {
    	wx.makePhoneCall( {
    		phoneNumber : '17502846460'
    	} );
    },

    showMap : function() {
    	wx.openLocation( {
            longitude : 104.00453,
            latitude : 30.63008
    	} );
    }
});


