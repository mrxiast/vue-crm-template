<template>
  <div>
    <el-row type="flex" justify="space-between">
      <el-col :span="4">
        <div class="h1">全部产品</div>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-plus" @click=" addOneShop">添加</el-button>
      </el-col>
    </el-row>

    <el-table :data="tableData" border style="width: 100%;margin-top:10px;">
      <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
      <el-table-column prop="inPice" label="商品进价" align="center"></el-table-column>
      <el-table-column prop="salePice" label="商品卖价" align="center"></el-table-column>
      <el-table-column prop="type" label="商品类型" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="deleItem(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加商品" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form
        :model="addForm"
        :rules="rules"
        ref="addForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品进价" prop="inPice">
          <el-input v-model="addForm.inPice"></el-input>
        </el-form-item>
        <el-form-item label="商品卖价" prop="salePice">
          <el-input v-model="addForm.salePice"></el-input>
        </el-form-item>
        <el-form-item label="商品类型" prop="type">
          <el-input v-model="addForm.type"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="showDel" width="30%" :before-close="handleClose">
      <span>确定删除此条内容</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDel = false">取 消</el-button>
        <el-button type="primary" @click="isDel">确 定</el-button>
      </span>
    </el-dialog>
    <div style="display:flex;justify-content:flex-end;margin-top:15px;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { add, getList, del, changeItem } from './api'
export default {
  data() {
    return {
      delId: '',
      showDel: false,
      addForm: {
        name: '',
        age: 0,
        sex: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
        inPice: [
          { required: true, message: '请输入商品进价', trigger: 'change' }
        ],
        salePice: [
          { required: true, message: '请输入商品卖价', trigger: 'change' }
        ],
        type: [{ required: true, message: '请输入商品类型', trigger: 'change' }]
      },
      dialogVisible: false,
      tableData: [],
      pageSize: 10,
      pageNum: 1,
      total: 0,
      type: 1 //1是添加2是编辑
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let data = {
        pageSize: this.pageSize,
        pageNum: this.pageNum
      }
      getList(data).then(res => {
        if (res.code === 200) {
          this.tableData = res.data
          this.total = res.total
        }
      })
    },
    addOneShop() {
      this.type = 1
      this.dialogVisible = true
      this.addForm = {}
      this.$refs['addForm'].resetFields()
    },
    handleClick(row) {
      console.log(row)
      this.type = 2
      this.addForm = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true
    },
    handleClose(done) {
      this.dialogVisible = false
    },
    isDel() {
      del({ _id: this.delId }).then(res => {
        console.log(res, 'res')
        if (res.code === 200) {
          this.$message.success('删除成功')
          this.showDel = false
          this.init()
        }
      })
    },
    deleItem(e) {
      this.delId = e._id
      this.showDel = true
    },
    submitAdd() {
      this.$refs['addForm'].validate(valid => {
        if (valid) {
          if (this.type === 1) {
            add(this.addForm).then(res => {
              if (res.code === 200) {
                this.$message.success(res.message)
                this.dialogVisible = false
                this.addForm = {}
                this.$refs['addForm'].resetFields()
                this.init()
              }
            })
          } else {
            changeItem(this.addForm).then(res => {})
          }
        } else {
          return false
        }
      })
    },
    handleCurrentChange(e) {
      this.pageNum = e
      this.init()
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
