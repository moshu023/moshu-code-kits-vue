<template>
  <div class='page-content'>
    <table-bar :showTop="false" :columns="columns" @changeColumn="changeColumn">
      <div slot="top">
        <el-form label-width="55px">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="6">
              <el-form-item label="名称：">
                <el-input placeholder="名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="6">
              <el-form-item label="IP：">
                <el-input placeholder="IP"></el-input>
              </el-form-item>
            </el-col>
            
            <el-row :xs="24" :sm="12" :lg="6" style="float: right; margin-right: 10px;">
              <el-button type="primary">搜索</el-button>
              <el-button>重置</el-button>
            </el-row>
          </el-row>
        </el-form>
      </div>
      <div slot="bottom">
        <el-button type="primary" plain @click="showDialog('add')">新增</el-button>
      </div>
    </table-bar>
    
    <tao-table :data="serverList" :showPage="false" ref="table">
      <el-table-column v-if="columns[0].show" label="名称" prop="name"/>
      <el-table-column v-if="columns[1].show" label="ip" prop="ip"/>
      <el-table-column v-if="columns[2].show" label="端口" prop="port"/>
      <el-table-column v-if="columns[3].show" label="账号" prop="account"/>
      <el-table-column v-if="columns[4].show" label="状态" prop="status">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'info'">
            {{scope.row.status === 1 ? '启用' : '禁用'}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column v-if="columns[5].show" label="创建日期" prop="create_time"/>
      <el-table-column fixed="right" label="操作" width="150px">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="showDialog('edit')">
            编辑
          </el-button>
          <el-button type="text" style="color: #FA6962" icon="el-icon-delete" @click="deleteUser(scope)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </tao-table>

    <el-dialog :title="dialogTitle" width="500px" :visible.sync="dvEdit" top="30vh">
      <el-form ref="form" :model="form" label-width="60px">
        <el-form-item label="名称">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="ip">
          <el-input v-model="form.mibile"></el-input>
        </el-form-item>
        <el-form-item label="端口">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="账号">
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
  export default {
    data () {
      return {
        dvEdit: false,
        dialogTitle: '',
        form: {
          username: '',
          mibile: '',
          email: '',
          sex: 1,
          dep: '',
          status: true
        },
        value: '',
        serverList: [
          {
            name: 'SuperMan',
            ip: '43.133.133.133',
            port: '9000',
            account: 'root',
            status: 1,
            create_time: '2021-1-5'
          }
        ],
        columns: [
          { name: "名称", show: true },
          { name: "IP", show: true },
          { name: "端口", show: true },
          { name: "账号", show: true },
          { name: "状态", show: true },
          { name: "创建日期", show: true }
        ]
      };
    },
    methods: {
      showDialog(type) {
        this.dvEdit = true
        this.dialogTitle = type === 'add' ? '新增' : '编辑'
      },
      onSubmit() {
        this.dvEdit = false
      },
      deleteUser(scope) {
        this.$confirm('您确定要删除当前服务器吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          this.serverList.splice(scope.$index, 1)
        }).catch(() => {})
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
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
</style>