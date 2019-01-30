<template>
  <div class="index" ref="maxBox">
    <div class="headTop">
      <div class="imgLogo">
        <div class="img">
          <img src="../assets/img/logo.png" alt="">
        </div>
        <div class="right">
          
          <div class="user">
            <Icon style="font-size:40px;color:#0063AD" type="md-contact" @click="changeUserInfoShow" />
          </div>
          <div class="reset ">
            <Button @click="showRetart = true" style="width:60px;color:#0063AD;border-color:#0063AD" type="info" shape="circle" ghost>重启</Button>
            <Modal
                v-model="showRetart"
                title="Title"
                :loading="loading"
                @on-ok="asyncOK">
                <p>是否重启</p>
            </Modal>
          </div>
        </div>
        
      </div>
    </div>
    <div class="content" :style="{'height':perforcontentHeight}">
      <div class="contentImg">
        <div id="userInfo" v-show="showBox">
              <button @click="logout">Logout</button>
        </div>
        <Row type="flex" justify="center" align="middle">
            <Col style="text-align: center;" span="3" order="1"><img @click="toStatus('1')"  src="../assets/img/status.png" alt="">
            <p style="font-size:14px;margin-top:10px">ICE的状态</p>
            </Col>
            <Col style="text-align: center;margin-bottom: 30px" span="4" order="2"><span class="circle"></span></Col>
            <Col style="text-align: center" span="3" order="3"><img  @click="toWeb('2')" src="../assets/img/web.png" alt="">
            <p style="font-size:14px;margin-top:10px">网络设置</p>
            </Col>
            <Col style="text-align: center;margin-bottom: 30px" span="4" order="4"><span class="circle"></span></Col>
            <Col style="text-align: center" span="3" order="5"><img @click="toManage('3')" src="../assets/img/manage.png" alt="">
            <p style="font-size:14px;margin-top:10px">ICE设置</p>
            </Col>
            <Col style="text-align: center;margin-bottom: 30px" span="4" order="6"><span class="circle"></span></Col>
            <Col style="text-align: center" span="3" order="7"><img @click="toDevice('4')" src="../assets/img/device.png" alt="">
            <p style="font-size:14px;margin-top:10px">设备列表</p>
            </Col>
        </Row>
      </div>
      <div class="modal" v-if="showModal">
        <div class="triangle_border_up">
        </div>
        <status></status>
      </div>
      <div class="modal1" v-if="showModal1">
        <div class="triangle_border_up1">
        </div>
        <web></web>
      </div>
      <div class="modal2" v-if="showModal2">
        <div class="triangle_border_up2">
        </div>
        <manage></manage>
      </div>
      <div class="modal3" v-if="showModal3">
        <div class="triangle_border_up3">
        </div>
        <device></device>
      </div>
    </div>
  </div>
</template>

<script>
import status from "./status"
import web from "./web"
import manage from "./manage"
import device from "./device"
export default {
  components:{status,web,manage,device},
  data(){
    return {
      showBox:false,
      perforcontentHeight: '',
      showModal:true,
      showModal1:false,
      showModal2:false,
      showModal3:false,
      num:'1',
      showRetart:false,
      loading:true
    }
  },
  mounted(){
    let h = this.$refs.maxBox.offsetHeight;
    // this.perforcontentHeight = (h - 60)+'px';
    // console.log(this.perforcontentHeight)
    this.num = sessionStorage.getNum
    if(this.num == '1'){
      this.showModal = true;
      this.showModal1 =  false
      this.showModal2 =  false
      this.showModal3 =  false
    }
    if(this.num == '2'){
      this.showModal = false;
      this.showModal1 =  true
      this.showModal2 =  false
      this.showModal3 =  false
    }
    if(this.num == '3'){
      this.showModal = false;
      this.showModal1 =  false
      this.showModal2 =  true
      this.showModal3 =  false
    }
    if(this.num == '4'){
      this.showModal = false;
      this.showModal1 =  false
      this.showModal2 =  false
      this.showModal3 =  true
    }
  },
  methods:{
    logout(){
      this.$router.push({ path: '/' });
      sessionStorage['getNum'] = 1;
    },
    changeUserInfoShow(){
      this.showBox = !this.showBox
    },
    //点击图片,进行组件跳转
    toStatus(value){
      sessionStorage['getNum'] = value;
      this.showModal = true;
      this.showModal1 =  false
      this.showModal2 =  false
      this.showModal3 =  false
    },
    toWeb(value){
      sessionStorage['getNum'] = value;
      this.num = sessionStorage['getNum'] 
      this.showModal = false;
      this.showModal1 =  true
      this.showModal2 =  false
      this.showModal3 =  false
      
    },
    toManage(value){
      sessionStorage['getNum'] = value;
      this.num = sessionStorage['getNum'] 
      this.showModal = false;
      this.showModal1 =  false
      this.showModal2 =  true
      this.showModal3 =  false
    },
    toDevice(value){
      sessionStorage['getNum'] = value;
      this.num = sessionStorage['getNum'] 
      this.showModal = false;
      this.showModal1 =  false
      this.showModal2 =  false
      this.showModal3 =  true
    },
    //重启
    asyncOK (){
      this.$ajax.get('/find/systemReboot')
      .then((response) => {
        console.log(response)
      })
      this.showRetart = false;
      
    }
  }
}
</script>

<style lang = "stylus">
body{
  background-color: #F5F5F5 !important;
  height: 100%;
  margin  0 
  padding  0
}
.index 
  height: 100%;
  width: 100%;
  text-align center
  margin  0 auto
.index .headTop{
  width: 100%;
  height: 80px;
  background #fff
}
.index .headTop .imgLogo
  width 1280px
  height: 100%;
  line-height 80px
  margin: 0 auto;
  /* padding-left:4%;
  padding-right:4%; */
  text-align: left;
  /* padding-top: 1.3%; */
  background: #fff
  overflow hidden
  .img 
    float left
    img 
      vertical-align middle
  .right
    width 12%
    float right
    overflow hidden
    position relative
    
    .user 
      position relative
      float right 
      cursor pointer
      &:hover #userInfo
        display block
      &:leave #userInfo
        display block
      
      img 
        vertical-align middle
      
    .reset
      position relative
      float left
.content
  width 1280px
  margin  0 auto
  padding-bottom: 4%;
  .contentImg
    height 20%
    padding 5% 15% 
    position relative
    #userInfo {
        position: absolute;
        width: 100px;
        right: 0
        top 12px
        background-color: #fff;
        box-shadow: 5px 5px 3px #eee;
        z-index: 99999999999;
        border-radius: 5px;
      }
    #userInfo i {
        line-height: 40px;
      }
    #userInfo button {
        width: 100%;
        background-color: #fff;
        color: #0063ad;
        padding: 5px 0;
        border-radius: 5px;
        cursor: pointer;
        border none
      }
    img 
      cursor pointer     
    .circle
      height: 3px;
      display: inline-block;
      width: 100%;
      border-top: 5px dotted #ddd;
  .modal,.modal1,.modal2,.modal3
    position relative
    background-color #fff
  .modal
    height 600px
  .modal1
    height 1500px
  .modal2
    height 1230px
  .modal3
    height 600px
  .triangle_border_up,.triangle_border_up1,.triangle_border_up2,.triangle_border_up3{
        display:block;
        width:0;
        height:0;
        border-width:0 15px 15px;
        border-style:solid;
        border-color:transparent transparent #fff;
        position:absolute;
        top:-2.4%;
        left:17%;
    }
  .triangle_border_up{
        left:17%;
    }
  .triangle_border_up1{
        left:38%;
        top:-1%
    }
  .triangle_border_up2{
        left:59%;
        top:-1.2%
    }
  .triangle_border_up3{
        left:79%;
    }
@media only screen and (max-width: 1280px) and (min-width:1024px) {
    .content {
            width: 1024px !important;
    }
    .imgLogo{
      width: 1024px !important;
    }
}
@media only screen and (max-width: 1024px) and (min-width:0px) {
    .content {
            width: 100% !important;
    }
    .imgLogo{
      width: 100% !important;
      
    }
    .right{
      width: 14% !important;
    }
}
</style>
