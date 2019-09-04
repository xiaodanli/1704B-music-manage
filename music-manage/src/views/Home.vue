<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
// import axios from 'axios'
export default {
  name: 'home',
  components: {
    HelloWorld
  },
  created(){
    // axios.post('/api/registry',{username:'oo',password:'1234'}).then(res => {
    //     console.log(res)
    // })
    this.$api.user.login({username:'lixd67',password:'123456'}).then(res=>{
        console.log(res)
    })

    // this.$router.push()  //路由实例

    console.log(this.$router)
  }
}
</script>
