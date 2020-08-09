<template>
  <div class="addAddress">
      <Header :isLeft="true" :title="title"/>
      <!-- 添加地址 -->
      <div class="viewbody">
          <div class="content">
              <formBlock label="联系人" placeholder="姓名"/>
              <formBlock type="number" label="电话" placeholder="手机号码"/>
              <formBlock label="地址" placeholder="小区/写字楼/学校" 
              icon="angle-right"/>
              <formBlock label="门牌号" placeholder="2号楼三单元101" 
              icon="edit" textarea="textarea"/>
          </div>
          <TabTag :title="title" :tags="tags"/>
      </div>
  </div>
</template>

<script>
import Header from '../../components/Headers'
import formBlock from '../../components/Orders/formBlock'
import TabTag from '../../components/Orders/TabTag'

export default {
    name: 'addAddress',
     data() {
        return {
            title: '新增地址',
            tags: ["家","学校","公司"]
        }
    },
    components: {
        Header,
        formBlock,
        TabTag
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