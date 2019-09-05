<template>
    <div>
        <todo :list="list">
            <template slot-scope="{data}">
                <!-- 为待办项自定义一个模板，-->
                <!-- 通过 `slotProps` 定制每个待办项。-->
                <span>小图标</span>
                {{data }}
            </template>
           
        </todo>
    </div>
</template>
<script>
import Todo from '@/components/todo'
export default {
    components:{
        Todo
    },
    data(){
        return {
            list:[
                {
                    text:"待办事项一"
                },
                {
                    text:"待办事项二"
                },
                {
                    text:"待办事项三"
                }
            ]
        }
    }
}
</script>
