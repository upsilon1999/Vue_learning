<script setup>
//引入子组件
import sonComVue from "./components/son-com.vue"

//绑定事件
//参数来自子组件注册事件发送的第二个参数
const getMessage = (msg)=>{
	console.log(msg);
}
</script>

<template>
	<!-- 
		1.绑定自定义事件 

		@子组件中注册的事件 = 父组件对应事件
	-->
  <sonComVue @get-message="getMessage"></sonComVue>
</template>