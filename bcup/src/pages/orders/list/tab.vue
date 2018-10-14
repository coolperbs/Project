<template>
  <div class="orderlist-tab">
    <ul class="list">
      <li v-for="item in tab.list" :key="item.value">
        <span class="text" :class="{current : item.value == tab.current }" @click="changeTab( item )">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>


<style scoped>
  .orderlist-tab {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-shadow: 0 5px 5px rgba(100, 100, 100, 0.1);
    z-index: 100;
  }

  .list li {
    display: inline-block;
    height: 50px;
    width: 25%;
    background-color: #fff;
    text-align: center;
  }

  .list li .text {
    display: inline-block;
    height: 100%;
    line-height: 50px;
    font-size : 12px;
    padding: 0 5px;
  }

  .list li .text.current {
    color : #ff6e1d;
    border-bottom: solid 2px #ff6e1d;
    font-weight : bold;
    font-size : 16px;
  }
</style>

<script>
  export default {
    props: ['value'],
    computed: {
      tab: function () {
        return this.value;
      }
    },
    data: function () {
      return {}
    },
    methods: {
      changeTab: function (tab) {
        if (tab.value == this.value) {
          return
        }
        this.$emit('changeTab', tab);
      }
    }
  }
</script>
