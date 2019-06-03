var pageParam;

Page({
    onLoad : function( p ) {
        pageParam = p || {};
    },

    onReady : function() {
        this.setData( {
            id : pageParam.id
        } );
    }
});