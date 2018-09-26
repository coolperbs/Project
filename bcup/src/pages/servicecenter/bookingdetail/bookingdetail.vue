<template>
  <div class="booking-detail">
    <div class="nav">
      <router-link :to="{path:'/home'}" class="my-booking">我的预约</router-link>
      <router-link :to="{path:'/servicecenter'}" class="my-booking">服务中心</router-link>
    </div>
    <div class="item-title">
      【预约】{{detailData.title}}
    </div>
    <div class="item-address">
      消费地址:{{detailData.storeVO?detailData.storeVO.address:''}}{{detailData.storeVO?detailData.storeVO.telphone?'联系电话:'+detailData.storeVO.telphone:'':''}}
    </div>
    <div class="item-content">
      <div class="item-time"></div>
      <div class="item-text">
        店名:{{detailData.storeVO?detailData.storeVO.name:''}}<br>
        {{detailData.introduce}}
      </div>
    </div>
    <div class="booking-date-table" id="dateTable">
      <div class="date-title"></div>
      <div class="date-box">
        <div class="booking-date" :class="{active:el.checked}" v-for="el,index in detailData.stockDateList" :key="index" @click="bookingEVT(el)">
          <div class="time">{{formatDate(el.preDate)}}({{el.week}})</div>
          <div class="last more" v-if="el.stock>10">多于10</div>
          <div class="last" v-if="el.stock<=10&&el.stock!=0">{{'剩余'+el.stock}}</div>
        </div>
      </div>
    </div>

    <div v-if="showModal" @click.self="hideModal" class="booking-modal">
      <div class="modal-content">
        <div class="modal-head"></div>
        <div class="modal-body">
          <div class="booking-time">消费日期：</div>
          <table class="booking-table">
            <thead>
            <tr>
              <th>规格</th>
              <th>可约数量</th>
              <th>加收</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="el,index in modalData" :key="index">
              <td>{{el.features}}</td>
              <td style="white-space: nowrap;word-break: keep-all">{{el.stock}}</td>
              <td style="white-space: nowrap;word-break: keep-all">{{fixPrice(el.price)}}元</td>
              <td>
                <router-link :to="{path : '/servicecenter/bookingcheckout', query : { id : wareId+'-'+bespeakId}} " v-if="el.stock>0" class="btn booking ">预约</router-link>
                <div v-if="el.stock==0" class="btn booking disabled">预约</div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-foot"></div>
      </div>
    </div>
    <div class="back-top" @click="getTop">{{scrolled?'回顶部':'预约日历'}}</div>
  </div>
</template>

<script>
  import bookingDetailService from '@/services/bookingdetail/bookingdetail'
  import utils from '@/common/utils/utils'

  export default {
    name: "bookingdetail",
    data () {
      return {
        showModal: false,
        detailData: {},
        modalData: [],
        scrolled: false,
        wareId: ''
      }
    },
    mounted () {
      this.getBookingDetail()
    },
    methods: {
      hideModal () {
        this.showModal = !this.showModal;
        if (!this.showModal) {
          this.detailData.stockDateList.map((e) => {
            e.checked = false;
          })
        }
      },
      getBookingDetail () {
        let query = this.$route.query;
        let wareId = query.id;
        this.wareId = query.id;
        if (!wareId) {
          utils.showError('缺少wareId');
          return
        }
        bookingDetailService.getBookingDetail(wareId, (res) => {
          this.detailData = res.data;
        })
      },

      formatDate (dateTime) {
        return utils.formatDateTime(dateTime, 'md')
      },
      bookingEVT (el, index) {
        if (el.stock == 0) {
          return
        }
        el.checked = true;
        this.bespeakId = el.id;
        bookingDetailService.getDateTable({wareId: el.wareId, bespeakId: el.id}, (res) => {
          this.modalData = res.data;
          this.$nextTick(() => {
            this.hideModal();
          })

        })
      },
      getTop () {
        if (this.scrolled) {
          window.scrollTo(0, 0);
          this.scrolled = false;
          return
        }
        let object = document.getElementById('dateTable')
        let ro = object.getBoundingClientRect();
        let Top = ro.top;
        let Bottom = ro.bottom;
        let Left = ro.left;
        let Right = ro.right;
        let Width = ro.width || Right - Left;
        let Height = ro.height || Bottom - Top;
        //有了这个方法，获取页面元素的位置就简单多了:

        let X = Left + document.documentElement.scrollLeft;
        let Y = Top + document.documentElement.scrollTop;
        window.scrollTo(0, Y);
        this.scrolled = true;
      },
      fixPrice (price) {
        return utils.fixPrice(price)
      }
    }
  }
</script>

<style scoped>
  .booking-detail {
    padding: 10px;
  }

  .nav {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
  }

  .my-booking {
    color: #1178bf;
  }

  .item-title {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .item-address {
    font-size: 13px;
    color: #808080;
  }

  .item-content {
    border-radius: 4px;
    border: 1px solid #bebebe;
    padding: 10px;
    background: #eee;
    margin-bottom: 10px;
  }

  .item-time, .item-text {
    color: #666;
    font-size: 13px;
  }

  .date-title {
    padding: 5px;
    border-bottom: 1px solid #eee;
  }

  .date-box {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
  }

  .booking-date {
    border: 1px solid #ffe8ea;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    margin-right: 4px;
  }

  .booking-date.active {
    border: 1px solid #54a849;
  }

  .time, .last {
    font-size: 12px;
  }

  .last {
    color: #ee8e34;
  }

  .last.more {
    color: #54a849;
  }

  .time {
    color: #000;
    background: #ffe8ea;
    padding: 2px;
  }

  .booking-date-table {
    border-radius: 4px;
    border: 1px solid #eee;
    padding: 10px;
    background: #fff;
    margin-bottom: 100px;
  }

  .booking-modal {
    position: fixed;
    z-index: 10;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .6);
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .modal-body {
    max-height: 500px;
    overflow: auto;
  }

  .modal-content {
    background: #fff;
    width: 100%;
    margin: 10px;
    margin-top: 60px;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 17px 0 rgba(0, 0, 0, 0.6);
  }

  .booking-time {
    margin-bottom: 10px;
  }

  .booking-table {
    width: 100%;
    border: 1px solid #eee;
  }

  .booking-table thead tr th {
    word-break: keep-all;
    white-space: nowrap;
  }

  .booking-table thead tr th, .booking-table tbody tr td {
    text-align: left;
    font-size: 13px;
    font-weight: normal;
    color: #000;
    border-bottom: 1px solid #eee;
    padding: 10px 5px;
  }

  .btn.booking {
    padding: 10px;
    background: #3aa83b;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    word-break: keep-all;
    white-space: nowrap;
  }

  .btn.booking.disabled {
    opacity: .4;
  }

  .back-top {
    position: fixed;
    z-index: 2;
    width: 60px;
    height: 60px;
    bottom: 50px;
    right: 10px;
    font-size: 12px;
    border: 1px solid #ee8e34;
    color: #fff;
    background: rgba(238, 142, 52, 0.55);
    border-radius: 50%;
    line-height: 60px;
    display: flex;
    align-items: center;
    padding: 5px;
    text-align: center;
  }
</style>
