<script setup>
	/* 
		模板引用(可以获取dom，也可以获取组件)
		1.调用ref函数得到ref对象
		2.通过ref标识绑定ref对象 
		3.通过 ref对象.value 即可访问到绑定的元素(前提：必须渲染完之后才能拿到)
	*/
	import {ref} from "vue"
	//1.调用ref函数得到ref对象
	const inp = ref(null) 

	//这个打印的时候，组件还没渲染完，所以会是null
	console.log(inp.value);

	// 所以可以使用生命周期钩子获取
	onMounted(()=>{
		console.log(inp.value);
	})

	// 点击事件等事件时也是渲染完了的，因为按钮都有了，自然渲染完了
</script>

<template>
	<!-- 2.通过ref标识绑定ref对象 -->
	<input ref="inp" type="text"/>
</template>