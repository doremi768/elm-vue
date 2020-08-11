<template>
  <div class="addAddress">
      <Header :isLeft="true" :title="title"/>
      <!-- 添加地址 -->
      <div class="viewbody">
          <div class="content">
              <formBlock 
              v-model="addressInfo.name" 
              label="联系人" 
              placeholder="姓名" 
              :tags="sexes" 
              @checkTags="checkSex" 
              :selectTag="addressInfo.sex"/>

              <formBlock 
              v-model="addressInfo.phone" 
              type="number" 
              label="电话"
               placeholder="手机号码"
               />
              <formBlock 
              type="text"
              @click="showSearch=true" 
              label="地址" 
              placeholder="小区/写字楼/学校" 
              icon="angle-right" 
              v-model="addressInfo.address"/>

              <formBlock 
              v-model="addressInfo.bottom" 
              label="门牌号" 
              placeholder="2号楼三单元101" 
              icon="edit" 
              textarea="textarea"/>

              <div class="formblock">
                <div class="label-wrap">标签</div>
                <TabTag v-if="tags" :tags="tags" :selectTag="addressInfo.tag" @checkTag="checkTag"/>
              </div> 
          </div>
           <!-- 确定按钮 -->
          <div class="form-button-wrap" @click="handleSave">
            <button class="form-button">确定</button>
          </div>
      </div>
     

      <!-- 搜索地址 -->
      <addressSearch :showSearch="showSearch" @close="showSearch = false" @address_info="address_info"/>
  </div>
</template>

<script>
import Header from '../../components/Headers'
import formBlock from '../../components/Orders/formBlock'
import TabTag from '../../components/Orders/TabTag'
import addressSearch from '../../components/Orders/AddressSearch'
import { Toast } from 'mint-ui';
export default {
    name: 'addAddress',
     data() {
        return {
            title: '',
            tags: ["家","学校","公司"],
            sexes: ["先生","女士"],
            addressInfo: {
              tag: '',
              sex: '',
              address: '',
              name: '',
              phone: '',
              bottom: ''
            },
            showSearch: false,
            value: '',
        }
    },
    components: {
        Header,
        formBlock,
        TabTag,
        addressSearch
    },

    beforeRouteEnter(to, form, next) {
      next(vm => {
        if(to.params.allAddress !== undefined) {
          vm.addressInfo = to.params.allAddress;
          vm.title = to.params.title;
        }
      })
    },
    methods: {
      checkTag(item) {
        this.addressInfo.tag = item;
      },
      checkSex(item) {
        this.addressInfo.sex = item;
      },
      address_info(item) {
        this.addressInfo.address = item.district + item.address;
        this.showSearch = false;
      },
      handleSave(){
        if(!this.addressInfo.name) {
          this.showMsg('请输入联系人')
          return;
        };
        if(!this.addressInfo.phone) {
          this.showMsg('请输入手机号码')
          return;
        };
        if(!this.addressInfo.address) {
          this.showMsg('请输入收货地址')
          return;
        };

        if(this.index > 10) {
          this.showMsg('最多添加十个收货地址')
          return;
        }
        //存储数据
        this.addAddress(); 

      },
      showMsg(msg) {
        Toast({
          message: msg,
          position: 'bottom',
          duration: 5000
        });
      },
      addAddress() {
        let num = 0;
        for(let i = 0; i < 10; i++) {
           let infoTest = localStorage.getItem(`info${i}`);
          if(infoTest !== null) {
            num++ ;
          }
        }
        num++;
        localStorage.setItem(`info${num}`, JSON.stringify(this.addressInfo));
        this.$router.push('/myAddress');
      }
    }
}
</script>

<style scoped>
.addAddress {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 45px;
}
.viewbody {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: #f5f5f5;
}

.content {
  padding-left: 4vw;
  background: #fff;
  font-size: 0.94rem;
}

.formblock {
  background-color: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
}
.formblock .label-wrap {
  flex-basis: 17.333333vw;
  padding: 3.733333vw 0;
  line-height: 4.8vw;
  color: #333;
  font-weight: 700;
}

/* 确定按钮 */
.form-button-wrap {
  padding: 5.333333vw 4vw;
  display: flex;
}
.form-button-wrap .form-button {
  background: #00d762;
  text-align: center;
  border-radius: 0.533333vw;
  flex: 1;
  font-size: 1.1rem;
  line-height: 5.066667vw;
  color: #fff;
  padding: 3.333333vw 0;
  border: none;
  font-weight: 500;
}
</style>