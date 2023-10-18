<script setup>
/* 
  deep 深度监视，默认watch进行的是浅层监视
  ## 浅层监视
  const 数据ref = ref(简单类型)  可以直接监视
  const 数据ref2 = ref(复杂类型)  监视不到复杂数据类型内部的变化

*/
// 导入watch
import { ref, watch } from "vue"
const count = ref(0)

const userInfo = ref({
  name: "zs",
  age: 18
})

const changeUserInfo = () => {
  // 这相当于一个新对象，地址变了
  // 整个userInfo都发生了改变,这样就可以用浅拷贝监听
  // userInfo.value = {name:"李四",age:20}

  // 修改userInfo的一部分，地址没有发生改变
  // 不开启深层监听无法进行监听
  userInfo.value.age++
}

watch(
  userInfo,
  (newVal, oldVal) => {
    console.log("新信息", newVal);
    console.log("旧信息", oldVal);
  },
  {
    //开启深度监听
    deep: true
  }
)

/* 
  deep监听的缺陷：
  无法获取到 oldVal
  获取到的oldVal和newVal一样
*/
</script>

<template>
  <div>{{userInfo}}</div>
  <button @click="changeUserInfo">修改用户信息</button>
</template>