<script setup>
// 因为他还处于试验性质，所以需要导入
// 同时需要在vue.config.js中进行配置
import { defineModel } from "vue"
// 使用defineModel得到v-model绑定值的ref响应式对象
const modelValue = defineModel()

</script>

<template>
  <input type="text" :value="modelValue" @input="e => modelValue=e.target.value">
</template>