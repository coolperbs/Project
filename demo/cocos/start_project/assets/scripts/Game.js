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
        maxStarDuration : 0,
        minStarDuration : 0,
        // 这里进行关联
        starPrefab : {
            default : null,
            type : cc.Prefab
        },
        ground : {
            default : null,
            type: cc.Node
        },
        player : {
            default : null,
            type: cc.Node
        },
        scoreDisplay : {
            default : null,
            type : cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.groundY = this.ground.y + this.ground.height / 2;
        this.timer = 0;
        this.starDuration = 0;
        this.spawnNewStar();
        this.score = 0;
    },

    start () {

    },

    spawnNewStar : function() {
        var newStar = cc.instantiate( this.starPrefab );
        // this.node 指向canvas
        this.node.addChild( newStar );
        newStar.setPosition( this.getNewStarPosition() );

        newStar.getComponent( 'Star' ).game = this; // 感觉是反射
        this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },

    getNewStarPosition : function() {
        var randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        var randY = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight + 50;
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        var maxX = this.node.width/2;
        randX = cc.randomMinus1To1() * maxX;
        // 返回星星坐标
        return cc.p(randX, randY); 
    },

    gainScore : function() {
        this.score += 1;
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
    },

    update : function (dt) {
        if ( this.timer > this.starDuration ) {
            console.log( 'asdf' );
            this.gameOver();
            return;
        }
        this.timer += dt;
    },
    gameOver : function() {
        this.player.stopAllActions();
        cc.director.loadScene( 'game' ); // 从头开始游戏
    }
});
