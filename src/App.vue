<template>
  <div id="app">
    <transition :name="transitionName">
      <!-- <keep-alive :include="keepAlive"> -->
      <keep-alive>
        <router-view class="Router" :style="{transition: 'all '+transitionTime+'s ease'}"></router-view>
      </keep-alive>
    </transition>

    <van-tabbar v-model="active" v-if="tabbarShow">
      <van-tabbar-item icon="fire" @click="toHome()">主页</van-tabbar-item>
      <van-tabbar-item icon="smile-comment" @click="toCurrent()">Javascript</van-tabbar-item>
      <van-tabbar-item icon="manager" @click="toMe()">关于</van-tabbar-item>
      <!-- <van-tabbar-item icon="smile-comment" dot @click="toCurrent()">Javascript</van-tabbar-item>
      <van-tabbar-item icon="manager" info="20" @click="toMe()">我</van-tabbar-item>-->
      <!-- <van-tabbar-item icon="friends-o" info="5" @click="toFriend()">朋友</van-tabbar-item> -->
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      active: 0,
      transitionTime: .3, //Tabbar切换页面时不使用动画
      times: .3,
      /* keepAlive: "home", //需要缓存的页面 例如首页 */
      transitionName: "slide-right" //初始过渡动画方向
    };
  },
  methods: {
    toHome() {
      this.$router.replace({ path: "/home" });
    },
    toCurrent() {
      this.$router.replace({ path: "/current" });
    },
    toFriend() {
      this.$router.replace({ path: "/friend" });
    },
    toMe() {
      this.$router.replace({ path: "/me" });
    },
    /**
     * 避免切换Tabbar之后，如果执行刷新页面active会初始为0
     * 导致在其他页面Tabbar都是选中第一项的问题
     */
    initRefresh() {
      let thisPath = this.$route.path;
      let tabbarPath = this.$store.getters.getTabbarPath;
      let thisIndex = tabbarPath.indexOf(thisPath);
      if (thisIndex >= 0) {
        if (thisIndex == 0 || thisIndex == 1) {
          this.active = 0;
        } else {
          this.active = thisIndex - 1;
        }
      }
    }
  },
  mounted() {
    this.initRefresh();
    let path = this.$route.path;
    if (path == "/" || path == "/index" || path == "/home") {
      this.active = 0;
    }
    if (path == "/current") {
      this.active = 1;
    }
    if (path == "/me") {
      this.active = 2;
    }
  },
  watch: {
    $route(to, from) {
      this.initRefresh();
      console.log(to.path);
      let path = to.path;
      // 切换动画
      let isBack = this.$router.isBack; // 监听路由变化时的状态为前进还是后退
      //console.log(this.$router);
      //console.log(this.$router.isBack);

      //判断是否显示tabbar和页面显示动画时间
      if (
        path == "/" ||
        path == "/index" ||
        path == "/home" ||
        path == "/current" ||
        path == "/friend" ||
        path == "/me"
      ) {
        this.$store.commit("updateTabbarShow", true);
        /* if(isBack){//Tabbar切换没有动画其他页面切换和返回均有动画
          this.transitionTime = this.times;
        }else{
          this.transitionTime = 0 ;
        }  */
      } else {
        this.$store.commit("updateTabbarShow", false);
        //this.transitionTime = this.times;
      }

      if (isBack) {
        this.transitionName = "fade";
      } else {
        this.transitionName = "fade";
      }
      this.$router.isBack = false;
    }
  },
  computed: {
    tabbarShow() {
      return this.$store.getters.getTabbarShow;
    }
  }
};
</script>

<style scoped lang='scss'>
#app {
  .Router {
    position: absolute;
    width: 100%;
    height: 100%;
    /* transition: all 0.377s ease; */
    will-change: transform;
    top: -0.01rem;
    backface-visibility: hidden;
    perspective: 1000;
  }
  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.1s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
