<template>
  <div>
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    我是详情页哦
  </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods: {
        onClickLeft(){
            this.$router.back(-1);
            this.$router.isBack = false;
            console.log(this.$router.isBack);
            
        }
    },
}
</script>
