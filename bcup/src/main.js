// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import '@/assets/reset.css'
import 'swiper/dist/css/swiper.css'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import routerLink from './router'

Vue.config.productionTip = false

Vue.use(routerLink);
Vue.use(VueAwesomeSwiper);
Vue.use(swiper);
Vue.use(swiperSlide);

/*function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + ';domain=.ypzmkj.com;path=/';
}*/

//setCookie( 'ticketWeChat', '77321572C240F84D2BD7E5239462683435D3421A4B22812DE3A70D03668C05A4F4FD7A4CBEA6C6989A3E38B027130751DEBE5623FFBC6CC6D13509BB336A1EEBAB2E7A88C6786E36B608BB04B41B64A25AA7293A8DD198DFF653067C76A19986581E6ECE0B77BAA1F60DB2DC0414C63A37F202137E4D84D3CCE84FAC4CBCE245' );
//setCookie( 'ticketWeChat', '' );

function getCookie (name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
}

if (!getCookie('ticketWeChat') ) {
  window.location.replace('http://gw.ypzmkj.com/login?callbackUrl=' + encodeURIComponent( window.location.href) );
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
