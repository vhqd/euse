<template>
  <div>
    <van-nav-bar
      :title="article.title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      :fixed="true"
    />
    <div class="article-content" v-html="article.content"></div>
  </div>
</template>

<script>
import service from "./../service";

export default {
  data() {
    return {
      article: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
      this.$router.isBack = false;
      console.log(this.$router.isBack);
    },
    getonearticle(id) {
      service
        .getonearticle(id)
        .then(res => {
          this.article = res.data.data.article;
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  activated() {
    let id = this.$route.query.id;
    this.getonearticle({ id: id });
    console.log(id);
  },
  mounted() {
    this.$store.commit("updateTabbarShow", false);
  }
};
</script>

<style scoped>
.article-content {
  padding: 55px 10px 0px 10px;
}
</style>
