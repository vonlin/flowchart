<!--标准节点属性框模版-->
<template>
    <div class="node-prop-box">
        <h1>{{data.title}}</h1>
    </div>
</template>
<script>
import mixinPropBox from "@/jsplumb/mixinPropBox";
export default {
    name:'standard',
    mixins:[mixinPropBox]
}
</script>
<style scoped>
.node-prop-box{
    position: fixed;
    right:0;
    top:0;
    z-index: 99;
    height: 100%;
    width: 300px;
    background: #eee;
}
</style>


