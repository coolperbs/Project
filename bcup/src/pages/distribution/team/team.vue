<template>
  <div class="team">
    <saledata :data="pageInfo" class="mod"/>
    <entrys :data="pageInfo" class="mod"/>
    <div class="invite" @click="inviteEVT(true)" v-if="shareImgUrl">邀请</div>
    <div class="sharePop" v-if="showPop">
      <div class="pop">
        <div class="close" @click="inviteEVT(false)"></div>
        <img :src="shareImgUrl"/>
      </div>
    </div>
  </div>
</template>


<style scoped>
  .team {
    padding-bottom: 20px;
  }

  .mod {
    box-shadow: 0 3px 5px rgba(100, 100, 100, 0.1);
    margin-bottom: 20px;
  }

  .invite {
    background-color: #eee;
    margin: 0 10px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    border-radius: 22px;
  }

  .sharePop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 10000;
  }

  .sharePop {
    text-align: center;
  }

  .pop {
    margin: 0 auto;
    width: 80%;
    margin-top: 20%;
    position: relative;
  }

  .pop .close {
    width: 40px;
    height: 40px;
    background-color: #fff;
    border-radius: 50%;
    top: -20px;
    right: -20px;
    position: absolute;
  }

  .pop img {
    width: 100%;
    background-color: #fff;
  }
</style>

<script>
  import saledata from './data'
  import entrys from './entrys'
  import teamServer from '@/services/team/team'
  import distributionS from '@/services/distribution/distribution'
  import utils from '@/common/utils/utils'

  export default {
    components: {
      saledata, entrys
    },
    data: function () {
      return {
        pageInfo: {},
        showPop: false,
        shareImgUrl: false,
        userData: {}
      }
    },
    mounted () {
      this.getData();
      this.getUser();
    },
    methods: {
      getData () {
        teamServer.getTeam((baseInfo) => {
          let temp = baseInfo.data;
          let dataArr = []
          for (let i = 1; i < 13; i++) {
            let key = 'traderBack' + i;
            let key2 = 'traderSale' + i;
            dataArr.push({
              traderBack: temp[key],
              traderSale: temp[key2]
            })
          }
          temp.dataArr = dataArr;
          this.pageInfo = temp;
        });
      },
      inviteEVT (type) {
        this.showPop = type;
        if (type) {
          this.shareImgUrl = this.userData.qrcurl
        }
      },
      getUser () {
        distributionS.getUserInfo((res) => {
          this.userData = res.data
        })
      }
    }
  }
</script>
