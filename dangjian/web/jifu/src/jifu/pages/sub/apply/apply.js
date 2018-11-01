define( 'jifu/pages/sub/apply/apply', function( require, exports, module ) {
	require( 'jifu/pages/sub/apply/apply.tpl' );
	require( 'jifu/pages/sub/apply/apply.css' );

	var handle, CFG, _fn, kayak, kDom, DOM_EVENT, userServices, router,
		kayak = require( 'kayak/core/kayak' ),
		utils = require( 'jifu/common/utils/utils' ),
		pop = require( 'jifu/widgets/pop/pop' ),
		_fn, 
		isSubmit = false,
		kDom = kayak.dom;

	handle = {
		nodeClass: 'w-p-sub-apply',
        show : function( jParent ) {
        	this.jParent = jParent;
        	isSubmit = false;
        	_fn.initDOM();
        	handle.jView.kInsert();
        	_fn.renderNote();
        	//_fn.renderForm();
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

			jView.on( 'click', '.J_Next', function() {
				_fn.renderForm();
			} );

			jView.on( 'click', '.J_Submit', function( e ) {
				_fn.submit();
			} );
		},
		submit : function() {
			var jView = handle.jView,
				jForm = jView.find( '.J_Form' ),
				data;

			if ( isSubmit ) {
				return;
			}
			if ( !_fn.checkForm( jForm ) ) {
				return;
			}
			data = utils.formToData( jForm );
			isSubmit = true;
			ajax.query( config.url.partyAdd, data, function( res ) {
				isSubmit = false;
				if ( utils.isErrorRes( res ) ) {
					pop.show( { msg : res.msg || '系统错误' } );
					return;
				}
				pop.show( { msg : '提交成功' } );
				_fn.renderForm();
			} )
		},
		checkForm : function( ) {
			var jForm = handle.jView.find( '.J_Form' ),
				elements = jForm[0].elements,
				list = ['userName', 'idCard', 'userPhone', 'gender', 'nation', 'organization', 'placeOrigin', 'occupation','industry', 'education', 'school', 'goodat', 'livingPlace'],
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

		renderNote : function() {
			var temp,
				jView = handle.jView;

			jView.find( '.step' ).removeClass( 'current' );
			jView.find( '.step.1' ).addClass( 'current' );
			jView.find( '.J_Next' ).show();
			jView.find( '.J_Submit' ).hide();
           	temp = template.compile( jView.find( '.J_Note' ).text() );
            jView.find( '.J_Cont' ).html( temp() );		
		},

		renderForm : function() {
			var temp,
				jView = handle.jView;

			jView.find( '.step' ).removeClass( 'current' );
			jView.find( '.step.2' ).addClass( 'current' );
			jView.find( '.J_Next' ).hide();
			jView.find( '.J_Submit' ).show();
           	temp = template.compile( jView.find( '.J_ContTemp' ).text() );
            jView.find( '.J_Cont' ).html( temp() );					
		}
	}
	module.exports = handle;
} );
