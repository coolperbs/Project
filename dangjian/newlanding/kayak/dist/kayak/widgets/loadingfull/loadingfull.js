!function(){var a,b,c,d,e,f;e={SHOWTIME:2e3,HIDETIME:800,TIMESTEP:1500,SHOW_CLS:"show"},c={className:"kayak-widgets-loadingfull-loadingfull",initView:!1,jView:null,jBox:null,timmer:null,startTime:null,show:function(a){a=a||0,d.initView(),c.jView.kInsert();var b=c.jView,g=c.jBox||b.find(".vertical-box");return c.jView=b,c.jBox=g,f.isDmallApp()?c.jView.find(".vertical-box").addClass("app-loader"):c.jView.find(".vertical-box").removeClass("app-loader"),a>0?void(c.timmer=setTimeout(function(){c.startTime=(new Date).getTime(),b.addClass(e.SHOW_CLS)},a)):(c.startTime=(new Date).getTime(),void b.addClass(e.SHOW_CLS))},hide:function(){var a,b=c.jView,f=c.jBox||b&&b.find(".vertical-box")||null;c.timmer&&clearTimeout(c.timmer),a=0,setTimeout(function(){b&&f?(b.removeClass(e.SHOW_CLS),setTimeout(function(){d.exit()},e.HIDETIME)):d.exit()},a)}},d={initView:function(){c.initView||(c.jView=b.get(c.className,a.jBody),c.initView=!0)},exit:function(){var a=c.jView;a&&a.kRemove()}},define("kayak/widgets/loadingfull/loadingfull",function(require,d,e){require("kayak/widgets/loadingfull/loadingfull.tpl"),require("kayak/widgets/loadingfull/loadingfull.css"),f=require("kayak/common/ua/ua"),a=require("kayak/core/kayak"),b=a.dom,e.exports=c})}();