<script setup>
// 注意：由于使用了setup，所以无法直接配置props选项
// 所以:此处需要借助于“编译器宏”函数接收传递的数据
const props = defineProps({
  message: String,
	sonMoney:Number
})

console.log(props);//就是一个对象
/* 
  在script中要访问props里面的属性，只需要 props.xx
  此处的props是我们接收"编译器宏"定义的变量
	
  而在template中直接使用即可
*/
</script>

<template>
  {{message}}
</template>