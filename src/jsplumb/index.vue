<template>
  <div class="jce-container" id="jce-container" ref="jceContainer">
    <component :is="componentType"></component>
    <div class="content" :style="cssStyle1">
      <div 
        :class="['workspace' , {isGrid: showGrid}]"
        :style="cssStyle2"
        ref="jce"
      ></div>
    </div>
    <div class="toolbox" v-if="toolbox.length">
      <div 
      v-for="(item,index) in toolbox" :key="index" 
      :class="['item',item]"
      @click="handleToolboxClick(toolBoxList[item])">
      {{toolBoxList[item].name}}
      </div>
    </div>
  </div>
</template>
<script>
import jsplumbMixin from "./mixin.js";
export default {
  name: "jsplumb",
  mixins:[jsplumbMixin],
  data() {
    return {
      cssStyle1:{
        position:'absolute'
      },
      cssStyle2:{
        transform:'scale(1)'
      },
      toolBoxList:{
        selectBox: {type:'selectBox',name:'框选',icon:''},
        grid: {type:'grid',name:'网格',icon:''},
        zoomIn: {type:'zoomIn',name:'放大',icon:''},
        zoomOut: {type:'zoomOut',name:'缩小',icon:''},
        zoomSelect: {type:'zoomSelect',name:'放大',icon:''},
        fullScreen: {type:'fullScreen',name:'全屏',icon:''}
      }
    }
  },
  props:{
      toolbox:{
        type: Array,
        default () {
          // 工具栏 'selectBox','grid','zoomIn','zoomOut','zoomSelect','fullScreen'
          // selectBox ：框选
          // grid ：开启网格
          // zoomIn ：放大
          // zoomOut ：缩小
          // zoomSelect ：放大倍数下拉框
          // fullScreen：开启全屏
          return ['zoomIn','zoomOut','zoomSelect','fullScreen']
        }
      },
      data:{
          type:String,
          default () {
              return ''
          }
      },
      showGrid: {
        type:Boolean,
        default () {
          return true
        }
      }
  },
  methods: {
  },
  mounted() {
    let vm = this
    vm.isGrid = this.toolbox.indexOf('grid') != -1
    $('[ui-draggable]').draggable({
      helper: 'clone',
      scope: 'jce',
      appendTo: '.workspace'
    })
    $('.workspace').droppable({
      scope: 'jce',
      drop: function (event, ui) {
        vm.addNode({
          name: ui.draggable[0].innerHTML,
          type: ui.draggable[0].dataset.type
        },vm.$refs.jce,{x:ui.position.left,y:ui.position.top})
      }
    })
    this.data && this.paintByData(this.data,vm.$refs.jce)
  }
};
</script>
<style scoped>
.jce-container{
    width:100%;
    height:100%;
    left:0;
    top:0;
    position: absolute;
}
.content{
  position: absolute;
  width:100%;
  height:100%;
  background-color:#cecee4;
  top:0;
  left:0;
  overflow:auto;
}
.workspace{
  position: absolute;
  width:100%;
  height:100%;
  top:0;
  left:0;
}
.isGrid{
  background-image: linear-gradient(90deg, rgba(200, 0, 0, 0.15) 10%, rgba(0, 0, 0, 0) 10%),
  linear-gradient(rgba(200, 0, 0, 0.15) 10%, rgba(0, 0, 0, 0) 10%);
  background-size: 10px 10px;
}
.toolbox{
  position: absolute;
  right:0;
  top:0;
  background:#111;
}
.toolbox > div{
  display: inline-block;
  width:40px;
  height:40px;
  line-height: 40px;
  color:aliceblue;
  cursor:pointer;
}

</style>
