<template>
  <div class="webManage">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <div class="manageInfo">
          <div>
            <span @click = "clickUpdateBusiness " :style="{color:spanColor1}">业务包和更新包配置</span>
            <span @click = "clickUpdateSystem "  :style="{color:spanColor2}">系统配置</span>
          </div>
      </div>
      <div v-if = "showBusiness" >
        <div class="webTop">
          <div class="webStatus">
            thingsboard          </div>
          <div class="webSwitch ">
              <FormItem label="IP地址" prop="ip1" style="postion:relative">
                  <Input id="ipValue"  style=";display:block;width:100%" v-model="formValidate.ip1" size="large" placeholder="IP地址" />
              <!-- <p style="position:absolute;top:30px;left:0;color:red;" :style="{display:pDisply}">Error IP adress</p> -->
              </FormItem>
              <FormItem prop="port1" label="端口号">
                <Input style=";display:block;width:100%" v-model="formValidate.port1" size="large" placeholder="端口号" />
              </FormItem>
          </div> 
        </div>
        <div class="webCenter">
          <div class="wifiStatus">
            activeMQ
          </div>
          <div class="wifiSwitch ">
            <div class="username">
              <div class="usernameLeft">
                  <FormItem prop="name" label="用户名">
                    <Input style=";display:block;width:100%" v-model="formValidate.name" size="large" placeholder="用户名" />
                  </FormItem>
              </div>
              <div class="usernameRight">默认是: admin</div>
            </div>
            <div class="username">
              <div class="usernameLeft">
                  <FormItem prop="passwd" label="密码">
                    <Input style=";display:block;width:100%" v-model="formValidate.passwd" size="large" placeholder="密码(不能少于6位)" />
                  </FormItem>
              </div>
              <div class="usernameRight">默认是: admin</div>
            </div>
            <div style="padding-right:65%">
                <FormItem prop="ip2" label="IP地址">
                  <Input style=";display:block;width:100%" v-model="formValidate.ip2" size="large" placeholder="IP地址" />
                </FormItem>
                <FormItem prop="port2" label="端口号">
                  <Input style=";display:block;width:100%" v-model="formValidate.port2" size="large" placeholder="端口号" />
                </FormItem>
            </div>
          </div> 
        </div>
        <div class="webNext">
          <div class="wiredStatus">
            Update Service
          </div>
          <div class="wiredSwitch ">
              <FormItem prop="ip3" label="IP地址">
                <Input style=";display:block;width:100%" v-model="formValidate.ip3" size="large" placeholder="IP地址" />
              </FormItem>
              <FormItem prop="port3" label="端口号">
                <Input style=";display:block;width:100%" v-model="formValidate.port3" size="large" placeholder="端口号" />
              </FormItem>
              <!-- <FormItem prop="fileName" label="文件名">
                <Input style=";display:block;width:100%" v-model="formValidate.fileName" size="large" placeholder="文件名" />
              </FormItem> -->
          </div> 
        </div>
        <div class="webLast">
          <div class="wiredStatus">
            Heart
          </div>
          <div class="wiredSwitch" id="noBottom">
              <FormItem prop="ip4" label="IP地址">
                <Input style=";display:block;width:100%" v-model="formValidate.ip4" size="large" placeholder="IP地址" />
              </FormItem>
              <FormItem prop="port4" label="端口号">
                <Input style=";display:block;width:100%" v-model="formValidate.port4" size="large" placeholder="端口号" />
              </FormItem>
          </div> 
        </div>
        <div class="webBottom">
            <FormItem>
              <Button type="primary" long  @click="handleSubmit('formValidate')">确定</Button>
              <p>确定后,重启生效</p>
            </FormItem>
        </div>
      </div>
      <div class="clickSystem" v-if = "showSystem" >
        <div class="system">
          <div class="systemName">固件更新</div>
          <div class="systemContent">
            <p>当前版本: 1.0.25</p>
            <p>保留原设置数据:</p>
            <div>
              <input class="file" name="file" type="file"  @change="getFile($event)"/>
              <p style="line-height:30px">文件必须为raspberry_app.jar,大小不能超过50M</p>
            </div>
              <Button class="sure" type="primary" long  @click="submitForm($event)">本地更新</Button>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
      return {
        formValidate: {
          name:'',
          passwd:'',
          ip1:'',
          ip2:'',
          ip3:'',
          ip4:'',
          port1:'',
          port2:'',
          port3:'',
          port4:'',
          // fileName:'',
          file:''
        },
        ruleValidate: {
                    name: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' },
                        { type: 'string',pattern:/^[\w_-]{1,16}$/, message: '用户名格式错误', trigger: 'blur' },
                    ],
                    passwd: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { type: 'string',pattern:/^[\w_-]{6,16}$/, message: '密码格式错误', trigger: 'blur' },
                    ],
                    // fileName: [
                    //     { required: true, message: 'The fileName cannot be empty', trigger: 'blur' },
                    // ],
                    ip1: [
                        { required: true, message: 'IP地址不能为空', trigger: 'blur' },
                        { type: 'string',pattern:/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: 'IP地址格式错误', trigger: 'blur' },
                    ],
                    ip2: [
                        { required: true, message: 'IP地址不能为空', trigger: 'blur' },
                        { type: 'string',pattern:/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: 'IP地址格式错误', trigger: 'blur' },
                    ],
                    ip3: [
                        { required: true, message: 'IP地址不能为空', trigger: 'blur' },
                        { type: 'string',pattern:/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: 'IP地址格式错误', trigger: 'blur' },
                    ],
                    ip4: [
                        { required: true, message: 'IP地址不能为空', trigger: 'blur' },
                        { type: 'string',pattern:/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/, message: 'IP地址格式错误', trigger: 'blur' },
                    ],
                    port1: [
                        { required: true, message: '端口号不能为空', trigger: 'blur' },
                        { type: 'string',pattern:/^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, message: '端口号格式错误', trigger: 'blur' },
                    ],
                    port2: [
                        { required: true, message: '端口号不能为空', trigger: 'blur' },
                        { type: 'string',pattern:/^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, message: '端口号格式错误', trigger: 'blur' },
                    ],
                    port3: [
                        { required: true, message: '端口号不能为空', trigger: 'blur' },
                        { type: 'string',pattern:/^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, message: '端口号格式错误', trigger: 'blur' },
                    ],
                    port4: [
                        { required: true, message: '端口号不能为空', trigger: 'blur' },
                        { type: 'string',pattern:/^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, message: '端口号格式错误', trigger: 'blur' },
                    ],
        },
        webSwitch: false,
        value1: '',
        wifiModal:false,
        singlePoe:false,
        vertical: 'android',
        spanColor1:'#0abaee',
        spanColor2:'#000',
        showBusiness:true,
        showSystem:false,
        file:'',
        iceId:'',
        fileName:''
      }  
  },
  mounted(){
    this.getInfo()
  },
  methods: {
    getInfo(){
      //获取回显信息
      this.$ajax.get('/find/findProperties')
      .then((response) => {
        this.formValidate.name = response.data.MqUserName
        this.formValidate.passwd = response.data.MqPassword
        this.formValidate.ip1 = response.data.ThingsBoardHost
        this.formValidate.ip2 = response.data.MqHost
        this.formValidate.ip3 = response.data.UpdateServerHost
        this.formValidate.ip4 = response.data.HeartHost
        this.formValidate.port1 = response.data.ThingsBoardPort
        this.formValidate.port2= response.data.MqPort
        this.formValidate.port3 = response.data.UpdateServerPort
        this.formValidate.port4 = response.data.HeartPort
        this.iceId = response.data.ICE_ID
        this.fileName = response.data.FileName
      })
    },
    //校验
    handleSubmit (name) {
      // this.$refs[name].model
      let MqUserName = this.$refs[name].model.name
      let MqPassword = this.$refs[name].model.passwd
      let ThingsBoardHost = this.$refs[name].model.ip1
      let MqHost = this.$refs[name].model.ip2
      let UpdateServerHost = this.$refs[name].model.ip3
      let HeartHost = this.$refs[name].model.ip4
      let ThingsBoardPort = this.$refs[name].model.port1
      let MqPort = this.$refs[name].model.port2
      let UpdateServerPort = this.$refs[name].model.port3
      let HeartPort = this.$refs[name].model.port4
      let FileName = this.fileName
      let ICE_ID = this.iceId
      this.$refs[name].validate((valid) => {
          if (valid) {
            this.$ajax.post('/service/updateProerties',{
              MqUserName,MqPassword,ThingsBoardHost,MqHost,UpdateServerHost,HeartHost,ThingsBoardPort,MqPort,UpdateServerPort,HeartPort,FileName,ICE_ID 
            })
           .then((response) => {
           })
              this.$Message.success('Success!');
          } else {
              this.$Message.error('Fail!');
          }
      })
    },
    clickUpdateBusiness(){
      this.spanColor1 = '#0abaee'
      this.spanColor2 = '#000'
      this.showBusiness = true
      this.showSystem = false
    },
    clickUpdateSystem(){
      this.spanColor1 = '#000'
      this.spanColor2 = '#0abaee'
      this.showBusiness = false
      this.showSystem = true
    },
    getFile(event) {
        this.file = event.target.files[0]; 
    },
    //文件上传
    submitForm(event){
      let file = this.file.name;
      let fileName = this.fileName.concat('.jar')
      let param = new FormData(); //创建form对象
      //文件类型必须为jar包
      if(fileName == file){
        param.append('file',this.file);
        this.$ajax.post('/service/upload',param)
        .then((response) => {
          this.$Message.info('Success');
        })
      }else{
          this.$Message.info('文件类型错误');
      }
      
    }
  }
}
</script>

<style lang = "stylus" scoped>
::-webkit-input-placeholder { /* WebKit browsers */
    color:    #dcdee2;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #dcdee2;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #dcdee2;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
    color:    #dcdee2;
}
input{
        border: 1px solid #dcdee2;
        border-radius 5px
        }

.webManage
  /* width 1280px */
  height 100%
  padding 0 10% 0 10%
  .manageInfo
    height 8%
    padding-left: 30%;
    padding-top: 2%;
    padding-bottom: 3%
    div
      width 50%
      border 1px solid #eee
      background-color #F9F9F9
      height 40px
      line-height 40px
      border-radius 20px
      font-size 14px
      span 
        &:nth-of-type(1)
          /* color #0abaee */
          margin-right 8%
          cursor pointer
        &:nth-of-type(2)
          cursor pointer
  .webTop
    height 15%
    .webStatus
      width 10%
      height 14%
      font-size 13px
      color #000
      border-bottom 3px solid #0abaee
    .webSwitch 
      height 84%
      padding-top 3%
      padding-left 15%
      padding-right: 55%;
      padding-bottom: 5%;
      text-align left 
      border-top 1px solid #eee
  .webCenter
    height 20%
    .wifiStatus
      width 10%
      height 10%
      font-size 13px
      color #000
      border-bottom 3px solid #0abaee
    .wifiSwitch 
      height 90%
      padding-top 3%
      padding-left 15%
      text-align left 
      padding-bottom: 5%;
      border-top 1px solid #eee
      .username
        overflow hidden
        width 100%
        line-height 37px
        .usernameLeft
          float left
          width 35%
          margin-right 2%
        .usernameRight 
          float left
          width 40%
  .webNext
    height 15%
    .wiredStatus
      width 10%
      height 14%
      font-size 13px
      color #000
      border-bottom 3px solid #0abaee
    .wiredSwitch 
      height 90%
      padding-top 3%
      padding-left 15%
      padding-right 55%
      text-align left 
      padding-bottom: 5%;
      border-top 1px solid #eee
    
  .webLast
    height 15%
    .wiredStatus
      width 10%
      height 10%
      font-size 13px
      color #000
      border-bottom 3px solid #0abaee
    .wiredSwitch 
      height 90%
      padding-top 3%
      padding-left 15%
      padding-right 55%
      text-align left 
      padding-bottom: 5%;
      border-top 1px solid #eee
    #noBottom
      padding-bottom 0px !important
  .webBottom
    height 10%
    padding-left 15% 
    padding-right 55% 
    /* padding-bottom: 5%; */
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
      /* margin-bottom 10% */
    p
      font-size 12px
      color #0abaee

  .clickSystem
    height 30%
    .system
      height 100%
      width 100%
      .systemName
        width 10%
        height 10%
        font-size 13px
        color #000
        border-bottom 3px solid #0abaee
      .systemContent
        height 90%
        padding-left 15%
        padding-right 55%
        border-top 1px solid #eee
        text-align  left
        p
          &:nth-of-type(1)
            font-size 14px
            color #000
            height 30%
            line-height: 96px
          &:nth-of-type(2)
            font-size 14px
            color #000
            margin-bottom 2%
        .sure
          height: 40px;
          line-height: 40px;
          margin-top: 30px;
          padding: 0;
          color:#0abaee;
          background-color: rgba(0,0,0,0);
          border: 1px solid #0abaee;
          border-radius:20px;
          font-size:18px;
          margin-bottom 10%
</style>
