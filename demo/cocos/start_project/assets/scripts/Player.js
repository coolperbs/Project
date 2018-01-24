// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var fn;

cc.Class({
    extends: cc.Component,

    // 默认属性，导出后会被覆盖，外界能看
    properties: {
        jumpHeight : 0,
        jumpDuration : 0, // 跳跃持续时间
        maxMoveSpeed : 0, // 最大加速度
        accel : 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
       this.jumpAction = fn.setJumpAction( this );
       fn.setInputControl( this );


       this.accLeft = false;
       this.accRight = false;
       this.xSpeed = 0;
       this.node.runAction( this.jumpAction );
    },

    start () {
    },

    // 每帧的更新触发
    update (dt) {
        // dt应该是帧率时间
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }
        // 限制主角不能超过最大值
        if ( Math.abs(this.xSpeed) > this.maxMoveSpeed ) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        this.node.x += this.xSpeed * dt;    // 这里单独修改x值
    }
});
fn = {
    setJumpAction : function( caller ) {

        var jumpUp = cc.moveBy( caller.jumpDuration, cc.p( 0, caller.jumpHeight ) ).easing( cc.easeCubicActionOut() );
        var jumpDown = cc.moveBy( caller.jumpDuration, cc.p( 0, -caller.jumpHeight ) ).easing( cc.easeCubicActionIn() );
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    },

    setInputControl : function( caller ) {
        cc.eventManager.addListener( {
            event : cc.EventListener.KEYBOARD,
            // 按钮点下
            onKeyPressed: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.a:
                        caller.accLeft = true;
                        caller.accRight = false;
                        break;
                    case cc.KEY.d:
                        caller.accLeft = false;
                        caller.accRight = true;
                        break;
                }
            },
            // 松开按键时，停止向该方向的加速
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.a:
                        caller.accLeft = false;
                        break;
                    case cc.KEY.d:
                        caller.accRight = false;
                        break;
                }
            }
            // 按钮释放
        }, caller.node );   // 给node节点绑定事件
    }  
}   
