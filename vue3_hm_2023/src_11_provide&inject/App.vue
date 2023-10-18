<script setup>
import centerCom from './components/center-com.vue'
import { provide } from "vue"
import { ref } from "vue"
/* 
  provide(①键名,②要传递的数据)
  ①键名 一个标识，在接收处对应
  ②要传递的数据
*/

//1.跨层传递普通数据
provide("big-color", "blue")

//2.跨层传递响应式数据
const count = ref(0)
provide("count", count)
const setCount = () => {
  count.value++
}


//3.跨层传递函数
/* 
  遵循谁的数据谁维护的原则
  顶层组件的数据应该由顶层组件来操作
  所以暴露一个方法给底层组件，当要操作数据时就调用这个方法

  等价于：给底层组件传递可以修改数据的方法
*/
/* 
  provide(①键名,②要传递的方法)
  ①键名 一个标识，在接收处对应
  ②要传递的方法，相当于一个回调，由接收方使用
*/
provide("changeCount", (newCount) => {
  count.value = newCount
})
</script>

<template>
  <h1>我是顶层组件</h1>
  <button @click="setCount">点我加1</button>
  <br>
  <centerCom />
</template>