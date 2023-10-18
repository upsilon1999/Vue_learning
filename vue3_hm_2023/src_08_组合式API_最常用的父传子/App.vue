<script setup>
//引入子组件
import sonComVue from "./components/son-com.vue"
import {ref} from 'vue'

const money = ref(100)
</script>

<template>
  <!-- 
		1.绑定属性 message 
		给子组件以添加属性的方式传值

		2.传递动态的响应式数据给子组件
	-->
  <sonComVue message="这是消息" :sonMoney="money"></sonComVue>
</template>