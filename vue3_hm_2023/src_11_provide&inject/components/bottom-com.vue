<script setup>
import { inject } from "vue"
/* 
  const 变量名 = inject(①键名)
  ①provide设置的键名
  变量接收的是provide的参数②传递的数据
*/
// 1.接收顶层组件传递的普通数据
const myColor = inject("big-color")

// 2.接收响应式数据
const count = inject("count")

// 3.接收顶层传递的方法
/* 
  const 变量名 = inject(①键名)
  ①provide设置的键名
  变量接收的是provide的参数②传递的方法
*/
const changeCount = inject("changeCount")
const setNewCount = () => {
  changeCount(10)
}
</script>

<template>
  <h3>我是底层组件</h3>
  <p>从顶层组件接收到的普通数据{{myColor}}</p>
  <p>接收响应式数据{{count}}</p>
  <button @click="setNewCount">点我修改Count</button>
</template>