<template>
  <div>
    <el-row type="flex" justify="space-between">
      <el-col :span="4">
        <div class="h1">全部产品</div>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">添加</el-button>
      </el-col>
    </el-row>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="姓名" width="120" align="center"></el-table-column>
      <el-table-column prop="age" label="年龄" width="120" align="center"></el-table-column>
      <el-table-column prop="sex" label="性别" width="120" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加商品" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-input v-model="addForm.name" placeholder="输入姓名"></el-input>
      <el-input type="number" v-model="addForm.age" placeholder="输入年龄"></el-input>
      <el-input v-model="addForm.sex" placeholder="输入性别"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { add, getList } from './api'
export default {
  mounted() {
    this.init()
  },
  methods: {
    init() {
      getList().then(res => {
        console.log(res, '')
        if (res.code === 200) {
          this.tableData = res.data
        }
      })
    },
    handleClick(row) {
      console.log(row)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    submitAdd() {
      add(this.addForm).then(res => {
        if (res.code === 200) {
          this.$message.success(res.message)
          this.dialogVisible = false
          this.init()
        }
      })
    }
  },

  data() {
    return {
      addForm: {
        name: '',
        age: 0,
        sex: ''
      },
      dialogVisible: false,
      tableData: []
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
