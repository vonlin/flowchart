<template>
  <div class="container" id="container">
    <!-- <div class="left"> -->
      <div 
      v-for="node in nodes"
      :key="node.type" 
      class="drag" 
      ui-draggable :data-type="node.type" 
      ref="drag">{{node.name}}</div>
      <!-- <tree-menu
       :data="treeMenuData"
      ></tree-menu> -->
    <!-- </div> -->
    <div class="right" ref="right">
      <jsplumb 
      showGrid
      :toolbox="['zoomIn','zoomOut','zoomSelect','fullScreen']"
      :data = "initData"
      ></jsplumb>
    </div>
  </div>
</template>
<script>
import treeMenu from '@/treemenu'
import jsplumb from "@/jsplumb/index.vue";
import {testData} from '@/jsplumb/NodeData'
export default {
  name: "jsplumb-demo01",
  components:{jsplumb,treeMenu},
  data() {
    return {
      initData:testData,
      treeMenuData:[
                    {
                        "text": "Same but with checkboxes",
                        "children": [
                            {
                                "text": "initially selected",
                                "selected": true
                            },
                            {
                                "text": "custom icon",
                                "icon": "fa fa-warning icon-state-danger"
                            },
                            {
                                "text": "initially open",
                                "icon": "fa fa-folder icon-state-default",
                                "opened": true,
                                "children": [
                                    {
                                        "text": "Another node"
                                    }
                                ]
                            },
                            {
                                "text": "custom icon",
                                "icon": "fa fa-warning icon-state-warning"
                            },
                            {
                                "text": "disabled node",
                                "icon": "fa fa-check icon-state-success",
                                "disabled": true
                            }
                        ]
                    },
                    {
                        "text": "Same but with checkboxes",
                        "opened": true,
                        "children": [
                            {
                                "text": "initially selected",
                                "selected": true
                            },
                            {
                                "text": "custom icon",
                                "icon": "fa fa-warning icon-state-danger"
                            },
                            {
                                "text": "initially open",
                                "icon": "fa fa-folder icon-state-default",
                                "opened": true,
                                "children": [
                                    {
                                        "text": "Another node"
                                    }
                                ]
                            },
                            {
                                "text": "custom icon",
                                "icon": "fa fa-warning icon-state-warning"
                            },
                            {
                                "text": "disabled node",
                                "icon": "fa fa-check icon-state-success",
                                "disabled": true
                            }
                        ]
                    },
                    {
                        "text": "And wholerow selection"
                    },
                    {
                        "text": "drag disabled",
                        "icon": "fa fa-warning icon-state-danger",
                        "dragDisabled": true
                    },
                    {
                        "text": "drop disabled",
                        "icon": "fa fa-warning icon-state-danger",
                        "dropDisabled": true
                    }
                ],
      nodes:[
        {type:'standard',name:'标准节点'},
        {type:'type_1',name:'类型-1'},
      ]
    }
  },
  methods: {
  },
  mounted() {
  }
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  /* background: rgba(0, 0, 0, 0.1); */
  position: relative;
}
.drag{
  width:100px;
  height:24px;
  margin:10px;
  line-height: 24px;
  background:green;
  cursor: pointer;
}
.drag:hover{
  cursor: pointer;
}
.left{
    width:20%;
    height:100%;
    position: absolute;
    border-right:1px solid orange;
}
.right{
    width:80%;
    height:100%;
    left:20%;
    position: absolute;
}
.item {
  position: absolute;
  height: 80px;
  width: 80px;
  border: 1px solid blue;
}
</style>
