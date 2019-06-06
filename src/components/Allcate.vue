<template>
  <div class="allcate">
    <van-nav-bar title="所有栏目" left-arrow @click-left="onClickLeft"/>
    <van-tabs @click="onClick">
      <van-tab v-for="(item,index) in category" :title="item.categoryname" :key="index">
        <van-row type="flex">
          <van-col span="6" v-for="(ite,ind) in item.children" :key="ind+'child'">
            <router-link tag="div" class="flexwrapbox" :to="{name:'current',query:{id:currentId,name:name,isallcate:true}}">
            <img
              src="//m.360buyimg.com/mobilecms/s120x120_jfs/t22228/270/207441984/11564/88140ab7/5b03fae3N67f78fe3.png.webp"
              alt
              width="50%"
            >
            <p>{{ite.categoryname}}</p>
            </router-link>
          </van-col>
        </van-row>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import service from "../service";

export default {
  components: {},
  data() {
    return { category: [],currentId:null,name:'', active: 2, tabs: [1, 2, 3, 4] };
  },
  computed: {},
  watch: {},
  methods: {
    onClickDisabled(index, title) {
      console.log(index);
    },
    onClick(index, title) {
      this.currentId = this.category[index]._id;
      this.name = title;
      console.log(title);
      /* this.$toast(title); */
    },
    onScroll(e) {
      console.log(111);
    },
    onClickLeft() {
      this.$router.back(-1);
      this.$router.isBack = false;
      console.log(this.$router.isBack);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$store.commit("updateTabbarShow", false);
    service
      .getallcate()
      .then(res => {
        let datas = res.data.data.category;
        console.log(datas);

        this.category = datas;
        this.currentId = this.category[0]._id;
        this.name = this.category[0].categoryname;
      })
      .catch(err => {
        console.log(err);
      });
  },
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
.flexwrapbox {
  flex-wrap: wrap;
}
.flexwrapbox {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.flexwrapbox {
  padding: 10px;
}
.flexwrapbox p {
  padding-top: 5px;
}
</style>