<template>
  <div class="webManage">
    <div class="webTop">
      
        <div class="webStatus">
          4G网络
        </div>
        <div class="webSwitch ">
          <span style="margin-right:2%">开关</span>
          <i-switch v-model="webSwitch"  @on-change="webChange" />
        </div> 
      </div>
      <div class="webCenter">
        <div class="wifiStatus">
          WIFI网络
        </div>
        <div class="wifiSwitch ">
          <div style="height:20%">
            <span style="margin-right:2%">开关</span>
            <i-switch v-model="wifiSwitch"  @on-change="wifiChange" />
          </div>
          <div style="height:80%;overflow:hidden">
              <div class="wifiLeft">
                <Form style="width:100%;height:100%" ref="formInfo" :model="formInfo" :rules="ruleValidate" :label-width="80">
                  <FormItem label="WIFI名称" prop="name">
                      <Input  :disabled="wifiDisabled" type="text"  placeholder="Wifi名称" v-model="formInfo.name"></Input>
                  </FormItem>
                  <FormItem label="密码" prop="passwd">
                      <Input  :type="psdInputType" icon="md-eye" @on-click="changePsdInputType"  :disabled="wifiDisabled"  placeholder="密码(不能少于8位)" v-model="formInfo.passwd"></Input>
                  </FormItem>
                  <div class="wifiBottom">
                    <FormItem>
                      <Button  :disabled = "buttonDisables1" type="primary" long  @click="handleSubmit1('formInfo')">确定</Button>
                      <p>确定后,重启生效</p>
                    </FormItem>
                  </div>
                </Form>
              </div>
              <div class="wifiRight">
                <span @click = "showWifi" style="display:inline-block;width:12%">查找WIFI</span>
                <div class="wifiModal" v-show ="wifiModal" >
                  <ul>
                    <li v-for="(item,index) in this.data" :key="index">
                      <div class="modalLeft" @click = "getWifi">{{item}}</div>
                      <div class="modalRight"><Icon type="ios-wifi" /></div>
                    </li>
                  </ul>
                </div>
              </div>
          </div>
        </div> 
      </div>
      <div class="webNext">
        <div class="wiredStatus">
          有线网络
        </div>
        
          <div class="wiredSwitch ">
            <Form style="width:100%;height:100%" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <div class="wiredSwitch1">
              <RadioGroup style="height:100%;width:100%" v-model="vertical" vertical  @on-change = "radioChange">
                  <Radio label="dhcp" style="height:16%" :disabled="radioDisabled">
                      <Icon type="social-android"></Icon>
                      <span>自动 (DHCP)</span>
                      <div class="setHeight">通过有线级联时请选择此项</div>
                  </Radio>
                  <Radio label="ip" :disabled="radioDisabled">
                      <Icon type="social-windows"></Icon>
                      <span>静态IP</span>
                        <FormItem label="IP" prop="ip">
                          <Input :disabled="wiredDisabled2" style="display:block;width:100%" v-model="formValidate.ip" size="large" placeholder="IP" />
                        </FormItem>
                        <FormItem label="子网掩码" prop="mask">
                          <Input :disabled="wiredDisabled2" style="display:block;width:100%" v-model="formValidate.mask" size="large" placeholder="子网掩码" />
                        </FormItem>
                        <FormItem label="网关">
                          <FormItem prop="router">
                            <Input @on-blur="fun1" :disabled="wiredDisabled2" style="display:block;width:100%" v-model="formValidate.router" size="large" placeholder="网关" />
                          </FormItem>
                        </FormItem>
                        <FormItem label="首选DNS">
                          <FormItem prop="dns">
                            <Input @on-blur="fun2" :disabled="wiredDisabled2" style="display:block;width:100%" v-model="formValidate.dns" size="large" placeholder="首选DNS" />
                          </FormItem>
                        </FormItem>
                        <FormItem label="备用DNS">
                          <FormItem prop="dns2">
                            <Input @on-blur="fun3" :disabled="wiredDisabled2" style="display:block;width:100%" v-model="formValidate.dns2" size="large" placeholder="备用DNS" />
                          </FormItem>
                        </FormItem>
                      <!-- </Form> -->
                  </Radio>
              </RadioGroup>
            </div>
            <div class="webBottom">
              <FormItem>
                <Button :disabled = "buttonDisables2" type="primary" long  @click="handleSubmit2('formValidate')">确定</Button>
                <p>确定后,重启生效</p>
              </FormItem>
            </div>
            </Form>
          </div> 
          
        
      </div>
      
    
  </div>
</template>

<script>
export default {
  data () {
      return {
        formInfo: {
          name:'',
          passwd:'',
        },
        formValidate: {
          ip:'',
          mask:'',
          router:'',
          dns:'',
          dns2:'',
        },
        ruleValidate: {
                    name: [
                        { required: true, message: 'Wifi名称不能为空', trigger: 'blur' },
                    ],
                    passwd: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { type: 'string',pattern:/^[\w_-]{8,16}$/, message: '密码格式错误', trigger: 'blur' },
                    ],
                    ip: [
                        { required: true, message: 'IP地址不能为空', trigger: 'blur' },
                        { type: 'string',pattern:/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: 'IP格式错误', trigger: 'blur' },
                    ],
                    mask: [
                        { required: true, message: '子网掩码不能为空', trigger: 'blur' },
                        { type: 'string',
                        pattern:/^(254|252|248|240|224|192|128|0)\.0\.0\.0$|^(255\.(254|252|248|240|224|192|128|0)\.0\.0)$|^(255\.255\.(254|252|248|240|224|192|128|0)\.0)$|^(255\.255\.255\.(254|252|248|240|224|192|128|0))$/ ,
                         message: '子网掩码格式错误', trigger: 'blur' },
                    ],
                    router: [
                        { required: true, message: '网关不能为空', trigger: 'blur' },
                        { type: 'string',pattern:/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: '网关格式错误', trigger: 'blur' },
                    ],
                    dns: [
                        { required: true, message: 'DNS不能为空', trigger: 'blur' },
                        { type: 'string',pattern:/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: 'DNS格式错误', trigger: 'blur' },
                    ],
                    dns2: [
                        { required: true, message: 'DNS不能为空', trigger: 'blur' },
                        { type: 'string',pattern:/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: 'DNS格式错误', trigger: 'blur' },
                    ],
        },
        webSwitch: false,
        wifiSwitch:false,
        value1: '',
        wifiModal:false,
        singlePoe:false,
        vertical: 'ip',
        wifiDisabled:true,
        wiredDisabled2:false,
        radioDisabled:false,
        buttonDisables1:true,
        buttonDisables2:false,
        ip:'',
        data:[],
        psdInputType: 'password',
      }  
  },
  mounted(){
    this.getInfo()
  },
  methods: {
    changePsdInputType(){
          this.psdInputType = this.psdInputType == 'text' ? 'password' : 'text';
    },
    fun1(){
      let router = this.formValidate.router
      function isValidIP(router)   
        {   
            var reg =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/   
            return reg.test(router);   
        }  
      if(isValidIP(router))
      {
      }
      else
      {
        this.ruleValidate.router.forEach(ele => {
          if(router){
            ele.message = '网关格式错误'
          }else{
            ele.required = true
             ele.message = '网关不能为空'
          }
             
            });
      }
    
    },
    fun2(){
      let dns = this.formValidate.dns
      function isValidIP(dns)   
        {   
            var reg =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/   
            return reg.test(dns);   
        }  
      if(isValidIP(dns))
      {
      }
      else
      {
        this.ruleValidate.dns.forEach(ele => {
          if(dns){
            ele.message = 'DNS格式错误'
          }else{
            ele.required = true
             ele.message = 'DNS不能为空'
          }
             
            });
      }
    
    },
    fun3(){
      let dns2 = this.formValidate.dns2
      function isValidIP(dns2)   
        {   
            var reg =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/   
            return reg.test(dns2);   
        }  
      if(isValidIP(dns2))
      {
      }
      else
      {
        this.ruleValidate.dns2.forEach(ele => {
          if(dns2){
            ele.message = 'DNS格式错误'
          }else{
            ele.required = true
             ele.message = 'DNS不能为空'
          }
             
            });
      }
    
    },
    getInfo(){
      // this.formValidate.ip = 1
      //获取回显信息
      this.$ajax.get('/find/findNetState')
            .then((response) => {
              if(response.data.wvdial == 'true'){
                this.webSwitch = true
              }else{
                this.webSwitch = false
              }
              if(response.data.wifi == 'true'){
                this.wifiSwitch = true
                this.wifiDisabled = false
                this.buttonDisables1 = false
                this.$ajax.get('/find/findWifi')
                 .then((response) => {
                   this.formInfo.name = response.data.ssid
                   this.formInfo.passwd = response.data.psk
                 })
              }else{
                this.wifiSwitch = false
              }
              if(response.data.dhcp == 'true'){
                this.radioDisabled = false
                this.buttonDisables2 = false
                this.vertical = 'ip'
                this.$ajax.get('/find/findDhcpcd')
                 .then((response) => {
                   this.formValidate.ip = response.data.ip
                   this.formValidate.mask = response.data.mask
                   this.formValidate.router = response.data.router
                   let dnsDouble = response.data.dns.split(' ')
                     this.formValidate.dns = dnsDouble[0]
                     this.formValidate.dns2 = dnsDouble[1]
                 })
              }else{
                this.vertical = 'dhcp'
              }
              
            })
    },
    //wifi按钮
      handleSubmit1 (name) {
        let ssid = this.$refs[name].model.name
        let psk = this.$refs[name].model.passwd
        //关闭wifi弹框
        this.wifiModal = false
        this.$refs[name].validate((valid) => {
            if (valid) {
              this.$ajax.get('/service/openWifi' +'/' +  ssid + '/'  + psk )
              .then((response) => {
                // this.$refs[name].resetFields();
              })
                this.$Message.success('Success!');
            } else {
                this.$Message.error('Fail!');
            }
        })
      },
      //静态ip按钮
      handleSubmit2 (name) {
          let ip = this.$refs[name].model.ip
          let mask = this.$refs[name].model.mask
          let router = this.$refs[name].model.router
          let dns = this.$refs[name].model.dns
          let dns2 = this.$refs[name].model.dns2
          if( !router){
            router = 'null'
            this.ruleValidate.router.forEach(ele => {
              ele.required = false
              ele.message = ''
            });
          }else{
          }
          if( !dns){
            dns = 'null'
            this.ruleValidate.dns.forEach(ele => {
              ele.required = false
              ele.message = ''
            });
          }else{
          }
          if( !dns2){
            dns2 = 'null'
            this.ruleValidate.dns2.forEach(ele => {
              ele.required = false
              ele.message = ''
            });
          }else{
          }
          this.$refs[name].validate((valid) => {
              if (valid) {
                
                if( ip !='' && mask != ''){
                  this.$ajax.get('/service/openDhcp' +'/' +  ip + '/'  + mask + '/'  + router + '/'  + dns + '/'  + dns2 )
                  .then((response) => {
                    // this.$refs[name].resetFields();
                    // router = ''
                    // dns = ''
                    // dns2 = ''
                  })
                    this.$Message.success('Success!');
                  }else {
                  this.$Message.error('Fail!');
                  } 
              } else {
                  this.$Message.error('Fail!');
              }
          })
      },
    //4G开关
      webChange (status) {
        //开
        if(status == true){
          // this.buttonDisables1 = true
          console.log()
          this.$ajax.get('/service/wvdialState/true')
            .then((response) => {
            })
          }
          //关
          if(status == false){
          this.$ajax.get('/service/wvdialState/false')
            .then((response) => {
            })
          }
      },
      //wifi开关
      wifiChange(status){
          //关
          if(status == false){
          this.$ajax.get('/service/closeWifi')
            .then((response) => {
            })
          }
          this.wifiDisabled = !this.wifiDisabled
          this.buttonDisables1 = !this.buttonDisables1
          
      },
      //单选按钮
      radioChange(status){
        if(status == 'dhcp'){
          this.$ajax.get('/service/closeDhcp')
            .then((response) => {
            })
          this.wiredDisabled2 = true
        }
        if(status == 'ip'){
          this.wiredDisabled2 = false
        }
      },
      //点击查找wifi
      showWifi(){
        // setTimeout( function(){
            this.wifiModal = !this.wifiModal
        // }, 2000 )
          this.$ajax.get('/find/scanWifi')
          .then((response) => {
            this.data = response.data
          })
        
      },
      getWifi(e){
        this.formInfo.name = e.target.innerText
        this.formInfo.passwd = ''
        
      }
  }
}
</script>

<style lang = "stylus" scoped>
.webManage
  /* width 1280px */
  height 100%
  padding 10% 10% 0 10%
  .webTop
    height 10%
    .webStatus
      width 10%
      height 25%
      font-size 13px
      color #000
      border-bottom 3px solid #0abaee
    .webSwitch 
      height 82%
      padding-top 3%
      padding-left 15%
      text-align left 
      border-top 1px solid #eee
  .webCenter
    height 30%
    .wifiStatus
      width 10%
      height 8%
      font-size 13px
      color #000
      border-bottom 3px solid #0abaee
    .wifiSwitch 
      height 90%
      padding-top 3%
      padding-left 15%
      text-align left 
      border-top 1px solid #eee
      .wifiLeft
        width 40%
        height 100%
        float left
      .wifiRight
        position relative
        width 60%
        height 100%
        float left
        color #0abaee
        padding-left 5%
        cursor pointer
        .wifiModal
          position absolute
          width 230px
          height 90%
          overflow: auto
          left 20%
          top 2%
          box-shadow  #ddd 0px 0px 10px;
          padding 0 5%
          ul
            width 100%
            height 100%
            li
              height 20%
              overflow hidden
              border-bottom 1px solid #eee
              .modalLeft
                float left 
                text-align left 
                width 80%
                line-height: 50px;
                font-size: 16px;
                color: #000;
              .modalRight
                float left
                width 20%
                line-height: 50px;
                font-size: 18px;
                color: #000;
  .webNext
    height 50%
    .wiredStatus
      width 10%
      height 6%
      font-size 13px
      color #000
      border-bottom 3px solid #0abaee
    .wiredSwitch 
      height 66%
      padding-top 3%
      padding-left 15%
      padding-right 55%
      text-align left 
      border-top 1px solid #eee
      .wiredSwitch1
        height 100%
        .setHeight
          height 22%
  .webBottom
    height 10%
    button
      height: 40px;
      line-height: 40px;
      margin-top: 10px;
      padding: 0;
      color:#0abaee;
      background-color: rgba(0,0,0,0);
      border: 1px solid #0abaee;
      border-radius:20px;
      font-size:20px;
    p
      font-size 12px
      color #0abaee
      text-align: center
  .wifiBottom
    height 10%
    button
      height: 40px;
      line-height: 40px;
      margin-top: 10px;
      padding: 0;
      color:#0abaee;
      background-color: rgba(0,0,0,0);
      border: 1px solid #0abaee;
      border-radius:20px;
      font-size:20px;
    p
      font-size 12px
      color #0abaee
      text-align: center    
  
</style>

