!function(){var a,b,c,d,e;d={SHOWTIME:2e3},c={className:"kayak-widgets-tips-tips",jView:null,initView:!1,timmer:null,show:function(a,b){e.initView(),c.jView.kInsert();var f=c.jView,b=b||d.SHOWTIME;clearTimeout(c.timmer),f.show().animate({opacity:1},400).find("span").html(a),c.timmer=setTimeout(function(){c.hide()},b)},hide:function(){var a=c.jView;a&&a.animate({opacity:0},{duration:400,complete:function(){e.exit()}})}},e={initView:function(){c.initView||(c.jView=b.get(c.className,a.jBody),c.initView=!0)},exit:function(){var a=c.jView;a.hide(),a.kRemove()}},define("kayak/widgets/tips/tips",function(require,d,e){require("kayak/widgets/tips/tips.tpl"),require("kayak/widgets/tips/tips.css"),a=require("kayak/core/kayak"),b=a.dom,e.exports=c})}();