!function(){var a,b;a={get:function(a){var c=new RegExp("(^|;|\\s+)"+a+"=([^;]*)(;|$)"),d=document.cookie.match(c);return b.isDmallApp()?d?decodeURI(d[2]):"":d?unescape(d[2]):""},add:function(a,c,d,e,f){var g=new Date,h=30;d=d||h,g.setDate(g.getDate()+d),e=e||"/",f=location.host.indexOf(".dmall.com")>0?"dmall.com":document.domain,b.isDmallApp()?document.cookie=encodeURI(a)+"="+encodeURI(c)+";expires="+g.toGMTString()+";path="+e+";domain="+f:document.cookie=escape(a)+"="+escape(c)+";expires="+g.toGMTString()+";path="+e+";domain="+f},del:function(a,b,c){var d=new Date,b=b||"/";c=location.host.indexOf(".dmall.com")>0?"dmall.com":c,d.setTime(d.getTime()-1e4),document.cookie=a+"=; expires="+d.toGMTString()+";path="+b+";domain="+c},writeByObject:function(b){if(b){var c,d;for(c in b)d=b[c]+"",c&&d&&a.add(c,b[c])}},deleteByList:function(b){if(b){var c,d;for(c=0;d=b[c];++c)a.del(d)}}},b={isDmallApp:function(){return window.navigator.userAgent.match(/dmall/i)}},define("kayak/common/cookie/cookie",function(require,b,c){c.exports=a})}();