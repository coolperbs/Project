define( 'tongzilin/pages/sub/create/create', function( require, exports, module ) {
	require( 'tongzilin/pages/sub/create/create.tpl' );
	require( 'tongzilin/pages/sub/create/create.css' );

	var handle, CFG, _fn, kayak, kDom, DOM_EVENT, userServices, router,
		kayak = require( 'kayak/core/kayak' ),
		login = require( 'tongzilin/widgets/login/login' ),
		config = require( 'tongzilin/config/config' ),
		ajax = require( 'tongzilin/common/ajax/ajax' ),
		utils = require( 'tongzilin/common/utils/utils' ),
		pop = require( 'tongzilin/widgets/pop/pop' ),
		isSubmit = false,
		_fn,
		kDom = kayak.dom;

	handle = {
		nodeClass: 'w-p-sub-create',
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
			jView.on( 'click', '.J_Submit', function( e ) {
				login.login( _fn.submit );
			} );
		},
		submit : function() {
			if ( isSubmit ) {
				return;
			}
			isSubmit = true;
			// 内容
			_fn.checkForm(  function() {
				// 上传文件
				_fn.updateFile( function( res ) {
					// 提交表单
					_fn.submitForm();
				} );
			} );
		},
		updateFile : function( callback ) {
            var jFile = handle.jView.find( '.J_File' );
            var form = new FormData();  

            // 没有上传文件的情况
			if ( !jFile[0] || !jFile[0].files[0] ) {
				callback && callback();
				return;
			}    
            form.append( 'uploadFile', jFile[0].files[0] );  
			$.ajax({  
		        url: config.url.upload,  
		        type: 'POST',  
		        data: form,  
		        xhrFields : {
		        	withCredentials : true,
		        },
		        processData: false,  // 告诉jQuery不要去处理发送的数据  
		        contentType: false  // 告诉jQuery不要去设置Content-Type请求头  
		    }).done(function(res){  
		    	if ( utils.isErrorRes( res ) ) {
		    		pop.show( { msg : res.msg || '系统错误' } );
		    		isSubmit =  false;
		    		return;
		    	}
		    	handle.jView.find( 'input.J_AttachUrl' ).val( res.data.fileUri );
		    	callback && callback();
		    });  			
		},
		checkForm : function( callback ) {
			var jForm = handle.jView.find( '.J_Form' ),
				elements = jForm[0].elements,
				list = ['userName', 'userPhone', 'name', 'desc'],
				i, key;

			for ( i = 0; key = list[i]; ++i ) {
				if ( elements[key].value == '' ) {
					pop.show( { msg : '请填写' + elements[key].getAttribute( 'data-name' ) } )
					isSubmit = false;
					return;
				}
			}
			if ( !/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test( elements['userPhone'].value ) ) {
				pop.show( { msg : '请填写正确的手机号' } );
				isSubmit = false;
				return;
			}
			callback && callback();
		},
		submitForm : function() {
			var param = utils.formToData( handle.jView.find( '.J_Form' ) );
			ajax.query( config.url.projectAdd, param, function( res ) {
				isSubmit = false;
				if ( utils.isErrorRes( res ) ) {
					pop.show( { msg : res.msg || '系统错误' } );
					return;
				}
				pop.show( { msg : '创建成功' } );
				_fn.render();
			} );
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
