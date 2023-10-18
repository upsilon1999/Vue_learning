<script setup>
/* 
在Vue3中，默认情况下<script setup>语法糖下"组件内部的属性和方法是不开放"给父组件访问的
-- 所以即使用ref拿到了组件也无法访问

 可以通过defineExpose编译宏指定哪些属性和方法允许访问 
*/
const count = 999
const say = ()=>{
	console.log("说你好");
}

//对外暴露
defineExpose({
	count,
	say
})
</script>

<template>
  <p>{{count}}</p>
</template>