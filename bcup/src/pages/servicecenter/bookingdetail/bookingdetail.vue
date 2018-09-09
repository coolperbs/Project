<template>
  <div class="booking-detail">
    <div class="nav">
      <router-link :to="{path:'/home'}" class="my-booking">我的预约</router-link>
      <router-link :to="{path:'/servicecenter'}" class="my-booking">服务中心</router-link>
    </div>
    <div class="item-title">
      【预约】
    </div>
    <div class="item-address">
      消费地址:
    </div>
    <div class="item-content">
      <div class="item-time"></div>
      <div class="item-text"></div>
    </div>
    <div class="booking-date-table">
      <div class="date-title"></div>
      <div class="date-box">
        <div class="booking-date">
          <div class="time">09-15(周一)</div>
          <div class="last">剩400</div>
        </div>
        <div class="booking-date">
          <div class="time">09-15(周一)</div>
          <div class="last">剩400</div>
        </div>
        <div class="booking-date">
          <div class="time">09-15(周一)</div>
          <div class="last">剩400</div>
        </div>
        <div class="booking-date">
          <div class="time">09-15(周一)</div>
          <div class="last">剩400</div>
        </div>
        <div class="booking-date">
          <div class="time">09-15(周一)</div>
          <div class="last">剩400</div>
        </div>
        <div class="booking-date">
          <div class="time">09-15(周一)</div>
          <div class="last">剩400</div>
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
            <tr>
              <td>休息休息洗</td>
              <td>满</td>
              <td>0元</td>
              <td>
                <div class="btn booking ">预约</div>
              </td>
            </tr>
            <tr>
              <td>休息休息洗</td>
              <td>满</td>
              <td>0元</td>
              <td>
                <div class="btn booking disabled">预约</div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-foot"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "bookingdetail",
    data () {
      return {
        showModal:true
      }
    },
    methods: {
      hideModal () {
        this.showModal = false
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
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    margin-right: 10px;
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

  .time {
    color: #000;
    background: #ffe8ea;
    padding: 2px 5px;
  }

  .booking-date-table {
    border-radius: 4px;
    border: 1px solid #eee;
    padding: 10px;
    background: #fff;
    margin-bottom: 10px;
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
  .modal-body{
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

  .booking-table thead tr th, .booking-table tbody tr td {
    text-align: left;
    font-size: 13px;
    font-weight: normal;
    color: #000;
    border-bottom: 1px solid #eee;
    padding: 10px 5px;
  }
  .btn.booking{
    padding: 10px;
    background: #3aa83b;
    border-radius: 4px;
    color: #fff;
    text-align: center;
  }
  .btn.booking.disabled{
    opacity: .4;
  }
</style>
