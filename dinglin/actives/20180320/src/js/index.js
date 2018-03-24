( function() {
	var handle, _fn,
		jWindow = $( window ),
		jBody = $( document.body );

	handle = {
		init : function() {
			_fn.render();
			_fn.bind();
			//_fn.showPop( $( '#J_Form' ), { type : 2 } );
		}
	}

	_fn = {
		render : function() {
			$.get( 'http://actgw.yimeixinxijishu.com/act/count', function( res ) {
				res = res || {};
				if ( res.code != '0000' ) {
					return;
				}
				$( '#J_Count' ).show().find( '.J_Num' ).html( res.data );
			} );
		},

		bind : function() {
			// 显示
			$( '.J_ShowPop' ).click( function( e ) {
				var jTarget = $( e.target );
				_fn.showPop( $( '#' + jTarget.attr( 'data-id' ) ), { type : jTarget.attr( 'data-type' ) } );
			} );

			$( '.J_ClosePop' ).click( function( e ) {
				var jTarget = $( e.target );
				_fn.closePop( $( '#' + jTarget.attr( 'data-id' ) ) );
			} );

			$( '.J_Submit' ).click( function( e ) {
				_fn.submit();
			} );			
		},

		showPop : function( jEl, options ) {
			var jPop = jEl.find( '.J_Pop' );

			jEl.css( { display : 'block' } );
			// jEl.find( '.J_Pop' ).css( { 
			// 	height : height,
			// 	top : jWindow.height() * 0.1
			// } );
			jPop.css( {
				marginTop : -jPop.height() / 2 + 'px'
			} );

			if ( options && options.type ) {
				jPop.find( 'select[name=type]' ).val( options.type );
			}
			jEl.find( '.J_ScrollCont' ).css( {
				height : jPop.height() - 90 + 'px'
			} );
		},

		closePop : function( jEl ) {
			jEl.css( { display : 'none' } );
		},

		submit : function( e ) {
			var data = _fn.getFormData();

			if ( !_fn.checkData( data ) ) {
				return;
			}
			$.post( 'http://actgw.yimeixinxijishu.com//act/apply', { param : JSON.stringify( data ) }, function( res ) {
				console.log( res );
				res = res || {};
				if ( res.code != '0000' ) {
					alert( res.msg || '申请失败' );
					return;
				}
				window.location.href = './src/images/end.jpeg';
			} );
		},

		getFormData : function() {
			var result = {},
				jForm = $( '#J_Form' ),
				type;

			result.username = $.trim( jForm.find( 'input[name=username]' ).val() );
			result.idCard = $.trim( jForm.find( 'input[name=idCard]' ).val() );
			result.bankCard = $.trim( jForm.find( 'input[name=bankCard]' ).val() );
			result.address = $.trim( jForm.find( 'input[name=address]' ).val() );
			result.phone =  $.trim( jForm.find( 'input[name=phone]' ).val() );
			type = $.trim( jForm.find('select[name=type]').val() * 1 );
			if ( type == 1 ) {
				result.level = '88元档';
				result.model = '荣耀畅玩6 2g+16g';
			} else if ( type == 2 ) {
				result.level = '158元档';
				result.model = '华为畅享7s 3g+32g';
			} else if ( type == 3 ) {
				result.level = '158元档';
				result.model = '红米5 3g+32g';
			} else if ( type == 4 ) {
				result.level = '158元档';
				result.model = '金立F6L 3g+32g';
			} else if ( type == 5 ) {
				result.level = '158元档';
				result.model = '荣耀V9 Play 4g+32g';
			} else if ( type == 6 ) {
				result.level = '188元档';
				result.model = '华为畅享7s 4g+64g';
			} else if ( type == 7 ) {
				result.level = '188元档';
				result.model = 'VIVO Y75 4g+64g';
			} else if ( type == 8 ) {
				result.level = '188元档';
				result.model = 'OPPO A73t 4g+64g';
			} else if ( type == 9 ) {
				result.level = '188元档';
				result.model = '红米5Plus 4g+64g';
			} else if ( type == 10 ) {
				result.level = '238元档';
				result.model = 'VIVO Y79 4g+64g';
			} else if ( type == 11 ) {
				result.level = '238元档';
				result.model = 'OPPO A79t 4g+64g';
			}
			return result;
		},
		checkData : function( data ) {
			var key = ['username','phone','idCard','bankCard','address' ],
				text, k, len;

			text = {
				'username' : '申请人姓名',
				'phone' : '手机号',
				'idCard' : '身份证',
				'bankCard' : '招行信用卡号',
				'address' : '收货地址'
			}

			for ( i = 0; k = key[i]; ++i ) {
				if ( !data[k] ) {
					alert( '请填写' + text[k] );
					return false;
				}
				if ( k == 'phone' && !/^[1][3,4,5,7,8][0-9]{9}$/.test( data[k] ) ) {
					alert( '请填写正确的手机号' );
					return false;
				}
			}
			return true;
		}
	}

	handle.init();
} )();