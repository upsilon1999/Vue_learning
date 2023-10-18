
<script setup>
// reactive 接收一个对象类型的数据，返回一个响应式的对象
//①导入
import { reactive } from "vue"
//②执行函数 传入参数 变量接收
const state = reactive({
  count: 100
})

// 验证响应式
const setCount = () => {
  state.count = state.count + 1
}
</script>

<template>
  <div>
    <!-- 
			reactive响应的对像是个proxy对象
			我们使用的时候直接当做普通对象处理就可以
		-->
    {{state.count}}
  </div>
  <!-- 事件绑定 -->
  <button @click="setCount">+1</button>
</template>