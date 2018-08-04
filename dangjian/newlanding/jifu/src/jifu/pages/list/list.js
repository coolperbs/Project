define( 'jifu/pages/list/list', function( require, exports, module ) {
    var p = Page( {
        nodeClass: 'w-p-list',
        parentClass: 'J_Main', // 没有就直接插入body，或者不插入
        source: ['jifu/pages/list/list.tpl','jifu/pages/list/list.css'],
        show : function() {
            var self = this;
        },
        on : {
        }
    });

    module.exports = p;
} );
