<template>
  <div class="headers">
      <!-- 左侧返回 -->
      <div class="headers-button is-left" v-show="isLeft">
        <i class="fa fa-chevron-left"></i>
        <button @click="$router.go(-1)">返回</button>
      </div>
      <!-- 中间标题 -->
      <h1 class="headers-title">{{title}}</h1>
  </div>
</template>

<script>
export default {
    name: 'headers',
    props: {
        title: String,
        isLeft: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
.headers {
  align-items: center;
  background-color: #009eef;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  font-size: 16px;
  height: 45px;
  line-height: 1;
  padding: 0 10px;
  position: relative;
  text-align: center;
  white-space: nowrap;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 99;
}

.headers-button button {
  background-color: transparent;
  border: 0;
  box-shadow: none;
  color: inherit;
  display: inline-block;
  padding: 0;
  font-size: inherit;
  outline: none;
}
.headers-title {
  flex: 1;
  margin-right: 40px;
}
.is-left {
  text-align: left;
}
</style>