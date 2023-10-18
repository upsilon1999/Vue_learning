<script setup>
	/* 
		模板引用(可以获取dom，也可以获取组件)
		1.调用ref函数得到ref对象
		2.通过ref标识绑定ref对象 
		3.通过 ref对象.value 即可访问到绑定的元素(前提：必须渲染完之后才能拿到)
	*/
	import sonComVue from './components/son-com.vue'
	import {ref} from "vue"
	//1.调用ref函数得到ref对象
	const sonRef = ref(null) 

	const getCom = ()=>{
		console.log(sonRef.value);
		sonRef.value.say()
	}
</script>

<template>
	<!-- 2.通过ref标识绑定ref对象 -->
  <sonComVue ref=“sonRef”>
		我是子组件的dom标签
	</sonComVue>
	<button @click="getCom">获取组件</button>
</template>