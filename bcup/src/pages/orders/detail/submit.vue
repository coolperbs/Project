<template>
  <div class="checkout-submit">
    <div class="btn pay" @click="submit">申请返佣</div>
  </div>
</template>


<style scoped>
  .checkout-submit {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px;
  }

  .btn {
    height: 44px;
    background-color: #fff;
    border-radius: 22px;
    text-align: center;
    line-height: 44px;
    font-size: 20px;
    color: #fff;
  }
   .btn.pay{
    border:1px solid #ee8e34;
    color: #ee8e34;
  }
</style>

<script>

  export default {
    props: {
      data: {}
    },
    methods: {
      submit: function () {
        //todo 申请返佣
      }
    }
  }
</script>
