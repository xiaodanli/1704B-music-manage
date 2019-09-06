<template>
    <el-container>
        <el-header class="m-header">
            <div>
                <span>欢迎：{{username}}</span>
                <el-button size="mini" type="primary" @click="quit">退出</el-button>
            </div>
        </el-header>
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>
                <el-button @click="open">添加</el-button>
                <!-- 音乐列表的表格 -->
                <el-table
                    :data="musicList"
                    style="width: 100%">
                    <el-table-column
                    label="序号"
                    type="index">
                    </el-table-column>
                    <el-table-column
                    label="歌名"
                    prop="music_name">
                    </el-table-column>
                    <el-table-column
                    label="图片">
                    <!-- 作用域插槽 -->
                        <template slot-scope="test">
                            <img :src="test.row.pic" alt="" class="m-img">
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="歌手"
                    prop="singer_name">
                    </el-table-column>
                    <el-table-column
                    label="是否上架">
                        <template slot-scope="scope">
                            <span>{{scope.row.isup ? '是' :'否'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="操作"
                    align="right">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="edit(scope.row.id)"
                        >修改</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="del(scope.row.id)"
                        >删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="limit"
                    @current-change="pageChange"
                    >
                </el-pagination>
                <!-- 音乐列表的表格 -->

                <!-- 添加弹窗开始 -->
                <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible"
                    width="30%">
                    <el-form :model="music"  ref="ruleForm" label-width="100px"  class="demo-ruleForm m-form">
                        <el-form-item label="歌名" prop="music_name">
                            <el-input type="text" v-model="music.music_name"></el-input>
                        </el-form-item>
                        <el-form-item label="歌手" prop="singer_name">
                            <el-input type="text" autocomplete="off" v-model="music.singer_name"></el-input>
                        </el-form-item>
                        <el-form-item label="上传图片" prop="pass">
                            <input type="file" @change="upload" ref="file">
                            <img :src="music.pic" alt="" class="m-img">
                        </el-form-item>
                        <el-form-item label="是否上架" prop="pass">
                            <el-radio-group v-model="music.isup">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="operate">{{editId?'修改':'添加'}}</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
                <!-- 添加弹窗结束 -->
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return {
            musicList: [],      //音乐列表数据
            dialogVisible:false,  //控制弹窗的显示隐藏
            music:{
                music_name:'',
                singer_name:'',
                pic:'',
                isup:'1'
            },
            limit:2, //每页展示的条数
            pagenum:1, //当前页数
            total:0,
            editId:''  //修改对象的id
        }
    },
    created(){
        // 获取用户信息
        this.$api.user.getInfo().then(res => {
            if(res.data.code === 1){
                this.setName(res.data.data.username);
            }
        })
        //获取音乐列表
       this.getMusicList()
    },
    methods:{
        ...mapMutations(['setName']),
        getMusicList(){
             this.$api.music.querymusic({pagenum:this.pagenum,limit:this.limit}).then(res => {
                console.log(res);
                if(res.data.code === 1){
                    this.musicList = res.data.data;
                    this.total = res.data.total;
                }
            })
        },
        quit(){
            this.$confirm('确认退出吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //1.删除token
                //2.跳登录路由
                localStorage.removeItem('token');
                this.$router.push('/login')
            })
        },
        // 上传图片
        upload(e){
            let file = e.target.files[0];
            //1、新建formdata的实例
            let formdata = new FormData();
            //2.添加参数
            formdata.append('file',file);

            //3.请求上传图片的接口
            this.$api.music.upload(formdata).then(res => {
                console.log(res)
                if(res.data.code === 1){
                    this.music.pic = 'http://localhost:3000'+res.data.url;
                    // e.target
                }
            })
        },
        // 打开弹窗
        open(){
            this.reset();
            this.dialogVisible = true;
            if(this.$refs.file && this.$refs.file.files.length){
                this.$refs.file.value="";
            }
        },
        // 添加音乐  修改
        operate(){
            if(this.editId){
                //修改
                this.editMusic();
            }else{
               this.addMusic();
            }
        },
        // 修改音乐
        editMusic(){
            this.$api.music.update(Object.assign({},this.music,{id:this.editId})).then(res => {
                if(res.data.code === 1){
                    this.dialogVisible = false;
                    this.getMusicList();
                }
            })
        },
        //添加音乐接口
        addMusic(){
            this.$api.music.add(this.music).then(res => {
                if(res.data.code === 1){
                    this.dialogVisible = false;
                    this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.getMusicList()
                }
            })
        },
        // 改变页数
        pageChange(val){
            this.pagenum = val;
            this.getMusicList();
        },
        // 删除
        del(id){
            this.$api.music.del({id}).then(res => {
                if(res.data.code === 1){
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    // pagenum === 1 不--
                    this.musicList.length <= 1 && this.pagenum > 1 ? --this.pagenum : this.pagenum;
                    this.getMusicList();
                }
            })
        },
        //重置
        reset(){
            this.music.music_name="";
            this.music.singer_name="";
            this.music.pic="";
            this.music.isup="1";
            this.editId = '';
        },
        // 编辑
        edit(id){
            this.dialogVisible = true;
            this.editId = id;
            let editObj = this.musicList.find(item => item.id === id);
            this.music.music_name = editObj.music_name;
            this.music.singer_name = editObj.singer_name;
            this.music.isup = editObj.isup;
            this.music.pic = editObj.pic;
        }
    },
    computed:{
        ...mapState({
            username:state => state.user.username
        })
    }
}
</script>
<style>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }
    
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
    }
    
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
    }
    
    .m-header{
        text-align: right;
    }

    .m-img{
        width:80px;
        height: 80px;
    }
</style>
