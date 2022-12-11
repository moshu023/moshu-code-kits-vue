<template>
  <div class='page-content user'>
    <div class="header">
      <div class="left-wrap">
        <img class="avatar" :src="this.avatarUrl" alt="请上传头像"/>
        <h2 style="font-weight: bolder">{{ date }}，{{ this.userInfo.username }}</h2>
        <p>新的一天又开始了</p>
        <div class="task">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconjihuadaichuli"></use>
          </svg>
          <span>未处理（13）</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconshalou"></use>
          </svg>
          <span>处理中（13）</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#iconchuli"></use>
          </svg>
          <span>已处理（13）</span>
        </div>
      </div>
      <div class="right-wrap">
        <img src="@img/icon1.png"/>
      </div>
    </div>

    <div class="info">
      <h1 class="title">基本设置</h1>
      <el-form :model="userInfo" class="form" label-width="86px" label-position="top">
        <el-form-item label="你的昵称" style="font-weight: bolder">
          <el-col :xs="24" :sm="12" :lg="6">
            <el-input v-model="userInfo.username" size="normal" prefix-icon="el-icon-user" :disabled="!isEdit"/>
          </el-col>
        </el-form-item>
        <el-form-item label="你的账号" style="font-weight: bolder">
          <el-col :xs="24" :sm="12" :lg="6">
            <el-input v-model="userInfo.userAccount" size="normal" prefix-icon="el-icon-user" :disabled="!isEdit"/>
          </el-col>
        </el-form-item>
        <el-form-item label="账号密码" style="font-weight: bolder">
          <el-col :xs="24" :sm="12" :lg="6">
            <el-input v-model="userInfo.userPassword" size="normal" prefix-icon="el-icon-lock" :disabled="!isEdit"/>
          </el-col>
        </el-form-item>
        <el-form-item label="邮箱" style="font-weight: bolder">
          <el-col :xs="24" :sm="12" :lg="6">
            <el-input v-model="userInfo.email" size="normal" prefix-icon="el-icon-message" :disabled="!isEdit"/>
          </el-col>
        </el-form-item>
        <el-form-item label="手机" style="font-weight: bolder">
          <el-col :xs="24" :sm="12" :lg="6">
            <el-input v-model="userInfo.phone" size="normal" prefix-icon="el-icon-phone-outline" :disabled="!isEdit"/>
          </el-col>
        </el-form-item>
        <el-form-item label="性别" style="font-weight: bolder">
          <el-radio-group v-model="userInfo.gender" :disabled="!isEdit">
            <el-radio label="MALE"><i class="el-icon-male"> 男</i></el-radio>
            <el-radio label="FEMALE"><i class="el-icon-female"> 女</i></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-edit" @click="edit" v-show="!isEdit">
            编辑信息
          </el-button>
          <el-button type="success" icon="el-icon-document-checked" @click="updateCurrentUser">保存信息</el-button>
          <el-upload
            style="display:inline-block; margin-left: 10px"
            :limit="5"
            action=''
            :http-request="uploadAvatar"
            class="upload-demo"
            :show-file-list="false"
            ref="upload">
            <el-button type="primary" plain icon="el-icon-upload el-icon--right" @click="uploadAvatar">上传头像
            </el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {getCurrentUserInfo, updateCurrentUserInfo, uploadAvatar} from "@/api/userApi";

export default {
  data() {
    return {
      isEdit: false,
      date: '',
      avatarUrl: '',
      userInfo: {
        id: '',
        username: '',
        userAccount: '',
        userPassword: '',
        userStatus: '',
        gender: '',
        email: '',
        phone: ''
      }
    };
  },
  mounted() {
    this.getDate()
  },
  created() {
    this.getCurrentUser()
  },
  methods: {
    // 富文本图片上传前
    beforeUpload(file) {
      let types = ['image/jpeg', 'image/jpg', 'image/gif', 'image/bmp', 'image/png'];
      const isImage = types.includes(file.type);
      const isLtSize = file.size / 1024 / 1024 < 10;
      if (!isImage) {
        this.$message.error('上传图片只能是 JPG、JPEG、gif、bmp、PNG 格式!');
        return false;
      }
      if (!isLtSize) {
        this.$message.error('上传图片大小不能超过 10MB!');
        return false;
      }
      return true;
    },
    uploadAvatar(file) {
      let fd = new FormData()
      fd.append('file', file.file)
      uploadAvatar(fd).then(res => {
        if (res.code === 200) {
          this.avatarUrl = res.data
          this.$message.success(res.description)
        }
      })
    },
    updateCurrentUser() {
      this.isEdit = !this.isEdit
      updateCurrentUserInfo(this.userInfo).then(res => {
        if (res.code === 200) {
          this.$message.success(res.description)
        }
      })
    },
    getCurrentUser() {
      getCurrentUserInfo().then(res => {
        if (res.code === 200) {
          this.userInfo.username = res.data.username
          this.userInfo.userPassword = res.data.userPassword
          this.userInfo.userAccount = res.data.userAccount
          this.userInfo.userStatus = res.data.userStatus
          this.userInfo.gender = res.data.gender
          this.userInfo.phone = res.data.phone
          this.userInfo.email = res.data.email
          this.avatarUrl = res.data.avatarUrl
        }
      })
    },
    getDate() {
      const d = new Date()
      const h = d.getHours()
      let date

      if (h >= 6 && h < 9) {
        date = '早上好'
      } else if (h >= 9 && h < 11) {
        date = '上午好'
      } else if (h >= 11 && h < 13) {
        date = '中午好'
      } else if (h >= 13 && h < 18) {
        date = '下午好'
      } else if (h >= 18 && h < 24) {
        date = '晚上好'
      } else if (h >= 0 && h < 6) {
        date = '很晚了，早点睡'
      }

      this.date = date
    },
    edit() {
      this.isEdit = !this.isEdit
    }
  },
}
</script>

<style lang="scss">
.user {
  .icon {
    width: 1.4em;
    height: 1.4em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
}
</style>

<style lang='scss' scoped>
.page-content {
  width: 100%;
  height: 100%;
  padding: 0 !important;
  background: transparent !important;

  .header {
    background: #fff;
    padding: 30px 40px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;

    .left-wrap {
      .avatar {
        width: 110px;
        height: 110px;
        object-fit: cover;
        border-radius: 50%;
      }

      h2 {
        font-size: 30px;
        margin-top: 20px;
        font-weight: 500;
      }

      p {
        color: #9CA3AE;
        font-size: 14px;
        margin-top: 20px;
        display: none;
      }

      .task {
        margin-top: 30px;
        display: flex;
        align-items: center;

        span {
          color: #9CA3AE;
          font-size: 14px;
          margin-right: 30px;
          margin-left: 8px;
        }
      }
    }

    .right-wrap {
      display: flex;
      align-items: center;

      img {
        width: 230px;
      }
    }
  }

  .info {
    margin-top: 15px;
    background: #fff;

    .title {
      font-size: 22px;
      font-weight: 700;
      padding: 15px 40px;
      border-bottom: 1px solid #eee;
    }

    .form {
      padding: 30px 40px;
      box-sizing: border-box;
    }
  }
}

@media only screen and (max-width: $device-ipad) {
  .page-content {

    .header {
      padding: 20px 20px;

      .left-wrap {
        .avatar {
          width: 90px;
          height: 90px;
        }

        h2 {
          font-size: 20px;
          margin-top: 20px;
        }

        .task {
          margin-top: 15px;

          .icon {
            width: 2.8em;
            height: 2.8em;
            vertical-align: -0.15em;
          }

          span {
            font-size: 15px;
          }
        }
      }

      .right-wrap {
        display: flex;
        align-items: center;

        img {
          display: none;
        }
      }
    }

    .info {

      .title {
        font-size: 18px;
        padding: 15px 20px;
      }

      .form {
        padding: 30px 20px;
      }
    }
  }
}

//button {
//  text-decoration: none;
//  position: absolute;
//  border: none;
//  font-size: 14px;
//  font-family: inherit;
//  color: #fff;
//  width: 9em;
//  height: 2em;
//  line-height: 1em;
//  text-align: center;
//  background: linear-gradient(90deg,#03a9f4,#f441a5,#ffeb3b,#03a9f4);
//  background-size: 300%;
//  border-radius: 30px;
//  z-index: 1;
//}

//button:hover {
//  animation: ani 8s linear infinite;
//  border: none;
//}
//
//@keyframes ani {
//  0% {
//    background-position: 0%;
//  }
//
//  100% {
//    background-position: 400%;
//  }
//}
//
//button:before {
//  content: '';
//  position: absolute;
//  top: -5px;
//  left: -5px;
//  right: -5px;
//  bottom: -5px;
//  z-index: -1;
//  background: linear-gradient(90deg,#03a9f4,#f441a5,#ffeb3b,#03a9f4);
//  background-size: 400%;
//  border-radius: 35px;
//  transition: 1s;
//}
//
//button:hover::before {
//  filter: blur(20px);
//}
//
//button:active {
//  background: linear-gradient(32deg,#03a9f4,#f441a5,#ffeb3b,#03a9f4);
//}
</style>
