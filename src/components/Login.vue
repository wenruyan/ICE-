<template>
  <div class="login" @keyup.13="login">
    <div class="headTop">
      <div class="imgLogo">
        <img src="../assets/img/logo.png" alt="">
      </div>
    </div>
    <div class="loginContent">
      <div class="logo">
        <img src="../assets/img/logo1.png" alt="">
      </div>
      <div class="next">
        <p>User Name</p>
        <Input v-model="inputUsername" placeholder="Enter username" />
        <p>Password</p>
        <Input v-model="inputPassword" placeholder="Enter password" :type="psdInputType" icon="md-eye" @on-click="changePsdInputType" />
        <transition name = "el-fade-in">
          <p style="color:red" v-show = "tipShow" class="tip">{{ tip }}</p>
        </transition>
        <div class="warning">
            初始登录密码为admin
        </div>
        <div class="bottom">
          <Button type="primary" long @click="login">登录</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'Login',
      created() {

      },
      data () {
        return {
          inputUsername: '',
          inputPassword: '',
          psdInputType: 'password',
          tip: '',
          tipShow: false
        }
      },
      methods: {
        changePsdInputType(){
          this.psdInputType = this.psdInputType == 'text' ? 'password' : 'text';
        },
        showTip(str){
          this.tip = str;
          this.tipShow = true;
          setTimeout(() => {
            this.tipShow = false;
          }, 2000);
        },
        login(){
          let name = this.inputUsername;
          let psd = this.inputPassword;
          let that = this;
          if(!name){
            this.showTip('User name cannot be empty');
          }
          else if(!psd){
            this.showTip('Password cannot be empty');
          }
          else {
            if(this.inputUsername == 'admin' && this.inputPassword == 'admin'){
              this.$router.push({ 
                name:'IceStatus',
                params:{
                  username: this.inputUsername
                }
              });
            } else {
              this.showTip('Error Incorrect username or password');
            }
          }
        }
      }


    }
</script>


<style>
@import url("../assets/base.css");
body{
  background-color: #F5F5F5;
  width: 100%;
  height: 100%;
}
.login {
  height: 100%;
  width: 100%;
  text-align: center;
}
.login .headTop{
  width: 100%;
  height: 80px;
  background-color: #fff
}
.login .headTop .imgLogo{
  /* width: 1280px; */
  height: 100%;
  margin: 0 auto;
  padding-left:10%;
  text-align: left;
  padding-top: 1.5%;
      background: #fff
}
.login .loginContent {
  height: 480px;
  width: 400px;
  box-shadow: 5px 5px 10px #ccc;
  background-color: #fff;
  padding: 30px;
  margin: 50px auto;
}
.login .loginContent .logo{
  height: 30%;
  padding-top: 6%
}
.login .loginContent .logo img{
  vertical-align: middle
}
.login .loginContent .next {
  height: 70%;
  float: left;
  
}
.login .loginContent .next {
  width: 100%;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  position: relative;
}
.login .loginContent .next p {
  text-align: left;
  margin: 20px 0 10px 0;
  color:#797878
}
/* .pShow{
  margin: 0px
} */
.login .loginContent .next input {
  width: 100%;
  background: none;
  border: 1px solid #DBDBDB;
  color: #999;
}
.login .loginContent .next input::-webkit-input-placeholder {
  color: #999;
}
.login .loginContent .next input:focus {
  border-color: #0063AD;
  box-shadow: none;
}
.login .loginContent .next i {
  cursor: pointer;
}
.login .loginContent .warning{
  height: 50px;
  line-height: 50px;
  color: #0abaee;
  text-align: center;
  font-size: 16px;
  /* margin-top: 20% */
}
.login .loginContent .next .bottom {
  position: absolute;
  bottom: 20px;
  left: 0;
  height: 50px;
  width: 100%;
}
.login .loginContent .next .bottom button {
  height: 40px;
  line-height: 40px;
  margin-top: 10px;
  padding: 0;
  color:#0abaee;
  background-color: rgba(0,0,0,0);
  border: 1px solid #0abaee;
  border-radius:20px;
  font-size:20px;
}
.login .loginContent .next .tip {
  text-align: center;
  color: #fff;
  margin :0
}
.login .loginContent .next .bottom button span {
  display: inline-block;
  height: 100%;
  line-height: 30px;
}

#inputStyle1 .ivu-input,#inputStyle2 .ivu-input {
  height:50px !important
}

</style>

 