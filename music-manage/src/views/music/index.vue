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
                <el-button>添加</el-button>
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
                        >修改</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        >删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
                <!-- 音乐列表的表格 -->

                <!-- 添加弹窗开始 -->
                <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible"
                    width="30%">
                    
                    <el-form  ref="ruleForm" label-width="100px"  class="demo-ruleForm m-form">
                        <el-form-item label="歌名" prop="username">
                            <el-input ></el-input>
                        </el-form-item>
                        <el-form-item label="歌手" prop="pass">
                            <el-input type="password" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="上传图片" prop="pass">
                            <el-input type="password" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="是否上架" prop="pass">
                            <el-input type="password" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary">添加</el-button>
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
            dialogVisible:true  //控制弹窗的显示隐藏
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
        this.$api.music.querymusic({pagenum:1,limit:2}).then(res => {
            console.log(res);
            if(res.data.code === 1){
                this.musicList = res.data.data;
            }
        })
    },
    methods:{
        ...mapMutations(['setName']),
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
