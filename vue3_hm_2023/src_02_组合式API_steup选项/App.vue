
<script setup>
// 可以使用script setup语法糖对setup选项进行简化
//实际上Vue3底层还是把他转换成了选项式，即底层还是转换成了类

//数据
const msg = "this is message"
//函数
const logMsg = () => {
  console.log(msg);
}
</script>

<template>
  <!-- 使用script抛出的数据与方法 -->
  {{message}}
  <button @click="myLog">
    log msg
  </button>
</template>