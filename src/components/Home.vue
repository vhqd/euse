<template>
  <div>
    <form action="/">
      <van-search v-model="value" show-action @search="onSearch" @cancel="onCancel"/>
    </form>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image" width="100%">
      </van-swipe-item>
    </van-swipe>

    <van-row type="flex" justify="center" class="lists-box">
      <div v-for="(item,index) in category" :key="index" style="width:100%;">
        <router-link
          tag="div"
          :to="{name:'current',query:{id:item._id,name:item.categoryname}}"
          style="width:100%;height:100%;"
        >
          <van-col span="24" class="lists">
            <img :src="item.imgurl" alt width="50%" class="imgcls">
            <span>{{item.categoryname}}</span>
          </van-col>
        </router-link>
      </div>
    </van-row>
    <van-row type="flex" justify="center" class="lists-box">
      <div v-for="(item,index) in category1" :key="index" style="width:100%;">
        <router-link
          tag="div"
          :to="{name:'current',query:{id:item._id,name:item.categoryname}}"
          style="width:100%;height:100%;"
        >
          <van-col span="24" class="lists">
            <img :src="item.imgurl" alt width="50%" class="imgcls">
            <span>{{item.categoryname}}</span>
          </van-col>
        </router-link>
      </div>
      <router-link tag="div" to="/allcate" style="width:100%;height:100%;">
        <van-col span="24" class="lists">
          <img
            src="http://127.0.0.1:3000/server/public\images\2019-06-06\more.png"
            alt
            width="50%"
            class="imgcls"
          >
          <span>更多</span>
        </van-col>
      </router-link>
    </van-row>
    <div class="article-list">
      <p class="new-info">最近更新</p>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :offset="10"
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
  </div>
</template>

<script>
import service from "../service";
import { getDate } from "./../unitls/base.js";

export default {
  data() {
    return {
      value: "",
      error: false,
      loading: false,
      finished: false,
      category: [],
      category1: [],
      category2: [],
      list: [],
      page: {
        pageSize: 5,
        currentPage: 0
      },
      images: [
        "https://img.yzcdn.cn/2.jpg",
        "https://img.yzcdn.cn/2.jpg",
        "https://img.yzcdn.cn/2.jpg"
      ],
      img: [
        "//m.360buyimg.com/mobilecms/s120x120_jfs/t1/9404/17/15339/4473/5c6fdeb9E665eea5c/893de1d0221540eb.png.webp"
      ]
    };
  },
  methods: {
    onSearch() {
      this.$toast(this.value);
    },
    onCancel() {
      this.$toast("清除文本框");
    },
    onLoad() {
      this.page.currentPage += 1;
      //一共只能请求15条
      if (this.page.currentPage <= 5) {
        this.getNewArticle();
      }
    },
    onRefresh(index) {
      const list = this.list[index];
      setTimeout(() => {
        list.items = [];
        list.error = false;
        list.finished = false;
        list.refreshing = false;
        window.scrollTo(0, 10);
      }, 1000);
    },
    getNewArticle() {
      service
        .newarticle(this.page)
        .then(res => {
          // 加载状态结束
          let list = res.data.data.articles;
          let lent = parseInt(list.length);
          this.loading = false;
          for (let i = 0; i < list.length; i++) {
            this.$set(list[i], "creatat", getDate(list[i].creatat, true));
          }
          if (lent > 0) {
            if (this.list.length == 0) {
              this.list = list;
            } else {
              this.list.push(list[0]);
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
  mounted() {
    service
      .getseccategory()
      .then(res => {
        let datas = res.data.data.category;
        this.$store.commit("setCategorys", datas);
        localStorage.setItem("categorys", datas[0]["categoryname"]);
        console.log(datas);

        this.category = datas.slice(0, 3);
        this.category1 = datas.slice(3, 5);
        this.$store.commit(
          "setCate",
          this.$store.getters.getCategorys[0]["categoryname"]
        );
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped lang='less'>
.van-swipe {
  height: 3.6rem !important;
}
.imgcls {
  border: 0 none;
  border-radius: 10px;
}
.lists-box {
  margin-top: 0.15rem;
}
.van-card {
  box-shadow: 0px 0px 6px rgba(95, 95, 95, 0.1);
  margin: 10px;
  background: #fff;
  padding: 10px 5px;
}
.article-list .van-cell {
  padding: 0 10px 0px;
}
.lists {
  text-align: center;
}
.lists img {
  width: 1rem;
  height: 1rem;
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
.van-card__thumb img {
  height: 1.6rem;
}
.new-info {
  margin: 13px 20px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  color: #2c3e50;
  font-size: 17px;
  font-weight: bold;
}
.article-list {
  padding-bottom: 1rem;
}
.van-card__thumb {
  width: 40%;
}
</style>