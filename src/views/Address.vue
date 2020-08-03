<template>
  <div class="address">
      <Headers :isLeft="true" title="选择收获地址" />
      <div class="city_search">
          <div class="search">
              <span class="city" @click="$router.push('/city')">
                  {{City}}
                  <i class="fa fa-angle-down"></i>
              </span>
              <i class="fa fa-search"></i>
              <input type="text" v-model="search_val" placeholder="小区/写字楼/学校">
          </div>
          <Location :address="address" />
      </div>
      <div class="area">
          <ul class="area_list" v-for="(item,index) in areaList" :key="index">
              <li @click="selectAddress(item)">
                  <h4>{{item.name}}</h4>
                  <p>{{item.district}}{{item.address}}</p>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
import Headers from '../components/Headers'
import Location from '../components/Location'
export default {
    name: 'Address',
    data(){
        return {
            city: '',   //当前的城市
            search_val: '',
            areaList: ''
        }
    },
    components: {
        Headers,
        Location
    },
    computed: {
        City(){
            try{
                this.city = this.$store.getters.location.addressComponent.city;
                return  this.city;
            } catch(e){
                
            }
        },
        address(){
            return this.$store.getters.address;
        }
     },
     watch: {
         search_val() {
             const self = this;
            AMap.plugin('AMap.Autocomplete', function(){
            // 实例化Autocomplete
            var autoOptions = {
                //city 限定城市，默认全国
                city: self.city
            }
            var autoComplete= new AMap.Autocomplete(autoOptions);
            autoComplete.search(self.search_val, function(status, result) {
                // 搜索成功时，result即是对应的匹配数据
                // console.log(result)
                self.areaList = result.tips;
            })
          })
         }
     },
     methods: {
         searchPlace(){
             console.log(this.search_val)
         },
         selectAddress(item){
             //设置地址，并传给首页
             this.$store.dispatch('setAddress',item.district + item.address + item.name);
             //跳转
             this.$router.push('/home')
         }
     }
}
</script>

<style scoped>
.address {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}

.city_search {
  background-color: #fff;
  padding: 10px 20px;
  color: #333;
}

.search {
  background-color: #eee;
  height: 40px;
  border-radius: 10px;
  box-sizing: border-box;
  line-height: 40px;
}
.search .city {
  padding: 0 10px;
}
.city i {
  margin-right: 10px;
}
.search input {
  margin-left: 5px;
  background-color: #eee;
  outline: none;
  border: none;
}

.area {
  margin-top: 16px;
  background: #fff;
}
.area li {
  border-bottom: 1px solid #eee;
  padding: 8px 16px;
  color: #aaa;
}
.area li h4 {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}
</style>