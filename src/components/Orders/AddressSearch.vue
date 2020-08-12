<template>
    <div v-if="showSearch" class="addressSearch">
        <div class="search-view" v-if="areaList">
            <div class="search-box">
                <div class="search-box-input">
                    <i class="fa fa-search"></i>
                    <input type="text" placeholder="请输入小区/写字楼/学校等"
                    v-model="search_address"
                    >
                    <button @click="$emit('close')" class="search-box-btn">取消</button>
                </div>
            </div>
            <ul class="search-list">
                <li v-for="(item,index) in areaList" :key="index"
                class="search-row" @click="select_address(item)"
                >
                    <p class="search-row-title">{{item.name}}</p>
                    <p class="search-row-location">{{item.district}}{{item.address}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'order',
    data() {
        return {
            search_address: '',
            areaList: []
        }
    },
    props: {
        showSearch: Boolean
    },
    watch: {
        search_address(val){
            this.searchPlace(val);
        }
    },
    computed: {
        city() {
            if(this.$store.getters.location.addressComponent){
              return (
                this.$store.getters.location.addressComponent.city ||
                this.$store.getters.location.addressComponent.province
              )
            } else {
              return (
                this.$store.getters.location.regeocode.addressComponent.city ||
                this.$store.getters.location.regeocode.addressComponent.province
              )
            }
        }
    },
    methods: {
        searchPlace(val) {
            AMap.plugin('AMap.Autocomplete',() => {
            // 实例化Autocomplete
            var autoOptions = {
                //city 限定城市，默认全国
                city: this.city
            }
            var autoComplete= new AMap.Autocomplete(autoOptions);
            autoComplete.search(val, (status, result) => {
                // 搜索成功时，result即是对应的匹配数据
                    this.areaList = result.tips;
            })
         })
        },
        select_address(item) {
            this.$emit('address_info',item)
        }
    }
}
</script>

<style scoped>
.addressSearch {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 45px;
}
.search-view {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: #fff;
}
.search-box {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.133333vw 3.866667vw 1.866667vw;
}
.search-box-input {
  flex: 1;
  outline: 0;
  color: #999;
  height: 10.466667vw;
  margin-right: 2.666667vw;
  border-radius: 3.533333vw;
  background: #f5f5f5;
  padding: 0 2.133333vw;
  display: flex;
  align-items: center;
  border: none;
}
.search-box-input > input {
  margin-left: 2vw;
  width: 90%;
  background: none;
}
input,
button {
  outline: none;
  border: none;
}
.search-box-btn {
  margin-right: -1vw;
  color: #333;
  border-radius: 11vw;
  width: 14.8vw;
  height: 8.466667vw;
  font-size: 0.9rem;
  white-space: nowrap;
  background-color: #fff;
}

.search-list {
  padding-left: 4vw;
}
.search-row {
  border-bottom: 0.266667vw solid #eee;
  padding: 2.533333vw 0 3.333333vw;
  line-height: 1.2rem;
}
.search-row-title {
  color: #333;
  font-size: 1rem;
}
.search-row-location {
  color: #999;
  font-size: 0.866rem;
}
</style>