<script setup>
/* 
  精确侦听对象的某个属性
  需求：在不开启deep的前提下，侦听对象某个属性的变化，只有该属性改变时才执行回调

  语法：
  watch(
    ()=>{
      return 要监听的对象的属性
    },
    ()=>{ 监听的回调 },
    {
      配置项
    }
  )

  优势：和deep相比，可以得到oldValue
*/
// 导入watch
import { ref, watch } from "vue"

const userInfo = ref({
  name: "zs",
  age: 18
})

const changeUserInfo = () => {
  userInfo.value.age++
}

watch(
  () => userInfo.value.age,
  (newVal, oldVal) => {
    console.log("新信息", newVal);
    console.log("旧信息", oldVal);
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