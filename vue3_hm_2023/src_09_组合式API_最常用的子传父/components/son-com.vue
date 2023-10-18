<script setup>
//2.通过 defineEmits编译器宏生成emit方法
//defineEmits()的参数是一个数组，可以注册多个事件
const emit = defineEmits(["get-message"])

const sendMsg = () =>{
	//3.触发注册好的自定义事件
	// emit(①事件名，②传递的参数)
	emit("get-message","这会成为父组件对应事件的参数")
}

</script>

<template>
  <button @click="sendMsg">sendMsg</button>
</template>