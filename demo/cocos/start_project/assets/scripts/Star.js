// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        pickRadius : 60
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},


    start () {

    },

    update : function( dt ) {
        if ( this.getPlayerDistance() < this.pickRadius ) {
            this.onPicked();
            return;
        }
        var op = 1 - this.game.timer / this.game.starDuration;
        var minOp = 50;
        this.node.opacity = minOp + Math.floor( op * ( 255 - minOp ) );
    },

    getPlayerDistance : function() {
        var playerPos = this.game.player.getPosition(); 
        var dist = cc.pDistance( this.node.position, playerPos );
        return dist;
    },

    onPicked :function() {
        this.game.spawnNewStar(); // 创建新的星星
        this.game.gainScore();
        this.node.destroy(); // 销毁当前节点
    }
});
