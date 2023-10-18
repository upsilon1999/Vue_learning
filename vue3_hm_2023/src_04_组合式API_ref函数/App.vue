
<script setup>
// ref 接收简单类型或复杂类型,返回一个响应式的对象

//①导入
import { ref } from "vue"
//②执行函数 传入参数 变量接收
// 相当于设置了一个初始值为 0 的count
const count = ref(0)

/*
  ref响应式实现的本质：
  是在原有传入数据的基础上，外层包了一层对象
  包成了复杂类型之后，再借助reactive实现的响应式

  注意点：
  1.在script脚本中访问数据需要通过 .value，ref数据被包裹成了一个响应式对象，数据在该对象的value属性上
  2.在template中，.value不需要加，因为模板区编译时自己帮我们补上了
*/

// 验证响应式
const setCount = () => {
  // ref数据被包裹成了一个响应式对象，数据在该对象的value属性上
  count.value = count.value + 1
}
</script>

<template>
  <div>
    <!-- 
			reactive响应的对像是个proxy对象
			我们使用的时候直接当做普通对象处理就可以
		-->
    {{count}}
  </div>
  <!-- 事件绑定 -->
  <button @click="setCount">+1</button>
</template>