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
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
    created(){
        this.$api.user.getInfo().then(res => {
            if(res.data.code === 1){
                this.setName(res.data.data.username);
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
</style>
