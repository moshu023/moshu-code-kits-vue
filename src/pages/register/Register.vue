<template>
  <div class="home center">
    <div class="box">
      <div class="square" style="--i:0;"></div>
      <div class="square" style="--i:1;"></div>
      <div class="square" style="--i:2;"></div>
      <div class="square" style="--i:3;"></div>
      <div class="square" style="--i:4;"></div>
      <div class="form">
        <h2>莫枢工具箱</h2>
        <el-form :model="registerForm" ref="registerForm" :rules="rules">
          <div class="inputBox">
            <el-form-item prop="userAccount">
              <el-input type="text" placeholder="用户账号" v-model="registerForm.userAccount" onfocus="this.placeholder=''"
                        onblur="this.placeholder='用户账号'">
              </el-input>
            </el-form-item>
          </div>
          <div class="inputBox">
            <el-form-item prop="userPassword">
              <el-input type="password" placeholder="用户密码" v-model="registerForm.userPassword" prop="userPassword"
                        onfocus="this.placeholder='';this.type='text'"
                        onblur="this.placeholder='用户密码';this.type='password'"/>
            </el-form-item>
          </div>
          <div class="inputBox">
            <el-form-item prop="checkPassword">
              <el-input type="password" placeholder="确认密码" v-model="registerForm.checkPassword" prop="checkPassword"
                        onfocus="this.placeholder='';this.type='text'"
                        onblur="this.placeholder='确认密码';this.type='password'"/>
            </el-form-item>
          </div>
          <div class="inputBoxForCheck">
            <el-form-item prop="verifyCode">
              <el-input @keyup.enter.native="register" type="text" placeholder="验证码" v-model="registerForm.verifyCode"
                        prop="verifyCode"
                        onfocus="this.placeholder=''" onblur="this.placeholder='验证码'"/>
              <div style=" position:absolute;display:inline-block;margin-left: 10px;">
                <img id="verifyCode" alt="点击刷新" src='http://localhost:8085/user/check' style="border-radius: 25px;cursor: pointer;"
                     onclick="this.src='http://localhost:8085/user/check?d='+new Date()*1">
              </div>
            </el-form-item>

          </div>
        </el-form>
        <div class="inputBox" style="display: flex;align-items: center">
          <el-button class="btn center" @click="login"
                     style="background-color: #67bfe5; color: #fff;display: inline-block">登录
          </el-button>
          <el-button class="btn center" @click="register"
                     style="margin-left: 120px;background-color: #AEEDBF;color: #fff;display: inline-block">注册
          </el-button>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import {userRegister} from "@/api/userApi";

export default {
  data() {
    // 验证用户账号
    const checkUserAccount = (rule, value, callback) => {
      const reg = /.*[`~!@#$%^&*()+=|{}':;',\[\].<>/?~！@#￥%……&*()——+|{}【】‘；：”“’。，、？\\]+.*/
      if (!value) {
        callback(new Error('用户账户不能为空'))
      } else if (value.length < 4) {
        callback(new Error('用户账户不能少于 4 位字符'))
      } else {
        if (reg.test(value)) {
          callback(new Error('用户账号不能包含特殊字符'))
        } else {
          callback()
        }
      }
    }
    // 验证用户密码
    const checkUserPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('用户账户不能为空'))
      } else if (value.length < 8) {
        callback(new Error('用户密码不能少于 8 位字符'))
      } else {
        callback()
      }
    }
    // 验证确认密码
    const checkCheckPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('用户账户不能为空'))
      } else if (value.length < 8) {
        callback(new Error('用户密码不能少于 8 位字符'))
      } else {
        callback()
      }
    }
    // 验证验证码
    const checkVerifyCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('验证码不能为空'))
      } else if (value.length < 5 || value.length > 5) {
        callback(new Error('验证码为 5 位字符'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        userAccount: "",
        userPassword: "",
        checkPassword: "",
        verifyCode: ""
      },
      rules: {
        userAccount: [{required: true, validator: checkUserAccount, trigger: 'blur'}],
        userPassword: [{required: true, validator: checkUserPassword, trigger: 'blur'}],
        checkPassword: [{required: true, validator: checkCheckPassword, trigger: 'blur'}],
        verifyCode: [{required: true, validator: checkVerifyCode, trigger: 'blur'}]
      }
    }
  },
  mounted() {

  },
  methods: {
    register() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.$loading.show();
          setTimeout(() => {
            this.$loading.close();
            userRegister(this.registerForm).then(res => {
              if (res.code === 200) {
                this.$router.push("/login")
                this.$message.success("注册成功，您的昵称为: " + res.data.username + "去登录吧~")
              } else {
                document.getElementById('verifyCode').click();
              }
            })
          }, 1000)
        } else {
          document.getElementById('verifyCode').click();
        }
      })
    },
    login() {
      this.$router.push("/login", () => {})
    }
  },
  watch: {
    // 监听路由变化，如果是切换到登录页，则需要刷新一次，清除UI样式缓存
    $route(to) {
      if (to.name === '/login') {
        location.reload();
      }
    },
  }
}
</script>

<style lang="scss">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.home {
  background: linear-gradient(-45deg, #FFB7B7, #F5A7B6, #9FDEDD, #AEEDBF);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  height: 100vh;
  position: relative;

  .box {
    margin-left: 37%;
    margin-top: 15%;
    position: fixed;
    width: 400px;
    height: 400px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    backdrop-filter: blur(5px);
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);

    display: flex;
    align-items: center;
    box-sizing: border-box;

    .form {
      position: relative;
      width: 100%;
      /*height:100%;*/
      padding: 40px;
      box-sizing: border-box;

      h2 {
        position: relative;
        color: #fff;
        font-size: 24px;
        font-weight: 600;
        letter-spacing: 1px;
        margin-bottom: 40px;

        &:before {
          content: '';
          position: absolute;
          left: 0;
          bottom: -10px;
          width: 80px;
          height: 4px;
          background: #fff;
        }
      }

      .inputBox {
        position: relative;
        width: 100%;
        margin-top: 20px;
        box-sizing: border-box;

        input, .btn {
          width: 100%;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          outline: none;
          padding: 10px 20px;
          border-radius: 35px;
          box-sizing: border-box;
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-right: 1px solid rgba(255, 255, 255, 0.2);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          font-size: 16px;
          letter-spacing: 1px;
          color: #fff;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

          &::placeholder {
            color: #fff;
          }
        }

        .btn {
          background: #fff;
          color: #666;
          max-width: 100px;
          cursor: pointer;
          margin-bottom: 20px;
          font-weight: 600;
        }
      }

      .inputBoxForCheck {
        position: relative;
        width: 160px;
        margin-top: 20px;
        box-sizing: border-box;

        input, .btn {
          width: 100%;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          outline: none;
          padding: 10px 20px;
          border-radius: 35px;
          box-sizing: border-box;
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-right: 1px solid rgba(255, 255, 255, 0.2);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          font-size: 16px;
          letter-spacing: 1px;
          color: #fff;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

          &::placeholder {
            color: #fff;
          }
        }

        .btn {
          background: #fff;
          color: #666;
          max-width: 100px;
          cursor: pointer;
          margin-bottom: 20px;
          font-weight: 600;
        }
      }

    }

    .square {
      position: absolute;
      backdrop-filter: blur(5px);
      box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-right: 1px solid rgba(255, 255, 255, 0.2);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      animation: squareAnime 10s linear infinite;
      animation-delay: calc(-1s * var(--i));

      &:nth-child(1) {
        width: 100px;
        height: 100px;
        top: -50px;
        right: -60px;
      }

      &:nth-child(2) {
        width: 120px;
        height: 120px;
        top: 150px;
        left: -100px;
        z-index: 2;
      }

      &:nth-child(3) {
        width: 80px;
        height: 80px;
        bottom: 50px;
        right: -60px;
        z-index: 2;
      }

      &:nth-child(4) {
        width: 50px;
        height: 50px;
        bottom: -80px;
        left: 100px;
      }

      &:nth-child(5) {
        width: 60px;
        height: 60px;
        top: -80px;
        left: 140px;
      }
    }
  }


}

@keyframes squareAnime {
  0%, 100% {
    transform: translateY(-40px);
  }
  50% {
    transform: translateY(40px);
  }
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
