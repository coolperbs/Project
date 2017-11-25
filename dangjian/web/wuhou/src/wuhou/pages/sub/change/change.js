define( 'wuhou/pages/sub/change/change', function( require, exports, module ) {
	require( 'wuhou/pages/sub/change/change.tpl' );
	require( 'wuhou/pages/sub/change/change.css' );

	var handle, CFG, _fn, kayak, kDom, DOM_EVENT, userServices, router,
		kayak = require( 'kayak/core/kayak' ),
		pop = require( 'wuhou/widgets/pop/pop' ),
		utils = require( 'wuhou/common/utils/utils' ),
		ajax = require( 'wuhou/common/ajax/ajax' ),
		config = require( 'wuhou/config/config' ),
		_fn,
		kDom = kayak.dom;

	handle = {
		nodeClass: 'w-p-sub-change',
        show : function( jParent ) {
        	this.jParent = jParent;
        	_fn.initDOM();
        	handle.jView.kInsert();
        	_fn.render();
        },
        hide : function() {
        	if ( !handle.jView ) {
        		return;
        	}
        	handle.jView.kRemove();
        }
	}


	_fn = {
		initDOM : function() {
			if ( handle.jView ) {
				return;
			}
			handle.jView = kDom.get( handle.nodeClass, handle.jParent );
			_fn.bind();
			return;
		},
		bind : function() {
			var jView = handle.jView;

			jView.on( 'click', '.J_Submit', function() {
				_fn.submit();
			} );
		},

		submit : function() {
			var jView = handle.jView,
				jForm = jView.find( '.J_Form' ),
				data;

			if ( !_fn.checkForm( jForm ) ) {
				return;
			}
			data = utils.formToData( jForm );
			ajax.query( config.url.partyChange, data, function( res ) {
				if ( utils.isErrorRes( res ) ) {
					pop.show( { msg : res.msg || '系统错误' } );
					return;
				}
				pop.show( { msg : '提交成功' } );
				_fn.render();
			} )
		},
		checkForm : function( ) {
			var jForm = handle.jView.find( '.J_Form' ),
				elements = jForm[0].elements,
				list = ['userName', 'idCard', 'userPhone'],
				i, key;

			for ( i = 0; key = list[i]; ++i ) {
				if ( elements[key].value == '' ) {
					pop.show( { msg : '请填写' + elements[key].getAttribute( 'data-name' ) } )
					return false;
				}
			}
			if ( !/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test( elements['userPhone'].value ) ) {
				pop.show( { msg : '请填写正确的手机号' } );
				return false;
			}
			return true;
		},
		render : function() {
			var temp,
				jView = handle.jView;

        	temp = template.compile( jView.find( '.J_ContTemp' ).text() );
        	jView.find( '.J_Cont' ).html( temp() );				
		}
	}
	module.exports = handle;
} );
