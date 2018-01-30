require = function t(e, i, c) {
function n(o, s) {
if (!i[o]) {
if (!e[o]) {
var r = "function" == typeof require && require;
if (!s && r) return r(o, !0);
if (a) return a(o, !0);
var u = new Error("Cannot find module '" + o + "'");
throw u.code = "MODULE_NOT_FOUND", u;
}
var h = i[o] = {
exports: {}
};
e[o][0].call(h.exports, function(t) {
var i = e[o][1][t];
return n(i || t);
}, h, h.exports, t, e, i, c);
}
return i[o].exports;
}
for (var a = "function" == typeof require && require, o = 0; o < c.length; o++) n(c[o]);
return n;
}({
Game: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "af26dMDHYBGeLTYgZicgSqI", "Game");
cc.Class({
extends: cc.Component,
properties: {
maxStarDuration: 0,
minStarDuration: 0,
starPrefab: {
default: null,
type: cc.Prefab
},
ground: {
default: null,
type: cc.Node
},
player: {
default: null,
type: cc.Node
},
scoreDisplay: {
default: null,
type: cc.Label
}
},
onLoad: function() {
this.groundY = this.ground.y + this.ground.height / 2;
this.timer = 0;
this.starDuration = 0;
this.spawnNewStar();
this.score = 0;
},
start: function() {},
spawnNewStar: function() {
var t = cc.instantiate(this.starPrefab);
this.node.addChild(t);
t.setPosition(this.getNewStarPosition());
t.getComponent("Star").game = this;
this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
this.timer = 0;
},
getNewStarPosition: function() {
var t = 0, e = this.groundY + cc.random0To1() * this.player.getComponent("Player").jumpHeight + 50, i = this.node.width / 2;
t = cc.randomMinus1To1() * i;
return cc.p(t, e);
},
gainScore: function() {
this.score += 1;
this.scoreDisplay.string = "Score: " + this.score.toString();
},
update: function(t) {
if (this.timer > this.starDuration) {
console.log("asdf");
this.gameOver();
} else this.timer += t;
},
gameOver: function() {
this.player.stopAllActions();
cc.director.loadScene("game");
}
});
cc._RF.pop();
}, {} ],
Player: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "0fef3p1KFBPga4y9gSqlMrY", "Player");
var c;
cc.Class({
extends: cc.Component,
properties: {
jumpHeight: 0,
jumpDuration: 0,
maxMoveSpeed: 0,
accel: 0,
jumpAudio: {
default: null,
url: cc.AudioClip
}
},
onLoad: function() {
this.jumpAction = c.setJumpAction(this);
c.setInputControl(this);
this.accLeft = !1;
this.accRight = !1;
this.xSpeed = 0;
this.node.runAction(this.jumpAction);
},
start: function() {},
update: function(t) {
this.accLeft ? this.xSpeed -= this.accel * t : this.accRight && (this.xSpeed += this.accel * t);
Math.abs(this.xSpeed) > this.maxMoveSpeed && (this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed));
this.node.x += this.xSpeed * t;
}
});
c = {
setJumpAction: function(t) {
var e = cc.moveBy(t.jumpDuration, cc.p(0, t.jumpHeight)).easing(cc.easeCubicActionOut()), i = cc.moveBy(t.jumpDuration, cc.p(0, -t.jumpHeight)).easing(cc.easeCubicActionIn()), n = cc.callFunc(c.playJumpSound, t);
return cc.repeatForever(cc.sequence(e, i, n));
},
playJumpSound: function() {
cc.audioEngine.playEffect(this.jumpAudio, !1);
},
setInputControl: function(t) {
cc.eventManager.addListener({
event: cc.EventListener.KEYBOARD,
onKeyPressed: function(e, i) {
switch (e) {
case cc.KEY.a:
t.accLeft = !0;
t.accRight = !1;
break;

case cc.KEY.d:
t.accLeft = !1;
t.accRight = !0;
}
},
onKeyReleased: function(e, i) {
switch (e) {
case cc.KEY.a:
t.accLeft = !1;
break;

case cc.KEY.d:
t.accRight = !1;
}
}
}, t.node);
}
};
cc._RF.pop();
}, {} ],
Star: [ function(t, e, i) {
"use strict";
cc._RF.push(e, "e06f5YOF41Lv5F08Nh82ZC0", "Star");
cc.Class({
extends: cc.Component,
properties: {
pickRadius: 60
},
start: function() {},
update: function(t) {
if (this.getPlayerDistance() < this.pickRadius) this.onPicked(); else {
var e = 1 - this.game.timer / this.game.starDuration;
this.node.opacity = 50 + Math.floor(205 * e);
}
},
getPlayerDistance: function() {
var t = this.game.player.getPosition();
return cc.pDistance(this.node.position, t);
},
onPicked: function() {
this.game.spawnNewStar();
this.game.gainScore();
this.node.destroy();
}
});
cc._RF.pop();
}, {} ]
}, {}, [ "Game", "Player", "Star" ]);