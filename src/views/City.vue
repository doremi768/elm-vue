<template>
  <div class="city">
      <div class="search_wrap">
          <div class="search">
              <i class="fa fa-search"></i>
              <input v-model="city_val" type="text" placeholder="输入城市名">
          </div>
          <button @click="$router.push({name:'address',params:{city: city}})">取消</button>
      </div>
      <div style="height:100%" v-if="searchList.length == 0">
        <Location @click="selectCity({name:city})" :address="city" />
        <Alphabet @selectCity="selectCity" ref="allcity" :cityInfo="cityInfo" :cityHot="cityHot"/>
      </div>
      <div class="search_list" v-else>
          <ul>
              <li @selectCity="selectCity(item)" v-for="(item,index) in searchList" :key="index">
                  {{item}}
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
import Location from '../components/Location'
import citySort from '../tools/sort.js'
import Alphabet from '../components/Alphabet'
export default {
    name: 'city',
    data(){
        return {
            city_val: '',
            cityInfo: [],
            cityHot: ['北京','上海','深圳','成都','南京','长沙'],
            allCities: [],
            searchList: []
        }
    },
    components: {
        Location,
        Alphabet
    },
    computed: {
        city() {
            try{
              return (
                 this.$store.getters.location.addressComponent.city ||
                 this.$store.getters.location.addressComponent.province
                );
            } catch(e){

            }
            
      }
    },
    created() {
        this.getCityInfo();
    },
    watch: {
        city_val(){
            this.searchCity();
        }
    },
    methods: {
        getCityInfo(){
            const self = this;
            AMap.plugin('AMap.DistrictSearch', function () {
                var districtSearch = new AMap.DistrictSearch({
                    // 关键字对应的行政区级别，country表示国家
                    level: 'city',
                    //  显示下级行政区级数，1表示返回下一级行政区
                    subdistrict: 2
                })
                
                // 搜索所有省/直辖市信息
                districtSearch.search('中国', function(status, result) {
                    // 查询成功时，result即为对应的行政区信息
                    self.getCity(result);
                    self.$nextTick(() => {
                        self.$refs.allcity.initScroll()
                    })
                })
            })
        },
        getCity(result){
            let province = result.districtList[0].districtList;
            let city = [];
            let cityArr = [];
            let cityName = new Set();
            for(let i = 0; i < province.length; i++){
                city.push(province[i].districtList);
                for(let j = 0; j <city.length; j++){
                    cityArr.push(city[j]);
                }

            }
            for(let i = 0; i < cityArr.length; i++){
                if(cityArr[i]){
                    for(let j = 0; j < cityArr[i].length; j++){
                    cityName.add(cityArr[i][j].name)
                }
             }
            }
           
           let cityNameArr = Array.from(cityName);
           this.allCities = cityNameArr;
           this.cityInfo = citySort(cityNameArr);
        },
        selectCity(city){
            console.log(1)
            this.$router.push({name: 'address',params:{city:city}})
                console.log(err)
        },
        searchCity(){
            if(!this.city_val){
                this.searchList = [];
            } else {
                this.searchList = this.allCities.filter(item => {
                    return item.indexOf(this.city_val) != -1;
                })
            }
        }
    }
}
</script>

<style scoped>
.city {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}
.search_wrap {
  position: fixed;
  top: 0;
  height: 45px;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 7px 16px;
  display: flex;
  justify-content: space-between;
}
.search {
  background-color: #eee;
  border-radius: 10px;
  line-height: 33px;
  width: 85%;
  box-sizing: border-box;
  padding: 0 16px;
}
.search input {
  background: #eee;
  outline: none;
  border: none;
  margin-left: 5px;
}
.search_wrap button {
  border: none;
  background-color: #fff;
  padding: 0;
  outline: none;
  color: #009eef;
}

.location {
  background: #fff;
  padding: 1px 16px;
  height: 65px;
  box-sizing: border-box;
}

.search_list {
  background: #fff;
  padding: 5px 16px;
}
.search_list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>