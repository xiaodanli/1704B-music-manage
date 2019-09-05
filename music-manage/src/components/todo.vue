<template>
    <ul>
        <li v-for="(item,ind) in list">
            <slot :data="item.text">
                {{item.text}}
            </slot>
        </li>
    </ul>
</template>

<script>
export default {
    props:['list'],
    data(){
        return {
        }
    }
}
</script>
