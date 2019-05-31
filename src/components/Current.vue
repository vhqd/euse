<template>
  <div>
    <!-- <van-button type="default" @click="showFun()">默认按钮</van-button> -->
    <van-nav-bar :title="title" @click-left="onClickMenu">
      <van-icon name="wap-nav" slot="left"/>
    </van-nav-bar>
    <van-popup v-model="menu" position="left" :overlay-style="overlayStyle" @close="whenClose">
      <Tree-view></Tree-view>
    </van-popup>
    <div v-html="content.content" style="padding:10px 10px 50px 10px"></div>
  </div>
</template>

<script>
import TreeView from "./TreeView";
import services from "../service/index.js";
import store from "../store/store.js";

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
  activated() {
    this.getmenus();
    let id = this.$route.query.id;
    if (!id) {
      return;
    }
    //this.$store.commit("setMenu", true);
  },
  watch: {
    $route() {}
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
    getmenus() {
      let id = this.$route.query.id;
      if (!id) {
        return;
      }
      services
        .getcate({ id: id })
        .then(res => {
          let cate = res.data.data.category;
          for (let i = 0; i < cate.length; i++) {
            cate[i]["id"] = i + 1;
            cate[i]["type"] = "button";
            cate[i]["name"] = cate[i]["categoryname"];
            cate[i]["isExpanded"] = true;
            cate[i]["isSelected"] = false;
            cate[i]["catelevel"] = 1;
            let data = {
              _id: cate[i]._id,
              currentPage: 1,
              pageSize: 99
            };
            services
              .getarticles(data)
              .then(res => {
                let datas = res.data.data.articles;
                for (let j = 0; j < datas.length; j++) {
                  datas[j]["type"] = "link";
                  datas[j]["id"] = i + 1;
                  datas[j]["name"] = datas[j]["title"];
                  datas[j]["catelevel"] = 2;
                  datas[j]["url"] = "/current/tutorial";
                }
                cate[i]["subMenu"] = datas;
              })
              .catch(err => {
                console.log(err);
                this.$message.error("失败", err);
              });
          }
          console.log("==========111==========");
          console.log(cate);
          store.commit("setMenus", cate);
          this.content = this.$store.getters.getDetailContent;
        })
        .catch(err => {});
    },
    showFun() {
      this.$router.push("/detail");
    },
    onClickMenu() {
      this.$store.commit("setMenu", true);
    },
    whenClose() {
      this.$store.commit("setMenu", false);
    }
  },
  computed: {
    menu: {
      get() {
        return this.$store.getters.getMenu;
      },
      set() {
        this.$store.state.menu = false;
      }
    },
    content: {
      get() {
        return store.getters.getDetailContent || {};
      },
      set() {
        store.commit("setDetailContent", menu);
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
::-webkit-scrollbar {
  width: 2px !important;
  height: 0 !important;
  background-color: #61b6eb !important;
}
::-webkit-scrollbar-track {
  background: #213147 !important;
  border-radius: 2px !important;
}
::-webkit-scrollbar-thumb {
  background: #61b6eb !important;
  border-radius: 2px !important;
}
::-webkit-scrollbar-thumb:hover {
  background: #61b6eb !important;
}
::-webkit-scrollbar-corner {
  background: #61b6eb !important;
}
</style>
