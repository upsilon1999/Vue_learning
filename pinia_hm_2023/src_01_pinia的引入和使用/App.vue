<script setup>
	import Son1Com from './components/Son1Com.vue';
	import Son2Com from './components/Son2Com.vue';
	// 引入暴露出来的pinia仓库
	import {useCountStore} from './store/counter'

	/* 
		得到的是一个对象，可以打印查看结构
		注意：
		不要对这个对象做解构，解构会丢失响应式
	*/
	const counterStore = useCountStore()
	console.log(counterStore);

	/* 
		访问state：
			得到的仓库对象.属性名
		例如：
			counterStore.count
	*/

	/* 
		使用actions
			得到的仓库对象.方法名
		例如：
			counterStore.addCount
	*/

	/* 
		访问getter
			得到的仓库对象.属性名
		例如：
			counterStore.double
	*/
</script>

<template>
  <div>
		<h3>App根组件</h3>
		<p>访问仓库里的数据{{counterStore.count}}</p>
		<p>数的两倍{{counterStore.double}}</p>
		<Son1Com></Son1Com>
		<Son2Com></Son2Com>
		<button @click="counterStore.addCount">点我加一</button>
	</div>
</template>

<style scoped>

</style>
