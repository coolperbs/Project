<template>
  <div class="booking-box">
    <div class="booking-search">
      <div class="search-hide" v-if="!active" @click="changeActive">
        <div class="search-icon"></div>
        搜索
      </div>
      <div class="search-show" v-if="active">
        <div class="search-icon"></div>
        <input type="text" class="search-input" id="search" placeholder="搜索" @blur="changeActive" v-model="filterKey">
        <div class="search-clear" @click="cleanFilter"></div>
      </div>
    </div>
    <div class="booking-list">
      <router-link :to="{path:'/servicecenter/bookingdetail' ,query : { id : el.wareId}}" class="list-item" v-for="el,index in filterSearch(bookingList)" :key="index">
        <div class="item-title">【预约】{{el.title}}({{fixPrice(el.price)}}抢购)</div>
       <!--<router-link :to="{path:'/servicecenter/bookingdetail' ,query : { id : el.wareId}}" class="item-booking">点击预约 ></router-link>-->
      </router-link>
      <div class="empty-list" v-if="filterSearch(bookingList).length==0">
        暂无结果
      </div>
    </div>
    <router-link :to="{path : '/servicecenter/findecode'}" class="booking-find-code">自助查码</router-link>
  </div>
</template>

<script>
  import bookingUserService from '@/services/bookinguse/bookinguse'
  import utils from '@/common/utils/utils'

  export default {
    name: "bookinguse",
    data () {
      return {
        bookingList: [],
        filterKey: '',
        active: false
      }
    },
    mounted () {
      this.getBookingList();
    },
    methods: {
      filterSearch (list) {
        if (this.filterKey == '') {
          return this.bookingList
        }
        let temp = [];
        for (let i = 0; i < this.bookingList.length; i++) {
          let a = this.bookingList[i];
          if (a.title.indexOf(this.filterKey) > -1) {
            temp.push(a)
          }
        }
        return temp

      },
      getBookingList () {
        bookingUserService.getBookingList((res) => {
          this.bookingList = res.data;
        })
      },
      changeActive () {
        this.active = !this.active;
        this.$nextTick(() => {
          if (this.active) {
            var idObj = document.getElementById('search');
            idObj.focus();
          }
        })
      },
      cleanFilter () {
        this.filterKey = '';
        this.active = true
      },
      fixPrice(price){
        return utils.fixPrice(price)
      }
    }
  }
</script>

<style scoped>
  .booking-box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
  }

  .booking-search {
    height: 50px;
    background: #f0f0f0;
    border-bottom: 1px solid #e9e9e9;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 5px;
  }

  .search-hide {
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    background: #fff;
    display: flex;
    width: 100%;
    height: 30px;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
    font-size: 14px;
    color: #ddd;
  }

  .search-show {
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    background: #fff;
    display: flex;
    width: 100%;
    height: 30px;
    align-items: center;
    padding: 0 5px;
  }

  .search-icon {
    width: 15px;
    height: 15px;
    background: url("./search.png");
    background-repeat: no-repeat;
    background-size: cover;
  }

  .search-clear {
    width: 15px;
    height: 15px;
    background: url("./close.png");
    background-repeat: no-repeat;
    background-size: cover;
    margin-left: 20px;
  }

  .search-input {
    height: 100%;
    width: 100%;
    border: none;
    padding: 0 5px;
  }

  .booking-list {
    position: absolute;
    top: 50px;
    bottom: 50px;
    overflow-y: scroll;
    left: 0;
    right: 0;
  }

  .list-item {
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    padding: 15px 5px;
    font-size : 16px;
  }

  .empty-list {
    text-align: center;
    margin-top: 20px;
    width: 100%;
  }

  .item-title {
    font-size: 13px;
    color: #000;
  }

  .item-booking {
    word-break: keep-all;
    white-space: nowrap;
    color: #bfbfbf;
    margin-left: 10px;
  }

  .booking-find-code {
    background: #ee8e34;
    color: #fff;
    font-size: 14px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }

</style>
