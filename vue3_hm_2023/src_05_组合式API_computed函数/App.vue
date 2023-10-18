<script setup>
/* 
  需求：从[1,2,3,4,5,6,7,8]中得到大于2的项组成新数组
*/
// ①导入
import { computed } from 'vue'
import { ref } from "vue"
//const 计算属性 = computed(()=>{
//	return 计算返回的结果
//})

//声明数据
const list = ref([1, 2, 3, 4, 5, 6, 7, 8])

// ②执行函数 变量接收 在回调参数中return计算值
/**
 * computed(参数)
 * 参数是一个函数，就是计算属性的计算逻辑
 */
const computedList = computed(() => {
  return list.value.filter(item => item > 2)
})


// 定义一个修改数组的方法
const addFn = () => {
  list.value.push(666)
}
</script>

<template>
  <div>
    <div>原始数据:{{list}}</div>
    <div>计算后的数据:{{computedList}}</div>

    <button @click="addFn">修改</button>
  </div>
</template>