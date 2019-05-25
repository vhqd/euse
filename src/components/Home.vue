<template>
  <div>
    <form action="/">
      <van-search v-model="value" show-action @search="onSearch" @cancel="onCancel"/>
    </form>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image">
      </van-swipe-item>
    </van-swipe>

    <van-row type="flex" justify="center" class="lists-box">
      <van-col span="8" class="lists">
        <img
          src="//m.360buyimg.com/mobilecms/s120x120_jfs/t22228/270/207441984/11564/88140ab7/5b03fae3N67f78fe3.png.webp"
          alt
          width="50%"
        >
        <span>JavaScript</span>
      </van-col>
      <van-col span="8" class="lists">
        <img
          src="//m.360buyimg.com/mobilecms/s120x120_jfs/t1/9404/17/15339/4473/5c6fdeb9E665eea5c/893de1d0221540eb.png.webp"
          alt
          width="50%"
        >
        <span>HTML5</span>
      </van-col>
      <van-col span="8" class="lists">
        <img
          src="//m.360buyimg.com/mobilecms/s120x120_jfs/t16990/157/2001547525/17770/a7b93378/5ae01befN2494769f.png.webp"
          alt
          width="50%"
        >
        <span>JavaScript</span>
      </van-col>
    </van-row>
    <van-row type="flex" justify="center" class="lists-box">
      <van-col span="8" class="lists">
        <img
          src="//m.360buyimg.com/mobilecms/s120x120_jfs/t22228/270/207441984/11564/88140ab7/5b03fae3N67f78fe3.png.webp"
          alt
          width="50%"
        >
        <span>JavaScript</span>
      </van-col>
      <van-col span="8" class="lists">
        <img
          src="//m.360buyimg.com/mobilecms/s120x120_jfs/t16990/157/2001547525/17770/a7b93378/5ae01befN2494769f.png.webp"
          alt
          width="50%"
        >
        <span>JavaScript</span>
      </van-col>
      <van-col span="8" class="lists">
        <img
          src="//m.360buyimg.com/mobilecms/s120x120_jfs/t1/9404/17/15339/4473/5c6fdeb9E665eea5c/893de1d0221540eb.png.webp"
          alt
          width="50%"
        >
        <span>HTML5</span>
      </van-col>
    </van-row>
    <p class="new-info">最近更新</p>
    <van-card
      desc="描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息"
      title="标题标题标题标题标题表头不投不投投标不把他"
      thumb="https://img.yzcdn.cn/2.jpg"
    />
    <van-card
      desc="描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息"
      title="标题标题标题标题标题表头不投不投投标不把他"
      thumb="https://img.yzcdn.cn/2.jpg"
    />
    <van-card
      desc="描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息"
      title="标题标题标题标题标题表头不投不投投标不把他"
      thumb="https://img.yzcdn.cn/2.jpg"
    />
    <van-card
      desc="描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息"
      title="标题标题标题标题标题表头不投不投投标不把他"
      thumb="https://img.yzcdn.cn/2.jpg"
    />
    <van-card
      desc="描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息"
      title="标题标题标题标题标题表头不投不投投标不把他"
      thumb="https://img.yzcdn.cn/2.jpg"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      images: [
        "https://img.yzcdn.cn/2.jpg",
        "https://img.yzcdn.cn/2.jpg",
        "https://img.yzcdn.cn/2.jpg"
      ]
    };
  },
  methods: {
    onSearch() {
      this.$toast(this.value);
    },
    onCancel() {
      this.$toast("清除文本框");
    }
  }
};
</script>

<style scoped lang='less'>
.van-swipe {
  height: 3.6rem !important;
}
.lists-box {
  margin-top: 0.15rem;
}
.lists {
  text-align: center;
}
.lists img {
  width: 0.8rem;
  height: 0.8rem;
  align-content: center;
}
.lists span {
  display: block;
}
.van-card__thumb {
  height: 100%;
}
.van-card__content {
  height: auto;
}
.new-info {
  margin: 13px 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  color: #2c3e50;
  font-size: 17px;
  font-weight: bold;
}
</style>