<template>
  <div class="area" ref="area_scroll">
      <div class="scroll_wrap">
          <!-- 热门城市 -->
          <div class="hot_wrap">
              <div class="title">热门城市</div>
              <ul class="hot_city">
                  <li v-for="(item,index) in cityHot" :key="index">{{item}}</li>
              </ul>
          </div>

          <!-- 所有城市 -->
          <div class="city_wrap">
              <!-- 循环按字母排序的字母 -->
              <div class="city_content" 
              v-for="(item,index) in cityInfo" :key="index">
                <div class="title">{{item.letter}}</div>
                <!-- 根据字母展示城市名 -->
                <ul>
                    <li v-for="(city,index) in item.data" :key="index">
                        {{city}}
                    </li>
                </ul>
              </div>
          </div>
      </div>
  </div>
</template>
item
<script>
import BScroll from 'better-scroll'
export default {
    name: 'alphabet',
    data(){
        return {
            scroll: null
        }
    },
    props: {
        cityInfo: Array,
        cityHot: Array
    },
    methods: {
        initScroll(){
            this.scroll = new BScroll(this.$refs.area_scroll,{
                click: true
            })
        }
    }
}
</script>

<style scoped>
.area {
  margin-top: 10px;
  box-sizing: border-box;
  padding: 0 16px;
  background: #fff;
  height: calc(100% - 65px);
  overflow: hidden;
}
.scroll_wrap {
  background: #fff;
  overflow: auto;
}
.title {
  color: #aaa;
  padding: 15px 0;
}
.hot_city {
  padding: 0 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.hot_city li {
  width: 30%;
  background: #f1f1f1;
  margin: 0 10px 10px 0;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
}
.city_content li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.area_keys {
  position: fixed;
  right: 0;
  top: 25%;
  color: #aaa;
  font-size: 12px;
  line-height: 1.4;
  text-align: center;
  padding: 0 5px;
}
</style>