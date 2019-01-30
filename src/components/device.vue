<template>
  <div class="device">
    <div class="deviceTop">
      <input type="value" placeholder="搜索ICE_ID"  v-model.trim="search"/>
      <Icon style="position:absolute;right:9px;top:6px;font-size:26px;cursor: pointer" type="ios-search" />
    </div>
    <div class="deviceName">
      当前连接设备({{this.deviceNumber}})
    </div>
    <div class="deviceContent">
      <ul>
        <li v-for="item in filterData()" :key="item.id">
          <div class="deviceLeft">
            <img src="../assets/img/device.png" alt="">
          </div>
          <div class="deviceRight" >
            <p class="name">{{item.deviceId}}</p>
            <div style="float:left;width:20%">
              <p>采集IP: {{item.deviceAddress}}</p>
              <p>端口号: {{item.devicePort}}</p>
            </div>
            <div style="float:left;width:80%">
              <p>通讯协议: {{item.agreement}}</p>
              <p>设备类型: {{item.deviceType}}</p>
            </div>
          </div>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      device:[],
      dataData:[],
      deviceNumber:'0',
      search:''
    }
  },
    mounted(){
      this.getDevice()
  },
  methods:{
    getDevice(){
      this.$ajax.get('/find/findAllDevice')
      .then((response) => {
        if(response.data){
          this.dataData = response.data
          this.deviceNumber = response.data.length
        }else{
          this.deviceNumber = 0
        }
        

      })
    },
    //搜索功能
     filterData(){
            return this.dataData.filter(item => item.deviceId.indexOf(this.search) > -1)
          }
  },
   computed:{
         
        },
}
</script>

<style lang = "stylus" scoped >
@import url("../assets/base.css");
.device
  height 100%
  padding 2% 10% 0 10%
  .deviceTop
    width 27%
    height 2rem
    position relative
    input 
      width 100%
      border 1px solid #ddd
      height 35px
      line-height 35px
      border-radius 35px
      padding 0 10px
      
  .deviceName
    width: 12%;
    height: 1.5rem;
    font-size: 13px;
    color: #000;
    margin-top 2rem
    border-bottom: 3px solid #0abaee;
  .deviceContent
    border-top: 1px solid #eee;
    height: 85%
    overflow: auto
    ul
      height 100%
      li
        width 100%
        height 7rem
        border-bottom: 1px solid #eee;
        overflow hidden
        .deviceLeft
          width 10%
          height 100%
          line-height 7rem
          float left
          img 
            vertical-align middle
        .deviceRight
          width 90%
          height 100%
          float right 
          text-align left
          overflow hidden
          .name 
            font-size 14px
            margin-top 2%
            margin-bottom 1%
            font-weight bold
          div 
            font-size 14px
            color #999

    
</style>
<style lang = "stylus">
/* .ivu-input
  border-radius 32px !important
  border: 1px solid #0063ad
.ivu-input-icon
  color #0063ad
  font-size 20px */
</style>

