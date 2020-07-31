<template>
  <div class="login">
      <div class="logo">
        <img src="../assets/img/logo.jpg" alt="logo">
      </div>
      <!-- 手机号 -->
      <input-box type="number" v-model="phone" placeholder="手机号"
      :btnTitle="btnTitle" :disabled="disabled" :error="errors.phone"
      @btnClick="getVerifyCode"
      />

      <!-- 验证码 -->
      <input-box type="number" v-model="verifyCode" placeholder="验证码"
       :error="errors.code"/>

       <!-- 用户服务协议 -->
       <div class="login_des">
           <p>
               新用户登录即自动注册，表示已同意
               <span>《用户服务协议》</span>
           </p>
       </div>

       <!-- 登录按钮 -->
       <div class="login_btn" >
           <button :disabled="isClick" @click="handleLogin">登录</button>
       </div>
  </div>
</template>

<script>
import inputBox from '../components/inputBox';
export default {
    name: 'login',
    data(){
      return {
          phone: '',
          verifyCode: '',
          errors: {},
          btnTitle: '获取验证码',
          disabled: false,
          localPhone: '',
          localCode: ''
      }
    },
    components: {
        inputBox
    },
    computed:{
        isClick(){
            if (!this.phone || !this.verifyCode) return true;
            return false;
        },
       
    },
   mounted(){
        this.saveNamePwd();
    },
    methods: {
        saveNamePwd(){
            try{
                let localSave = localStorage.getItem('ele_validate');
                let localArr = localSave.split(',');
                this.localPhone = localArr[0];
                this.localCode = localArr[1];
                this.phone = this.localPhone;
                this.verifyCode = this.localCode;
            } catch(e){

            }
                
        },
        handleLogin(){
           
            if((parseInt(this.verifyCode) === parseInt(this.localCode)) && (parseInt(this.phone) === parseInt(this.localPhone))){
               localStorage.setItem('ele_login',true);
               this.$router.push("/");
            } else if(!(parseInt(this.phone) === parseInt(this.localPhone))){
                this.errors = {
                    phone: '请输入正确的手机号码'
                }
            } else {
                this.errors = {
                    code: "请输入正确的验证码"
                }
            }

        },
        getVerifyCode(){
            if(this.validatePhone()){
                this.validateBtn();
                let randomCode = Math.floor(Math.random() * 1000000);
                let phone = this.phone;
                alert(randomCode);
                localStorage.setItem('ele_validate',[phone,randomCode]);
                let localSave = localStorage.getItem('ele_validate');
                let localArr = localSave.split(',');
                this.localPhone = localArr[0];
                this.localCode = localArr[1];
            }
        },
        //点击时验证手机号
        validatePhone(){
            if(!this.phone){
                this.errors = {
                    phone: '手机号码不能为空'
                };
                return false;
            } else if (!/^1[345678]\d{9}$/.test(this.phone)){
                this.errors = {
                    phone: '请输入正确的手机号码'
                };
                return false;
            } else {
                return true;
            }
        },
        //倒计时
        validateBtn(){
            this.errors = {};
            let time = 10;
            let timer = setInterval(()=>{
                if(time == 0){
                    clearInterval(timer);
                    this.disabled = false;
                    this.btnTitle = "获取验证码"
                } else {
                    this.disabled = true;
                    this.btnTitle = time + "秒后重试";
                    time--
                }
            },1000)
        }
    }
}
</script>

<style scoped>
.login{
    padding: 30px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;    
    background-color: #fff;

}
.login > .logo{
    text-align: center;
}
.login > .logo > img{
    width: 150px;
}
.login_des,
.login_btn {
  margin-top: 20px;
}
.login_des {
  color: #aaa;
  line-height: 22px;
}
.login_des span {
  color: #4d90fe;
}
.login_btn button {
  width: 100%;
  height: 40px;
  background-color: #48ca38;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  border: none;
  outline: none;
}
.login_btn button[disabled] {
  background-color: #8bda81;
}
</style>
