<template>
  <div class="status">
    <div class="statusTop">
      <div class="topLeft">
        <img src="../assets/img/status01.png" alt="">
      </div>
      <div class="topRight">
        <p class="deviceName">Intellegent Connection Equipment</p>
        <p class="deviceId">ICE_ID: {{this.ICE_ID}}</p>
      </div>
    </div>
    <div class="statusNext">
      <div class="iceStatus">
        ICE的状态
      </div>
      <div class="preIce">
        <ul class="table">
          <li class="tableLi">
            <ul>
              <li>固件版本:</li>
              <li>V1.0.0</li>
              <li>网络连接状态:</li>
              <li>{{this.netState}}</li>
            </ul>
          </li>
           <li class="tableLi">
            <ul>
              <li>有线IP地址:</li>
              <li>{{this.ethIp}}</li>
              <li>WIFI IP地址:</li>
              <li>{{this.wlanIp}}</li>
            </ul>
          </li>
          <!-- <li class="tableLi">
            <ul>
              <li>子网掩码:</li>
              <li>255.255.255.0</li>
              <li>IP地址:</li>
              <li>192.168.232.1</li>
            </ul>
          </li> -->
          <!-- <li class="tableLi">
            <ul>
              <li>网关:</li>
              <li>192.168.1.1</li>
              <li>DNS:</li>
              <li>192.168.1.1</li>
            </ul>
          </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      ICE_ID:'',
      ethIp:'',
      netState:'',
      wlanIp:''
    }
  },
  mounted(){
    this.getDeviceInfo()
  },
  methods:{
    getDeviceInfo(){
      this.$ajax.get('/find/findHomePage')
            .then((response) => {
              this.ICE_ID = response.data.ICE_ID;
              this.ethIp = response.data.ethIp;
              this.netState = response.data.netState;
              this.wlanIp = response.data.wlanIp;
            })
    }
  }
}
</script>

<style lang = "stylus" scoped>
@import url("../assets/base.css");
.status
  height 100%
  padding 0 10%
  .statusTop
    height 50%
    overflow hidden
    .topLeft
      width 40%
      height 100%
      float left
      img 
        margin-top 10%
    .topRight
      width 60%
      height 100%
      float right
      padding-top: 12%;
      text-align: left;
      .deviceName
        font-size 18px
        font-weight bold
      .deviceId
        font-size 16px
        color #888
        font-weight bold
        margin-top 10px
  .statusNext
    height 50%
    .iceStatus
      width 10%
      height 10%
      font-size 16px
      color #000
      border-bottom 3px solid #0abaee
    .preIce
      height 90%
      border-top 1px solid #ddd
      padding-left 15%
      padding-top 2%
      .table
        width 100%
        height 100%
        .tableLi
          width 100%
          height 13%
          padding-left 1%
          &:nth-of-type(odd)
            background #F5F5F5
          ul
            width 100%
            height 100%
            line-height 32px
            text-align left
            li
              width 18%
              height 100%
              float left
              font-size 14px
</style>
