<template>
<div :class="{'open': isSort || isScreen}" @click.self="hideView">

    <!-- 导航 -->
    <div v-if="filterData" class="filter_wrap" :class="{'position_filter': position_filter}">
      <aside class="filter">
        <div
          class="filter-nav"
          v-for="(item,index) in filterData.navTab"
          :key="index"
          :class="{'filter-bold':currentFilter==index}"
          @click="filterSort(index)"
        >
          <span>{{item.name}}</span>
          <i v-if="item.icon" :class="'fa fa-'+item.icon"></i>
        </div>
      </aside>
    </div>

  <!-- 排序 -->
    <!-- 排序 -->
    <section class="filter-extend" v-if="isSort">
      <ul>
        <li v-for="(item,index) in filterData.sortBy" :key="index" @click="selectSort(item,index)">
          <span :class="{'selectName':currentSort == index}">{{item.name}}</span>
          <i v-show="currentSort == index" class="fa fa-check"></i>
        </li>
      </ul>
    </section>
    <!-- 筛选 -->
    <section class="filter-extend" v-if="isScreen">
      <div class="filter-sort">
        <div v-for="(screen,index) in filterData.screenBy" :key="index" class="morefilter">
          <p class="title">{{screen.title}}</p>
          <ul>
            <li
              v-for="(item,i) in screen.data"
              :key="i"
              :class="{'selected':item.select}"
              @click="selectScreen(item,screen)"
            >
              <img v-if="item.icon" :src="item.icon" alt>
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="morefilter-btn">
        <span @click="clearFilter" :class="{'edit':edit}" class="morefilter-clear">清空</span>
        <span @click="filterOk" class="morefilter-ok">确定</span>
      </div>
    </section>
</div>
</template>

<script>
export default {
    name: 'FilterView',
    data() {
        return {
            currentFilter: 0,
            isSort: false,   //蒙版是否显示
            currentSort: 0,
            isScreen: false,
            position_filter: false
        }
    },
    props: {
        filterData: Object
    },
    computed: {
      edit(){
        let edit = false;
        this.filterData.screenBy.forEach( screen => {
          screen.data.forEach( item => {
            if(item.select){
              edit = true;
            }
          })
        })
        return edit;
      }
    },
    methods: {
        filterSort(index) {
            this.currentFilter = index; //加粗
            this.position_filter = true;
            switch(index){
                case 0:
                    this.isSort = true;
                    this.$emit('searchFixed',true);
                    break;
                case 1: 
                    this.$emit('updata',{condition:  this.filterData.navTab[1].condition})
                    break;
                case 2: 
                    this.$emit('updata',{condition:  this.filterData.navTab[1].condition})
                    break;
                case 3: 
                    this.isScreen = true;
                    this.isSort = false;
                    this.$emit('searchFixed',true);
                    break;                    
                default: 
                    this.hideView();
                    break;
                
            }
            
        },
        //关闭弹出层
        hideView() {
            this.isSort = false;
            this.isScreen = false;
            this.position_filter = false;
            this.$emit('searchFixed',false);
        },
        selectSort(item,index) {
            this.currentSort = index;
            this.filterData.navTab[0].name = item.name;
            this.hideView();

            //更新数据进行排序
            this.$emit('updata',{condition: item.code})
        },
        selectScreen(item,screen){
          if(screen.id !== 'MPI'){
            screen.data.forEach(element => {
              element.select = false
            });
          }
          item.select = !item.select;
        },
        //清空按钮实现
        clearFilter(){
          this.filterData.screenBy.forEach( screen => {
            screen.data.forEach( item => {
              item.select = false;
            })
         })
        },
        //点击按钮功能实现
        filterOk(){
          let screenData = {
            MPI: '',
            offer: '',
            per: ''
          }
          let mpiStr = '';
          this.filterData.screenBy.forEach( screen => {
            screen.data.forEach( item => {
              if(item.select) {
                if(screen.id !== 'MPI'){
                  //单选
                } else {
                  //多选
                  mpiStr += item.code + ',';
                  screenData[screen.id] = mpiStr;
                }
              }
            })
         })
         this.$emit('updata',{condition: screenData});
         this.hideView();
        }
    }
}
</script>

<style scoped>
.position_filter{
  background: #fff;
  position: fixed;
  top: 3.5em;
  width: 100%;
  z-index: 10;
}
.filter_wrap {
  background: #fff;
}
.filter {
  position: relative;
  border-bottom: 1px solid #ddd;
  line-height: 10.4vw;
  z-index: 101;
  height: 10.666667vw;
  display: flex;
  justify-content: space-around;
}
.filter-nav {
  flex: 1;
  text-align: center;
  color: #666;
  font-size: 0.8333rem;
}
.filter-nav i {
  width: 1.6vw;
  height: 0.8vw;
  margin-left: 1.333333vw;
  margin-bottom: 0.533333vw;
  fill: #333;
  will-change: transform;
}

.filter-bold {
  font-weight: 600;
  color: #333;
}

.open {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  z-index: 3;
}

.filter-extend {
  background-color: #fff;
  color: #333;
  padding-top: 2.133333vw;
  position: absolute;
  width: 100%;
  z-index: 4;
  left: 0;
  top: 24.533333vw;
}
.filter-extend li {
  position: relative;
  padding-left: 5.333333vw;
  line-height: 10.666667vw;
  overflow: hidden;
}
.fa-check {
  float: right;
  color: #009eef;
  margin-right: 3.733333vw;
  line-height: 10.666667vw;
}

.selectName {
  color: #009eef;
}
/* 筛选 */
.filter-sort {
  background: #fff;
  padding: 0 2.666667vw;
  line-height: normal;
}
.morefilter {
  margin: 2.666667vw 0;
  overflow: hidden;
}
.morefilter .title {
  margin-bottom: 2vw;
  color: #666;
  font-size: 0.5rem;
}
.morefilter ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 0.8rem;
}
.morefilter li {
  box-sizing: border-box;
  width: 30%;
  height: 9.333333vw;
  line-height: 9.333333vw;
  margin: 0.8vw 1%;
  background: #fafafa;
}
.morefilter li img {
  width: 3.466667vw;
  height: 3.466667vw;
  vertical-align: middle;
  margin-right: 0.8vw;
}
.morefilter li span {
  margin-left: 2%;
  vertical-align: middle;
}

.morefilter-btn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fafafa;
  box-shadow: 0 -0.266667vw 0.533333vw 0 #ededed;
  line-height: 11.466667vw;
  box-sizing: border-box;
}
.morefilter-btn span {
  font-size: 0.826667rem;
  text-align: center;
  text-decoration: none;
  flex: 1;
}
.morefilter-clear {
  color: #ddd;
  background: #fff;
}
.morefilter-ok {
  color: #fff;
  background: #00d762;
  border: 0.133333vw solid #00d762;
}

.selected {
  color: #3190e8 !important;
  background-color: #edf5ff !important;
}

.edit {
  color: #333 !important;
}
</style>