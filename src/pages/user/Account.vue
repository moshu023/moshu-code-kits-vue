<template>
  <div class='page-content'>
    <table-bar :showTop="false" :columns="columns" @changeColumn="changeColumn">
      <div slot="top">
        <el-form label-width="70px" ref="userListDTO" :model="userListDTO">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="6">
              <el-form-item label="用户ID">
                <el-input @keyup.enter.native="getUserList" placeholder="请输入用户ID" v-model="userListDTO.id"
                          clearable
                          onkeyup="this.value=this.value.replace(/\D|^0/g,'')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6">
              <el-form-item label="用户昵称">
                <el-input @keyup.enter.native="getUserList" placeholder="请输入用户昵称" clearable
                          v-model="userListDTO.username"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6">
              <el-form-item label="用户账号">
                <el-input @keyup.enter.native="getUserList" placeholder="请输入用户账号" clearable
                          v-model="userListDTO.userAccount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6">
              <el-form-item label="状态">
                <el-select v-model="userListDTO.userStatus" clearable placeholder="请选择" style="width: 100%">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="6">
              <el-form-item label="电话">
                <el-input @keyup.enter.native="getUserList" placeholder="请输入用户电话" clearable
                          onkeyup="this.value=this.value.replace(/\D|^0/g,'')"
                          v-model="userListDTO.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6">
              <el-form-item label="邮箱">
                <el-input @keyup.enter.native="getUserList" placeholder="请输入邮箱" clearable
                          v-model="userListDTO.email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6">
              <el-form-item label="性别：">
                <el-select v-model="userListDTO.gender" clearable placeholder="请选择" style="width: 100%">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-row :xs="24" :sm="12" :lg="6" style="float: right; margin-right: 10px;">
              <el-button type="primary" @click="getUserList" icon="el-icon-search">搜索</el-button>
              <el-button @click="resetForm" type="info" icon="el-icon-folder-remove">重置</el-button>
            </el-row>
          </el-row>
        </el-form>
      </div>
      <div slot="bottom">
        <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline" plain @click="showDialog()">添加用户
        </el-button>
        <el-button type="danger" size="mini" icon="el-icon-delete" plain :disabled="multipleSelection.length===0"
                   @click="deleteAll">批量删除
        </el-button>
      </div>
    </table-bar>
    <div class="moshu-table" style="width: 100%">
      <el-table :data="userList"
                ref="table"
                stripe
                :loading="tableLoading"
                size="normal"
                @selection-change="handleSelectionChange"
                hight="100%"
                :header-cell-style="{background:'#eee',color:'#606266'}"
                style="width: 100%">
        <el-table-column
          type="selection"
          width="30">
        </el-table-column>
        <el-table-column label="用户ID" width="70" prop="id" v-if="columns[0].show" align="center"/>
        <el-table-column label="用户昵称" width="150" prop="username" v-if="columns[1].show" align="center"/>
        <el-table-column label="用户账号" width="100" prop="userAccount" v-if="columns[2].show" align="center">
          <template slot-scope="scope">
            <el-tag size="mini" type="primary" plain>
              {{ scope.row.userAccount }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="头像" width="70" prop="avatarUrl" v-if="columns[3].show" align="center">
          <template slot-scope="scope">
            <img class="avatar" :src="scope.row.avatarUrl"/>
          </template>
        </el-table-column>
        <el-table-column width="150" label="邮箱" prop="email" v-if="columns[4].show" align="center"/>
        <el-table-column width="150" label="电话" prop="phone" v-if="columns[5].show" align="center"/>
        <el-table-column label="性别" width="50" prop="gender" v-if="columns[5].show" align="center">
          <template slot-scope="scope">
            {{ scope.row.gender === 'MALE' ? '男' : '女' }}
          </template>
        </el-table-column>
        <el-table-column width="100" label="状态" prop="userStatus" v-if="columns[6].show" align="center">
          <template slot-scope="scope">
            <el-tag size="normal" :type="scope.row.userStatus === 'ACTIVE' ? 'success' : 'info'">
              {{ scope.row.userStatus === 'ACTIVE' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建日期" prop="createTime" v-if="columns[7].show" align="center" width="150"/>
        <el-table-column label="修改日期" prop="updateTime" v-if="columns[8].show" align="center" width="150"/>
        <el-table-column label="操作" width="200px" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="showDialog1(scope)">
              编辑
            </el-button>
            <el-button type="danger" size="mini" style="color: #FFF" icon="el-icon-delete" @click="deleteUser(scope)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="display: flex;justify-content: space-between;text-align: left;margin: 10px 2px 2px 66%;">
      <el-pagination
        background
        @size-change="sizeChange"
        :page-size="this.userListDTO.pageSize"
        :current-page="this.userListDTO.currentPage"
        @current-change="currentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>
    <el-dialog :title="dialogTitle" width="500px" :visible.sync="addUser">
      <el-form ref="userForm" :model="userForm" label-width="80px" :rules="rules">
        <el-form-item label="用户昵称">
          <el-input size="normal" v-model="userForm.username" placeholder="若不填写会随机分配，默认以<用户>开头"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="用户账号" prop="userAccount">
          <el-input size="normal" v-model="userForm.userAccount" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="userPassword">
          <el-input size="normal" v-model="userForm.userPassword" clearable></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input size="normal" v-model="userForm.checkPassword" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-radio-group v-model="userForm.gender">
            <el-radio label="MALE" value="MALE">男</el-radio>
            <el-radio label="FEMALE" value="FEMALE">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-radio-group v-model="userForm.userStatus" placeholder="请选择用户状态">
            <el-radio label="ACTIVE" value="ACTIVE">激活</el-radio>
            <el-radio label="INACTIVE" value="INACTIVE">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email" clearable>
          <el-input size="normal" v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="用户电话" prop="phone" clearable>
          <el-input size="normal" v-model="userForm.phone"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelSubmit">取 消</el-button>
        <el-button type="primary" @click="addUserSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="dialogTitle1" width="500px" :visible.sync="editUser">
      <el-form ref="userForm1" :model="userForm1" label-width="80px">
        <el-form-item label="用户昵称">
          <el-input size="normal" v-model="userForm1.username"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="用户账号">
          <el-input size="normal" v-model="userForm1.userAccount" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input size="normal" v-model="userForm1.userPassword" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-radio-group v-model="userForm1.gender">
            <el-radio label="MALE" value="MALE">男</el-radio>
            <el-radio label="FEMALE" value="FEMALE">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-radio-group v-model="userForm1.userStatus" placeholder="请选择用户状态">
            <el-radio label="ACTIVE" value="ACTIVE">激活</el-radio>
            <el-radio label="INACTIVE" value="INACTIVE">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户邮箱" clearable>
          <el-input size="normal" v-model="userForm1.email"></el-input>
        </el-form-item>
        <el-form-item label="用户电话" clearable>
          <el-input size="normal" v-model="userForm1.phone"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelSubmit1">取 消</el-button>
        <el-button type="primary" @click="editUserSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {adminUpdateUser, deleteUser, getUserInfo, getUserList, insertUser} from "@/api/userApi";

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
        callback(new Error('用户密码不能为空'))
      } else if (value.length < 8) {
        callback(new Error('用户密码不能少于 8 位字符'))
      } else if (value !== this.userForm.checkPassword) {

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
      } else if (value !== this.userForm.userPassword) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
    const checkPhone = (rule, value, callback) => {
      const reg = /^1[345789]\d{9}$/
      if (!reg.test(value)) {
        callback(new Error('用户电话格式有误'))
      } else {
        callback()
      }
    }
    const checkEmail = (rule, value, callback) => {
      const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      if (!reg.test(value)) {
        callback(new Error('用户邮箱格式有误'))
      } else {
        callback()
      }
    }
    return {
      addUser: false,
      editUser: false,
      dialogTitle: '新增用户',
      dialogTitle1: '编辑用户',
      userForm: {
        username: '',
        userAccount: '',
        userPassword: '',
        checkPassword: '',
        gender: '',
        userStatus: '',
        email: '',
        phone: ''
      },
      userForm1: {
        id: '',
        username: '',
        userAccount: '',
        userPassword: '',
        gender: '',
        userStatus: '',
        email: '',
        phone: ''
      },
      options: [{
        value: 'MALE',
        label: '男'
      }, {
        value: 'FEMALE',
        label: '女'
      }],
      options1: [{
        value: 'ACTIVE',
        label: '启用'
      }, {
        value: 'INACTIVE',
        label: '禁用'
      }],
      userList: [],
      tableLoading: false,
      multipleSelection: [],
      totalCount: -1,
      userListDTO: {
        id: '',
        username: '',
        userAccount: '',
        avatarUrl: '',
        gender: '',
        isDeleted: '',
        userStatus: '',
        email: '',
        phone: '',
        currentPage: 1,
        pageSize: 10
      },
      columns: [
        {name: "用户ID", show: true},
        {name: "用户昵称", show: true},
        {name: "用户账号", show: true},
        {name: "头像", show: true},
        {name: "邮箱", show: true},
        {name: "电话", show: true},
        {name: "性别", show: true},
        {name: "状态", show: true},
        {name: "创建日期", show: true},
        {name: "修改日期", show: true},
      ],
      rules: {
        userAccount: [{required: true, validator: checkUserAccount, trigger: 'blur'}],
        userPassword: [{required: true, validator: checkUserPassword, trigger: 'blur'}],
        checkPassword: [{required: true, validator: checkCheckPassword, trigger: 'blur'}],
        phone: [{required: true, validator: checkPhone, trigger: 'blur'}],
        email: [{required: true, validator: checkEmail, trigger: 'blur'}]
      }
    };
  },
  created() {
    this.getUserList()
  },
  methods: {
    cancelSubmit() {
      this.addUser = false;
      this.$refs['userForm'].resetFields()
    },
    cancelSubmit1() {
      this.editUser = false;
    },
    resetForm() {
      this.userListDTO.id = ''
      this.userListDTO.username = ''
      this.userListDTO.userAccount = ''
      this.userListDTO.avatarUrl = ''
      this.userListDTO.gender = ''
      this.userListDTO.isDeleted = ''
      this.userListDTO.userStatus = ''
      this.userListDTO.email = ''
      this.userListDTO.phone = ''
      this.getUserList()
    },
    deleteAll() {
      this.$confirm('您将要删除选中的 ' + this.multipleSelection.length + ' 个用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = [];
        this.multipleSelection.forEach(row => {
          ids = ids.concat(row.id);
        })
        this.doDelete(ids);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    doDelete(id) {
      let ids = "[" + id + "]"
      var _this = this;
      _this.tableLoading = true;
      deleteUser(ids).then(res => {
        this.tableLoading = false;
        if (res.code === 200) {
          this.$message.success('您已成功删除用户')
          this.getUserList()
        } else {
          this.$message.error(res.description)
        }
      })
    },
    sizeChange(size) {
      this.userListDTO.pageSize = size;
      this.getUserList();
    },
    //分页操作
    currentChange(page) {
      this.userListDTO.currentPage = page;
      this.getUserList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getUserList() {
      this.tableLoading = true;
      getUserList(this.userListDTO).then(res => {
        this.tableLoading = false;
        if (res.code === 200) {
          this.userList = res.data.records;
          this.totalCount = res.data.total;
          if (this.totalCount === 0) {
            this.$message.info('没有查询到任何数据')
          }
        } else {
          this.$message.error('获取用户列表失败')
        }
      })
    },
    showDialog() {
      this.addUser = true
    },
    showDialog1(scope) {
      getUserInfo(scope.row.id).then(res => {
        if (res.code === 200) {
          this.userForm1.id = res.data.id
          this.userForm1.username = res.data.username
          this.userForm1.userAccount = res.data.userAccount
          this.userForm1.userPassword = res.data.userPassword
          this.userForm1.gender = res.data.gender
          this.userForm1.userStatus = res.data.userStatus
          this.userForm1.email = res.data.email
          this.userForm1.phone = res.data.phone
        } else {
          this.$message.error(res.description)
        }
      })
      this.editUser = true
    },
    addUserSubmit() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          insertUser(this.userForm).then(res => {
            if (res.code === 200) {
              this.addUser = false
              this.$refs['userForm'].resetFields()
              this.$message.success("成功添加用户：" + res.data.username)
              this.userForm.userStatus = ''
              this.userForm.gender = ''
              this.getUserList()
            } else {
              this.$message.error(res.description)
            }
          })
        } else {
          this.$message.error("添加的用户参数有误，请重新输入")
        }
      })
    },
    editUserSubmit() {
      const regAccount = /.*[`~!@#$%^&*()+=|{}':;',\[\].<>/?~！@#￥%……&*()——+|{}【】‘；：”“’。，、？\\]+.*/
      const regPhone = /^1[345789]\d{9}$/
      const regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      if (!this.userForm1.userAccount) {
        this.$message.error('用户账户不能为空')
      } else if (regAccount.test(this.userForm1.userAccount)) {
        this.$message.error('用户账号不能包含特殊字符')
      } else if (this.userForm1.userAccount.length < 4) {
        this.$message.error('用户账户不能少于 4 位字符')
      } else if (!this.userForm1.userPassword) {
        this.$message.error('用户密码不能为空')
      } else if (this.userForm1.userPassword.length < 8) {
        this.$message.error('用户密码不能少于 8 位字符')
      } else if (!regPhone.test(this.userForm1.phone)) {
        this.$message.error('用户电话格式有误')
      } else if (!regEmail.test(this.userForm1.email)) {
        this.$message.error('用户邮箱格式有误')
      }
      else {
        adminUpdateUser(this.userForm1).then(res => {
          if (res.code === 200) {
            this.editUser = false
            this.$message.success("成功修改用户信息")
            this.getUserList()
          } else {
            this.$message.error(res.description)
          }
        })
      }
    },
    deleteUser(scope) {
      this.$confirm('您确定要删除当前用户吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doDelete(scope.row.id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },
    changeColumn(columns) {
      this.columns = columns
      this.$refs.table.doLayout()
    }
  }
}
</script>

<style lang='scss' scoped>
.page-content {
  width: 100%;
  height: 100%;

  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
}

</style>
