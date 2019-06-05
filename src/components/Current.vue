<template>
  <div>
    <!-- <van-button type="default" @click="showFun()">默认按钮</van-button> -->
    <van-nav-bar :title="currentName" @click-left="onClickMenu">
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
    let queryname = this.$route.query.name;
    let isallcate = this.$route.query.isallcate;
    if (isallcate) {
      store.commit("setMenu", true);
    }
    let name = queryname ? queryname : localStorage.getItem("categorys");
    this.$store.commit("setCate", name);
  },
  watch: {
    $route(to, from) {
      /* if (to.path != "/detail") {
        //防止进去过detail页面后sotre里面的id被修改导致回到current页面id错误
        this.getmenus();
      } */
      if (to.path == "/current") {
        //防止进去过detail页面后sotre里面的id被修改导致回到current页面id错误
        this.getmenus();
      }
    }
  },
  mounted() {
    this.getmenus();
  },
  methods: {
    getmenus() {
      let id = this.$route.query.id;
      let name = this.$route.query.name;
      if (name) {
        localStorage.setItem("categorys", name);
        store.commit("setCate", name);
      }
      if (id) {
        store.commit("setId", id);
      } else if (store.getters.getId) {
        id = store.getters.getId;
      } else {
        id = store.getters.getCategorys[0]["_id"];
      }
      services
        .getshowcate({ id: id })
        .then(res => {
          console.log(res);
          let cate = res.data.data.category;
          for (let i = 0; i < cate.length; i++) {
            cate[i]["id"] = i + 1;
            cate[i]["type"] = "button";
            cate[i]["name"] = cate[i]["categoryname"];
            cate[i]["isExpanded"] = true;
            cate[i]["isSelected"] = false;
            cate[i]["catelevel"] = 1;
            let datas = cate[i]["subMenu"];
            for (let j = 0; j < datas.length; j++) {
              datas[j]["type"] = "link";
              datas[j]["id"] = i + 1;
              datas[j]["name"] = datas[j]["title"];
              datas[j]["catelevel"] = 2;
              datas[j]["url"] = `/current/?id=${datas[j]["_id"]}&name=${
                datas[j]["title"]
              }`;
            }
          }
          store.commit("setMenus", cate);
          let showcontent = store.getters.getDetailContent;
          if (showcontent) {
            if (id && name) {
              //切换过category后加载新的第一项数据
              if (cate.length > 0) {
                store.commit("setDetailContent", cate[0]["subMenu"][0]);
              } else {
                let tip = {
                  content: "暂无内容"
                };
                store.commit("setDetailContent", tip);
              }
            } else {
              //显示缓存的数据
              store.commit("setDetailContent", showcontent);
            }
          } else {
            //首次加载直接切换Tabbar默认加载获取数据的第一项
            store.commit("setDetailContent", cate[0]["subMenu"][0]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    showFun() {
      this.$router.push("/detail");
    },
    onClickMenu() {
      store.commit("setMenu", true);
    },
    whenClose() {
      store.commit("setMenu", false);
    }
  },
  computed: {
    menu: {
      get() {
        return store.getters.getMenu;
      },
      set() {
        store.state.menu = false;
      }
    },
    content: {
      get() {
        return store.getters.getDetailContent || {};
      },
      set() {
        store.commit("setDetailContent", this.cate);
      }
    },
    currentName() {
      return this.$store.getters.getCate || "文档";
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
