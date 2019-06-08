<template>
  <div class="catelist">
    <van-nav-bar title="文章列表" left-arrow @click-left="onClickLeft"/>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="10"
      style="padding-bottom:1rem;"
    >
      <div v-for="(item,index) in list" :key="index">
        <router-link :to="{name:'detail',query:{id:item._id}}">
          <van-cell>
            <van-card
              :price="item.creatat"
              currency="日期:"
              :desc="item.desc"
              :title="item.title"
              :thumb="item.imgurl"
            />
          </van-cell>
        </router-link>
      </div>
    </van-list>
  </div>
</template>

<script>
import service from "../service";
import { getDate } from "./../unitls/base.js";

export default {
  components: {},
  data() {
    return {
      loading: false,
      finished: false,
      page: {
        pageSize: 5,
        currentPage: 0,
        totalSize:0
      },
       list: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    onClickLeft() {
      this.$router.back(-1);
      this.$router.isBack = false;
      console.log(this.$router.isBack);
    },
    onLoad() {
       this.page.currentPage += 1;
       console.log("页面："+this.page.currentPage);
       console.log(this.list.length);
       console.log(this.page.totalSize);
      if (this.list.length <= this.page.totalSize) {
        this.getNewArticle();
      }
    },
    getNewArticle() {
      service
        .newarticle(this.page)
        .then(res => {
          // 加载状态结束
          let list = res.data.data.articles;
          this.page.totalSize = res.data.page.totalSize;
          let lent = parseInt(list.length);
          this.loading = false;
          for (let i = 0; i < list.length; i++) {
            this.$set(list[i], "creatat", getDate(list[i].creatat, true));
          }
          if (lent > 0) {
            if (this.list.length == 0) {
              this.list = list;
            } else {
              console.log(this.list);
              list.forEach(v => {
                this.list.push(v);
              });
            }
            // 数据全部加载完成
          } else {
            this.finished = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
</style>