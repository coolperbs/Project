!function(a){function b(b,c){this.ver="1.0",this.$element=a(b),this.options=a.extend({},a.fn.drag.defaults,c),this.init()}var c=a.fn.drag;b.prototype={constructor:b,init:function(){var b=this.options;this.$element.on("touchstart.drag.founder mousedown.drag.founder",function(c){var d="touchstart"==c.type?c.originalEvent.touches[0]:c,e=a(this).position(),f=d.pageX-e.left,g=d.pageY-e.top,h=this;a(this).data("startPos",e),b.before&&a.isFunction(b.before)&&b.before.call(h,d),a(document).on("touchmove.drag.founder mousemove.drag.founder",function(c){var d="touchmove"==c.type?c.originalEvent.touches[0]:c,e=a(h),i=e.offsetParent(),i=i.is(":root")?a(window):i,j=i.offset(),j=j?j:{left:0,top:0},k=d.pageX-f-j.left,l=d.pageY-g-j.top,m=i.width()-e.outerWidth(!0),n=i.height()-e.outerHeight(!0);k=k<0?0:k>m?m:k,l=l<0?0:l>n?n:l,a(h).css({left:k+"px",top:l+"px"}),b.process&&a.isFunction(b.process)&&b.process.call(h,d),c.preventDefault()}),a(document).on("touchend.drag.founder mouseup.drag.founder",function(c){var d="touchend"==c.type?c.originalEvent.changedTouches[0]:c;b.end&&a.isFunction(b.end)&&b.end.call(h,d),a(document).off(".drag.founder")})})}},a.fn.drag=function(c){return this.each(function(){var d=a(this),e=d.data("drag");e?e.init():(e=new b(this,c),d.data("drag",e))})},a.fn.drag.defaults={before:a.noop,process:a.noop,end:a.noop},a.fn.drag.noConflict=function(){return a.fn.drag=c,this}}(jQuery);