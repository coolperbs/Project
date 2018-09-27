<template>
  <div class="spec">
    <div class="title ellipsis-1">【规格选择】</div>
    <div class="sub-title">{{pageInfo.title}}{{pageInfo.subTitle}}</div>
    <div class="sub-title">{{pageInfo.saleProSku.pros[0].proName}}:</div>
    <div class="list clearfix">
      <span class="cell" :class="{checked:el.valueId==checkedA}" v-for="el,index in pageInfo.saleProSku.pros[0].values" @click="checkItem(el.valueId)">{{el.valueName}}</span>
    </div>
    <div class="sub-title">{{pageInfo.saleProSku.pros[1].proName}}:</div>
    <div class="list clearfix">
      <span class="cell" :class="{checked:el.valueId==checkedB}" v-for="el,index in pageInfo.saleProSku.pros[1].values" @click="checkpos(el.valueId)">{{el.valueName}}</span>
    </div>
    <div class="more">
      备注:
    </div>
  </div>
</template>


<style scoped>
  .spec {
    background-color: #fff;
    padding: 10px 10px 0 10px;
  }

  .sub-title {
    margin-top: 5px;
  }

  .list {
    margin-top: 5px;
  }

  .list .cell {
    background-color: #ccc;
    color: #fff;
    padding: 3px 5px;
    display: inline-block;
    margin: 2px 0;
    border-radius: 5px;
    float: left;
    margin-left: 10px;
  }

  .list .cell.checked {
    background-color: #ee8e34;
  }

  .list .cell:first-child {
    margin-left: 0;
  }

  .more {
    border-top: dashed 1px #f0f0f0;
    margin-top: 10px;
    padding: 10px 0;
  }
</style>

<script>
  export default {
    props: {
      pageInfo: {}
    },
    data () {
      return {
        checkedA: '',
        checkedB: ''
      }
    },
    mounted () {
      this.checkedA = this.pageInfo.attributes.split('^')[0].split(':')[1]
      this.checkedB = this.pageInfo.attributes.split('^')[1].split(':')[1]
    },
    methods: {
      checkItem (id) {
        this.checkedA = id;
      },
      checkpos (id) {
        this.checkedB = id;
      },
      emitEVT () {
        this.$nextTick(() => {
          let key = this.pageInfo.saleProSku.pros[0].proId + ':' + this.checkedA + '^' + this.pageInfo.saleProSku.pros[1].proId + ':' + this.checkedB;
          let result = this.pageInfo.saleProSku.prosku[key];
          if (result) {
            this.$emit('changeSkuId', result)
          }
        })
      }
    },
    watch: {
      checkedA (val) {
        this.emitEVT()
      },
      checkedB (val) {
        this.emitEVT()
      }
    }
  }
</script>
