"use strict";
cc._RF.push(module, 'e06f5YOF41Lv5F08Nh82ZC0', 'Star');
// scripts/Star.js

"use strict";

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
        pickRadius: 0
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    getPlayerDistance: function getPlayerDistance() {
        console.log(this.game);
    },

    start: function start() {},


    update: function update(dt) {
        this.getPlayerDistance();
    }
});

cc._RF.pop();