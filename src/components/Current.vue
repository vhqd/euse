<template>
  <div>
    <!-- <van-button type="default" @click="showFun()">默认按钮</van-button> -->
    <van-nav-bar :title="title" @click-left="onClickMenu">
      <van-icon name="wap-nav" slot="left"/>
    </van-nav-bar>
    <van-popup v-model="menu" position="left" :overlay-style="overlayStyle" @close="whenClose">
      <Tree-view></Tree-view>
    </van-popup>
    {{this.$store.getters.getDetailContent}}
  </div>
</template>

<script>
import TreeView from "./TreeView";
import services from "../service/index.js";
export default {
  data() {
    return {
      title: "Jquery Api",
      //menu: this.$store.getters.getMenu,
      overlayStyle: {
        "background-color": "rgba(0, 0, 0, .1)"
      }
    };
  },
  components: {
    TreeView
  },
  mounted() {
   /*  services.testAxios().then(res => {
      if (res.status === 200) {
        //console.log(res);
        //console.log(res.data.links);
      }
    }); */
  },
  methods: {
    showFun() {
      this.$router.push("/detail");
    },
    onClickMenu() {
      this.$store.commit("setMenu", true);
    } ,
    whenClose(){
      this.$store.commit("setMenu",false)
    }
  },
  computed: {
    menu:{
      get() {
        return this.$store.getters.getMenu;
      },
      set() {
        this.$store.state.menu = false;
      }
    }
  } 
};
</script>

<style scoped>
.van-popup {
  width: 65%;
  height: 100%;
  padding-bottom: 1rem;
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); */
}
.van-icon-wap-nav:before {
  font-size: 0.5rem;
}
::-webkit-scrollbar{
    width:2px !important;
    height:0 !important;
    background-color: #61B6EB !important;
}
::-webkit-scrollbar-track{
    background: #213147 !important;
    border-radius:2px !important;
}
::-webkit-scrollbar-thumb{
    background: #61B6EB !important;
    border-radius:2px !important;
}
::-webkit-scrollbar-thumb:hover{
    background: #61B6EB !important;
}
::-webkit-scrollbar-corner{
    background: #61B6EB !important;
}
</style>
