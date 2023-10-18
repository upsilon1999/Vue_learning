<script setup>
/* 
  组件的生命周期钩子，结合Vue2的进行理解
  从左到右依次为 vue2 --> vue3的选项式 --> vue3的组合式

  beforeCreate/created  => beforeCreate/created => setup
  beforeMount           => beforeMount          => onBeforeMount
  mounted               => mounted              => onMounted
  beforeUpdate          => beforeUpdate         => onBeforeUpdate
  updated               => updated              => onUpdated
  beforeDestroy    			=> beforeUnmount        => onBeforeUnmount
  destroyed             => unmounted            => onUnmounted
*/

import { onMounted } from "vue";

// ① 之前放在 beforeCreate/created中的内容，现在全在setup中
const getList = () => {
  setTimeout(() => {
    console.log("模拟发送请求");
  }, 2000)
}
// 一进入页面就调用,相当于created
getList()


//生命周期演示 -- onMounted
onMounted(() => {
  console.log("以前在mounted里面写什么，就在这写什么");
})

//写成函数的调用方式，可以调用多次
//调用多次并不会冲突，而是按照顺序依次执行
onMounted(() => {
  console.log("我又执行了一次");
})
</script>

<template>
  <div>{{userInfo}}</div>
  <button @click="changeUserInfo">修改用户信息</button>
</template>