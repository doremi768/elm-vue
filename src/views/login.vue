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
import { Indicator } from 'mint-ui';
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
//    mounted(){
//         this.saveNamePwd();
//     },
    methods: {
    handleLogin() {
      // 取消错误提醒
      this.errors = {};
      localStorage.setItem("ele_login", '1');
      this.$router.push("/");
      // 发送请求
      // this.$axios.post("/api/posts/sms_back", {
      //     phone: this.phone,
      //     code: this.verifyCode
      //   })
      //   .then(res => {
      //     // 检验成功 设置登录状态并且跳转到/
      //     //验证码514471
      //     localStorage.setItem("ele_login", res.data.user._id);
      //     this.$router.push("/");
      //   })
      //   .catch(err => {
      //     // 返回错误信息
      //     this.errors = {
      //       code: '账号或验证码错误'
      //     };
      //     Indicator.close();
      //   });
    },
    getVerifyCode() {
      if (this.validatePhone()) {
        this.validateBtn();
        // 发送网络请求
        this.$axios
          .post("/api/posts/sms_send", {
            tpl_id: "548827",
            key: "2d34fe3ca224dc2a678b8862fc9ea4aa",
            phone: this.phone
          })
          .then(res => {
            console.log(res);
          });
      }
    },
    validateBtn() {
      let time = 60;
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          this.btnTitle = "获取验证码";
          this.disabled = false;
        } else {
          // 倒计时
          this.btnTitle = time + "秒后重试";
          this.disabled = true;
          time--;
        }
      }, 1000);
    },
    validatePhone() {
      // 验证手机号码
      if (!this.phone) {
        this.errors = {
          phone: "手机号码不能为空"
        };
        return false;
      } else if (!/^1[345678]\d{9}$/.test(this.phone)) {
        this.errors = {
          phone: "请填写正确的手机号码"
        };
        return false;
      } else {
        this.errors = {};
        return true;
      }
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
