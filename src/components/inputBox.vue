<template>
  <div class="input_box">
       <div class="input_group" :class="{'is-invalid': error}">
           <!-- 输入框 -->
           <input 
           :type="type"
           :value="value"
           :placeholder="placeholder"
           :name="name"
           @input="$emit('input',$event.target.value)"
           >
             <!-- 输入框后面的按钮 -->
            <button 
            class="get_vd"
            v-if="btnTitle" :disabled="disabled" 
            @click="$emit('btnClick')"
            >{{btnTitle}}</button>
       </div>

     
       <!-- 错误提醒 -->
       <div v-if="error" class="invalid-feedback">{{error}}</div>
  </div>
</template>

<script>
export default {
    name: 'input_box',
    props: {
        type: {
            type: String,
            default: 'text'
        },
        value:String,
        placeholder: String,
        name: String,
        btnTitle: String,
        disabled: Boolean,
        error: String
    }
}
</script>

<style scoped>
.input_box{
    margin-top: 20px;
}
.input_group {
  position: relative;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
}
.input_group input {
  height: 100%;
  width: 60%;
  outline: none;
  border: none;
}
.input_group button {
  border: none;
  outline: none;
  background: #fff;
}

.get_vd{
    position: absolute;
    right: 0;
    top: 0;
    transform: translateY(45%);
    background-color: #fff;
    border:none;
}

.input_group button[disabled] {
  color: #aaa;
}
.is-invalid {
  border: 1px solid red;
}
.invalid-feedback {
  color: red;
  padding-top: 5px;
}
</style>
