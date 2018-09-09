!function(){var a;a={INSTANCEID_ATTR:"data-instanceid",TEMPLATENAME_ATTR:"data-templatename",MODULENAME_ATTR:"data-modulename",TPL_SUFFIX:"tpl",kayakLocalKey:"kayak"},define("kayak/core/config",function(require,b,c){c.exports=a})}(),function(){var a=!1,b=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/;this.Class=function(){},Class.extend=function(c){function d(){!a&&this.init&&this.init.apply(this,arguments)}var e=this.prototype;a=!0;var f=new this;a=!1;for(var g in c)f[g]="function"==typeof c[g]&&"function"==typeof e[g]&&b.test(c[g])?function(a,b){return function(){var c=this._super;this._super=e[a];var d=b.apply(this,arguments);return this._super=c,d}}(g,c[g]):c[g];return d.prototype=f,d.prototype.constructor=d,d.extend=arguments.callee,d},define("kayak/core/classes/class",function(require,a,b){b.exports=this.Class})}(),function(){var a,b,c;c={instanceId:null,jView:null,configData:null,init:function(a,c){return c=c||{},a?(this.jView=a,this.instanceId=a.attr(b.INSTANCEID_ATTR),this.configData={},void(this.configData.data=c.data)):null},setConfigData:function(a){this.configData=$.extend(this.configData,a)},isInView:function(){}},define("kayak/core/classes/module.class",function(require,d,e){a=require("kayak/core/classes/class"),b=require("kayak/core/config"),e.exports=a.extend(c)})}(),function(){var a,b,c,d;d={INDEX_DIR:"/main/main"},a={init:function(b){a.router=b},getMain:function(a,b){var e=(a+"").split("/")[0],f=this.router,g={};return e?(g.path=a,g.mainPath=e+d.INDEX_DIR,f.events.fire("parseMain",g),void c.async(g.mainPath,b)):void("function"==typeof b&&b())},getActions:function(d,e){var f,g,h=a.router,i=h.events;g=b.parseActions(d);var j={actions:g};i.fire("preLoad",j),f=b.getSources(g),c.async(f,function(){b.setAction(g,arguments),i.fire("loadComplete",{actions:g}),"function"==typeof e&&e(g)})},getDifferent:function(a,b){var c,d,e,f;for(c=0,d=b.length;c<d&&(e=b[c]||{},f=a[c]||{},e.path==f.path);++c);return{newActions:b.slice(c),oldActions:a.slice(c)}},defaultActionRule:function(b){var c=a.router,d=b.path,e=c.pathMap,f=e[d];("string"==typeof f||$.isArray(f))&&(b.actionPath=f),"function"==typeof f&&(b.actionPath=f()),b.path!=b.fullPath||b.actionPath||(b.actionPath=b.fullPath)},exit:function(b){var c,d,e=a.router,f=e.events;if(b.length){for(f.fire("preExit",{actions:b}),c=0;d=b[c];++c)d.action&&"function"==typeof d.action.exit&&(f.fire("preEachExit",{action:d}),d.action.exit(),f.fire("eachExitComplete",{action:d}));f.fire("exitComplete",{actions:b})}},enter:function(b){var c,d,e=a.router,f=e.events;if(b.length){for(f.fire("preEnter",{actions:b}),c=0;d=b[c];++c)d.action&&"function"==typeof d.action.enter&&(f.fire("preEachEnter",{action:d}),d.action.enter(),f.fire("eachEnterComplete",{action:d}));f.fire("enterComplete",{actions:b})}}},b={parseActions:function(b){var c,d,e,f,g,h=a.router,i=h.events,j=[],k=[];for(g=b.split("/"),c=0;(d=g[c])&&(j.push(d),e=j.join("/"),f={fullPath:b,path:e,actionPath:null,action:null},i.fire("parseActions",f)!==!1);++c)a.defaultActionRule(f),f.actionPath&&"string"==typeof f.actionPath&&k.push(f);return k},setAction:function(a,b){var c,d=b.length;for(c=0,d=b.length;c<d;++c)b[c]&&(a[c].action=b[c])},getSources:function(a){var b,c,d=[];for(b=0;c=a[b];++b)c.actionPath&&d.push(c.actionPath);return d}},define("kayak/core/router/action.mod",function(require,b,d){c=require,d.exports=a})}(),function(){var a,b,c;a={set:function(a,c){var d,e,f,g,a=a.split(".");if(!(a.length<=0)){for(d=b.get(a[0])||"{}",d=JSON.parse(d),g=d,e=1,f=a.length;e<f;++e)g[a[e]]=e==f-1?c:g[a[e]]||{},g=g[a[e]];b.set(a[0],JSON.stringify(d))}},remove:function(a){var c,d,e,f,a=a.split(".");if(!(a.length<=0)){for(c=b.get(a[0])||"{}",c=JSON.parse(c),f=c,d=1,e=a.length;d<e;++d)d==e-1&&delete f[a[d]];b.set(a[0],JSON.stringify(c))}},get:function(a){var c,d,e,f,a=a.split(".");if(!(a.length<=0)){for(c=b.get(a[0])||"{}",c=JSON.parse(c),f=c,d=1,e=a.length;d<e&&(f=f[a[d]],"undefined"!=typeof f);++d);return"string"==typeof f?JSON.parse(f):f}}},define("kayak/core/localdata",function(require,d,e){c=require("kayak/core/router/deckinterface"),b=c.Storage,e.exports=a})}(),function(){var a,b={};a=function(a){a=a||[],this.events=a},a.prototype={addEventType:function(a){var b=this.events;b.indexOf(a)==-1&&b.push(a)},on:function(a,c){var d=this.events;d.indexOf(a)!=-1&&(b[a]=b[a]||[],b[a].push(c))},fire:function(a,c){var d,e,f=this.events;if(f.indexOf(a)!=-1&&b[a])for(d=0;e=b[a][d];++d)if("function"==typeof e&&e.call(window,c)===!1)return!1}},define("kayak/core/events",function(require,b,c){c.exports=a})}(),function(){var a;a={parseParam:function(a){var b,c,d,e,f={};for(a=a||"",a=a.split("&"),b=0,e=a.length;b<e;++b)c=a[b],c&&(d=c.split("="),2==d.length&&(f[d[0]]=d[1]));return f},isDmallApp:function(){return window.navigator.userAgent.match(/dmall/i)},has:function(a){return new Function("try { return "+a+" ? true : false; } catch( e ) { return false; }")()}},define("kayak/core/utils",function(require,b,c){c.exports=a})}(),function(){var a,b,c=window.localStorage;a={currentUrl:null,currentPos:-1,prevUrl:null,prevPos:-1,forward:null,backward:function(){},popFlow:function(){},pushState:function(){},popState:function(){},replaceState:function(){},getHistoryList:function(){}},b={set:function(a,b){c.setItem(a,b)},get:function(a){return c.getItem(a)},remove:function(a){c.removeItem(a)},getContext:null,setContext:null},define("kayak/core/router/deckinterface",function(require,c,d){var e={Navigator:a,Storage:b};window.galleon&&(e=$.extend(!0,e,window.galleon),window.galleon=e),d.exports=e})}(),function(){var a,b,c,d,e;b={LINK_CLASS:"J_Link",DEFAULT_LINK_ATTR:"data-defaultlink",DMALL_LINK_ATTR:"data-dmalllink",LINK_METHOD_ATTR:"data-linkmethod"},a={eventTypes:["click"],events:null,init:function(){a.inited||(a.events=a.events||new e(a.eventTypes),c.bind(),a.inited=!0)},on:function(b,c){a.events&&a.events.on(b,c)},isAppLink:function(a){return 0==a.indexOf("app:")||0==a.indexOf("rn:")}},c={bind:function(){$(document.body).on("click","."+b.LINK_CLASS,function(a){a.preventDefault(),c.jump($(this))})},jump:function(c){var e=c.attr(b.DEFAULT_LINK_ATTR)||c.attr("href"),f=c.attr(b.LINK_METHOD_ATTR)||"go",g=a.events;void 0!==e&&""!==e&&(d.isDmallApp()&&(e=c.attr(b.DMALL_LINK_ATTR)||e),g.fire("click",{method:f,link:e}))}},define("kayak/core/link/link",function(require,b,c){e=require("kayak/core/events"),d=require("kayak/core/utils"),c.exports=a})}(),function(){var a,b,c,d,e,f,g,h,i,j,k,l=0;b={hashFix:"#",paramSplit:":",DMALL_KAY:"dmalllink",WEB_KEY:"web"},a={eventTypes:["preJump","parseMain","parseActions","preLoad","loadComplete","preEnter","preEachEnter","enterComplete","enterEachComplete","preExit","preEachExit","exitComplete","exitEachComplete"],currentUrl:null,currentPath:null,currentActions:[],currentContainer:null,currentPos:-1,prevUrl:null,prevPath:null,prevActions:[],prevContainer:null,prevPos:-1,context:null,requestParam:null,backStep:0,isRunning:!1,isJumping:!1,pathMap:{},go:function(b,d){var e,f,g,i=a.events;h.Storage;if(d=d||{},e=c.resolvePath(b),g={pathData:e,type:"go",context:d},i.fire("preJump",g),c.setContext(g.context),f=g.pathData[c.getPathType()]||"",isNaN(1*f))return void c.forward(f,d);switch(f=1*f,!0){case f<0:c.back(f,d);break;case 0==f:a.refresh();break;case f>0:}},replace:function(b,d){var e,g,h=c.resolvePath(b),i=a.events;return d=d||{},h=c.resolvePath(b),e={pathData:h,type:"replace",context:d},i.fire("preJump",e),c.setContext(e.context),a.context=d,g=e.pathData[c.getPathType()]||"",f.has("galleon.Navigator.replace")?void galleon.Navigator.replace(g,d):void(b==a.currentUrl?j.enter(a.currentActions):location.replace(b))},refresh:function(b){var d,e=window.location.href,f=a.currentUrl,g=a.events;return b=b||{},pathData=c.resolvePath(e),d={pathData:pathData,type:"refresh",context:b},g.fire("preJump",d),c.setContext(d.context),a.context=b,f!=d.pathData.web?void(e.split("#")[0]==f.split("#")[0]?c.parsePath():window.location.reload()):void j.enter(a.currentActions)},redirect:function(b,d){var e,f,g,h=a.events;d=d||{},e=c.resolvePath(b),g={pathData:e,type:"redirect",context:d},h.fire("preJump",g),c.setContext(g.context),a.context=d,f=g.pathData[c.getPathType()]||"",c.parsePath(f)},map:function(b){$.isPlainObject(b)&&$.extend(a.pathMap,b)},on:function(b,c){a.events&&a.events.on(b,c)},start:function(){var b,d,e,f,g,h=a.events;a.isRunning||(window.addEventListener("hashchange",c.hashChange),d=window.location.hash,e=c.resolvePath(d),g=c.getContext(),b={pathData:e,type:"start",context:g},h.fire("preJump",b),c.setContext(b.context),f=b.pathData[c.getPathType()]||"",c.parsePath(f),a.isRunning=!0)},stop:function(){a.isRunning&&(window.removeEventListener("hashchange",c.hashChange),a.isRunning=!1)},getDirection:function(){var b,c,d,e=a.prevPos,g=a.currentPos;if(f.has("galleon.Navigator")&&(b=galleon.Navigator.prevPos||-1,c=galleon.Navigator.currentPos||-1),e!=-1)switch(!0){case g>e:d=1;break;case g==e:d=0;break;case g<e:d=-1}if(e==-1)switch(!0){case b==-1&&c==-1:d=1;break;case c>b:d=1;break;case c==b&&c!=-1:d=0;break;case c<b:d=-1}return d},getState:function(){return window.history.state||{}},pushState:function(a,b,c){a=a||{},b=b||"",a=$.extend(a,window.history.state),window.history.pushState(a,b,c)},replaceState:function(a,b,c){a=a||{},b=b||"",a=$.extend(a,window.history.state),"function"==typeof window.history.replaceState&&window.history.replaceState(a,b,c)}},c={init:function(){var a=this;a.events=a.events||new d(a.eventTypes),j.init(a)},forward:function(a,b){return f.has("galleon.Navigator.forward")?void galleon.Navigator.forward(a,b):void(window.location.href=a)},back:function(b,c){var d=window.history.state||{};a.events;return b=b/1||-1,f.has("galleon.Navigator.backward")&&d&&b-1+d.currentPos<0?void galleon.Navigator.backward(Math.abs(b-1+d.currentPos),"",c):(history.go(-1),void(l=b+1))},hashChange:function(){return l<0?void c.back(-1,c.getContext()):void c.parsePath()},parsePath:function(d){d="string"==typeof d?d:location.hash;a.config;d=d.indexOf("#")>-1?d.split("#")[1]:d,d=d.split(b.paramSplit),c.changeView(d.shift(),f.parseParam(d.join(":")))},changeView:function(b,d){var e,f=(a.events,window.history);a.requestParam=d,a.prevPath=a.currentPath,a.prevActions=a.currentActions,a.prevUrl=a.currentUrl,a.currentPath=b,a.currentUrl=window.location.href,e=a.getState(),(!e.currentPos||f.length<=e.currentPos)&&(e.currentPos=f.length,a.replaceState(e,"",a.currentUrl)),a.prevPos=a.currentPos,a.currentPos=e.currentPos||0,j.getMain(b,function(){j.getActions(b,function(b){var d;a.currentActions=b,d=j.getDifferent(a.prevActions,a.currentActions),d.newActions=0==d.newActions.length?a.currentActions:d.newActions,j.exit(d.oldActions),a.context=c.getContext(),j.enter(d.newActions),a.crossAppLink=!1})})},isCurrentPath:function(b){var c=a.currentActionPath;return c+="",0==b.indexOf("#")?b==c.split("#")[1]:b==c},getPathType:function(){var a="";switch(!0){case!!f.isDmallApp():a=b.DMALL_KAY;break;default:a=b.WEB_KEY}return a},resolvePath:function(a){var b={};return"object"==typeof a?(b.web=c.fixPath(a.web)||"",b.dmalllink=c.fixPath(a.dmalllink)||"",b):(b.web=c.fixPath(a),b.dmalllink=b.web,b)},fixPath:function(a){return"string"==typeof a&&"#"==a.charAt(0)&&(a=window.location.href.split("#")[0]+a),a},getContext:function(){var a,b;return f.has("galleon.Navigator.getContext")?(a=galleon.Navigator.getContext()||"{}",b=a.indexOf("{"),a=a.substring(b,a.length)):a=i.get("kayak.context"),"string"==typeof a?c.parseJSON(a):a},parseJSON:function(a){try{return JSON.parse(a)}catch(b){return{}}},setContext:function(a){return a&&$.isPlainObject(a)||(a={}),f.has("galleon.Navigator.getContext")?void galleon.Navigator.setContext(a):void i.set("kayak.context",a)}},define("kayak/core/router/router",function(require,b,l){e=require("kayak/core/kayak"),g=require("kayak/core/link/link"),f=require("kayak/core/utils"),d=require("kayak/core/events"),j=require("kayak/core/router/action.mod"),h=require("kayak/core/router/deckinterface"),i=require("kayak/core/localdata"),k=require,c.init.apply(a),l.exports=a})}(),function(){var a,b,c,d=kayak.POOL,e={};c={POOL_ID:"kayak-pool"},a={get:function(c,f){if(c&&""!=$.trim(c)){if(c=b.formatClass(c),e[c])return e[c];var g=d.children(c);return!g[0]&&f&&f[0]&&(g=g[0]?g:f.children(c)),e[c]=a.decorate(g,{jCont:f}),e[c]}},decorate:function(a,c){return a.kInsert=b.show,a.kRemove=b.hide,a.kData=$.extend({},c),a}},b={show:function(a){var b=this.kData;a=a||b.jCont,a&&a[0]&&this.appendTo(a)},hide:function(){this.appendTo(d)},formatClass:function(a){return"."==a.charAt(0)?a:"."+a}},define("kayak/core/dom",function(require,b,c){c.exports=a})}(),function(){var a,b,c,d,e,f,g,h=["init","beforeInit","beforeModuleRender","loadComplete","allRenderFinish"];e={projectName:"",moduleDir:"",moduleCommonDir:"",preLoad:{js:[],css:[],tpl:[]},moduleSource:{},moduleList:{}},d=function(a,c){var d=this;g.checkConfig.apply(this,[c]),d.jContainer=a||kayak.jBody,c.preLoad=$.extend({},e.preLoad,c.preLoad),d.config=$.extend({},e,c),d.classes={},d.events=new b(h)},d.prototype={config:function(a){a=a||{},this.config=$.extend(this.config,a)},render:function(a){var b,c=this;g.analyseSource.apply(c),b=g.mergeSource.apply(c),f.async(b,function(){c.events.fire("loadComplete"),g.renderQueue.apply(c,[0,a])})},destroy:function(){var a,b,c=this.config.moduleList||[];for(a=0;b=c[a];++a)b.instance&&b.instance.jView&&(b.instance.jView.remove(),b.instance=null,b.inted=!1)},reload:function(){},refresh:function(a,b){var c=this,d=a.module;g.renderModlueInstance.apply(c,[d]),"function"==typeof b&&b()},on:function(a,b){this.events.on(a,b)},exchange:function(a,b,c){var d=this.config.moduleList[a],e=this.config.moduleList[b];if(d&&e){var f=d.instance.jView,g=e.instance.jView,h=g.clone(!0),i=f.clone(!0);f.replaceWith(h),g.replaceWith(i),d.instance.jView=i,e.instance.jView=h;var j=$.extend(!0,{},d);this.config.moduleList[a]=e,this.config.moduleList[b]=j}"function"==typeof c&&c()},remove:function(a,b){var c=this;c.events.fire("beforeRemove");var d=a.instance.jView;d.remove();var e=c.config.moduleList.indexOf(a);c.config.moduleList.splice(e,1),"function"==typeof b&&b()},update:function(a,b){var c=this,d=c.config.moduleDir,e=g.getResourcePath(d,a),h=[].concat(e.js).concat(e.css).concat(e.tpl);c.config.moduleList;f.async(h,function(){c.events.fire("beforeUpdate"),g.getModuleInstance({projectName:c.config.projectName,moduleDir:d,tplName:a.tplName,moduleName:a.moduleName,modulePath:e.js,module:a,callback:function(d){d||b();var e=d.moduleCls,f=d.moduleDom,h=a.instance.jView;h.replaceWith(f),classes=c.classes,classes[a.tplName]=classes[a.tplName]||e;var i=new classes[a.tplName](f,a);a.instance=i,g.renderModlueInstance.apply(c,[a]),"function"==typeof b&&b()}})})},add:function(a,b){var c=a.module;c.instanceId=c.instanceId||(new Date).getTime();var d=a.index,e=a.addDom,b=a.callback,h=this,i=h.config.moduleDir,j=g.getResourcePath(i,c),k=[].concat(j.js).concat(j.css).concat(j.tpl);h.config.moduleList;f.async(k,function(){h.events.fire("beforeAdd"),g.getModuleInstance({projectName:h.config.projectName,moduleDir:i,tplName:c.tplName,moduleName:c.moduleName,modulePath:j.js,module:c,callback:function(a){a||b();var f=a.moduleCls,i=a.moduleDom;"function"==typeof e?e(i):h.jContainer.append(i),classes=h.classes,classes[c.tplName]=classes[c.tplName]||f;var j=new classes[c.tplName](i,c);c.instance=j,d="number"==typeof d&&d>=0?d:h.config.moduleList.length-1,h.config.moduleList.splice(d+1,0,c),g.renderModlueInstance.apply(h,[h.config.moduleList[d+1]]),"function"==typeof b&&b()}})})}},g={checkConfig:function(a){return!!a.projectName},getResourcePath:function(a,b){var c=b.moduleName,d=b.tplName,e=a+c+"/"+d+"/"+d;return{js:[e],css:[e+".css"],tpl:[e+".tpl"]}},getModuleInstance:function(b){var d=b.projectName,e=(b.moduleDir,b.tplName),f=(b.moduleName,b.modulePath),g=b.callback,h=b.module;seajs.use(f,function(b){var f=a.extend(b);domClone=kayak.dom.get(d+"."+e).clone(),domClone.attr(c.INSTANCEID_ATTR,h.instanceId),domClone.attr(c.TEMPLATENAME_ATTR,h.tplName),domClone.attr(c.MODULENAME_ATTR,h.moduleName),"function"==typeof g&&g({moduleCls:f,moduleDom:domClone})})},analyseSource:function(){var a,b,c,d=this,e=d.config,f=e.moduleList,g=e.moduleSource,h=e.moduleDir;for(g.js=g.js||[],g.css=g.css||[],g.tpl=g.tpl||[],a=0;b=f[a];++a)b&&b.moduleName&&b.tplName&&(c=h+b.moduleName+"/"+b.tplName+"/"+b.tplName,g.js.indexOf(c)==-1&&(e.moduleCommonDir&&(mCommon=h+b.moduleName+"/"+e.moduleCommonDir+"/"+e.moduleCommonDir,g.js.push(mCommon),g.css.push(mCommon+".css"),g.tpl.push(mCommon+".tpl")),g.js.push(c),g.css.push(c+".css"),g.tpl.push(c+".tpl")))},mergeSource:function(){var a=this,b=a.config,c=b.preLoad,d=b.moduleSource,e=[];return e=e.concat(c.js).concat(c.css).concat(c.tpl),e=e.concat(d.js).concat(d.css).concat(d.tpl)},renderQueue:function(b,d){b=b||0;var e,f,h,i=this,j=i.config,k=i.classes,l=j.moduleList,m=i.jContainer;return b==l.length?(i.events.fire("allRenderFinish"),void("function"==typeof d&&d())):(f=l[b],f.instanceId=f.instanceId||(new Date).getTime(),e=j.moduleDir+f.moduleName+"/"+f.tplName+"/"+f.tplName,void seajs.use(e,function(e){k[f.tplName]=k[f.tplName]||a.extend(e),h=kayak.dom.get(j.projectName+"."+f.tplName,m).clone(),h.attr(c.INSTANCEID_ATTR,f.instanceId),h.attr(c.TEMPLATENAME_ATTR,f.tplName),h.attr(c.MODULENAME_ATTR,f.moduleName),m.append(h),l[b].instance=new k[f.tplName](h,f),l[b].instance.kLoader=i,g.renderModlueInstance.apply(i,[l[b]]),setTimeout(function(){g.renderQueue.apply(i,[++b,d])},1)}))},renderModlueInstance:function(a){var b=this.events;b.fire("beforeModuleRender",a),a.instance.render()}},define("kayak/core/moduleloader/moduleloader",function(require,e,g){a=require("kayak/core/classes/module.class"),b=require("kayak/core/events"),c=require("kayak/core/config"),f=require,g.exports=function(a,b){return new d(a,b)}})}(),function(){var a,b,c;a={init:function(){b.init(),b.on("click",function(a){c[a.method]&&c[a.method](a.link)})}},define("kayak/core/kayak",function(require,d,e){var f=require("kayak/core/router/deckinterface");b=require("kayak/core/link/link"),c=require("kayak/core/router/router"),window.kayak=window.kayak||{},window.kayak=$.extend(window.kayak,{dom:require("kayak/core/dom"),router:c,moduleLoader:require("kayak/core/moduleloader/moduleloader"),storage:f.Storage,jBody:$(document.body),jWindow:$(window)}),a.init(),window.galleon=window.galleon||{},window.galleon.kayak=kayak,e.exports=window.kayak})}();