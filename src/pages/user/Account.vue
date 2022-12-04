<template>
  <div class='page-content'>
    <table-bar :showTop="false" :columns="columns" @changeColumn="changeColumn">
      <div slot="top">
        <el-form label-width="70px" ref="userListDTO" :model="form">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="6">
              <el-form-item label="用户ID">
                <el-input placeholder="请输入用户ID" v-model="userListDTO.id" clearable
                          onkeyup="this.value=this.value.replace(/\D|^0/g,'')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6">
              <el-form-item label="用户昵称">
                <el-input placeholder="请输入用户昵称" clearable v-model="userListDTO.username"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6">
              <el-form-item label="用户账号">
                <el-input placeholder="请输入用户账号" clearable v-model="userListDTO.userAccount"></el-input>
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
                <el-input placeholder="请输入用户电话" clearable onkeyup="this.value=this.value.replace(/\D|^0/g,'')"
                          v-model="userListDTO.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6">
              <el-form-item label="邮箱">
                <el-input placeholder="请输入邮箱" clearable v-model="userListDTO.email"></el-input>
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
              <el-button type="primary" @click="getUserList">搜索</el-button>
              <el-button @click="resetForm()">重置</el-button>
            </el-row>
          </el-row>
        </el-form>
      </div>
      <div slot="bottom">
        <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline" plain @click="showDialog('add')">添加用户
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
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="showDialog('edit')">
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
    <el-dialog :title="dialogTitle" width="500px" :visible.sync="dvEdit">
      <el-form ref="form" :model="form" label-width="60px">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="form.dep" placeholder="请选择部门">
            <el-option label="人事部" value="shanghai"></el-option>
            <el-option label="开发部" value="beijing"></el-option>
            <el-option label="测试部" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status"></el-switch>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dvEdit = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getUserList} from "@/api/userApi";

export default {
  data() {
    return {
      dvEdit: false,
      dialogTitle: '',
      form: {
        username: '',
        phone: '',
        email: '',
        sex: 1,
        dep: '',
        status: true
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
      ]
    };
  },
  created() {
    this.getUserList()
  },
  methods: {
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
    },
    deleteAll() {
      this.$confirm('删除[' + this.multipleSelection.length + ']条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var ids = '';
        this.multipleSelection.forEach(row => {
          ids = ids + row.id + ",";
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
      var _this = this;
      _this.tableLoading = true;
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
    showDialog(type) {
      this.dvEdit = true
      this.dialogTitle = type === 'add' ? '新增用户' : '编辑用户'
    },
    onSubmit() {
      this.dvEdit = false
    },
    deleteUser(scope) {
      this.$confirm('您确定要删除当前用户吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.userList.splice(scope.$index, 1)
      }).catch(() => {
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

.moshu-table {
  /* 设置滚动条宽度和高度 */
  >>>.el-table__body-wrapper::-webkit-scrollbar {
    width: 8px; /* 横向滚动条 */
    height: 8px; /* 纵向滚动条 必写 */
  }

  /* 设置滚动条样式 */
  >>> .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #dde;
    border-radius: 3px;
  }
}

</style>
