<script setup>
import MyInput from "@/components/MyInput.vue"
import NewInput from "@/components/NewInput.vue"
import { ref } from "vue"
const txt = ref("123456")
</script>

<template>
  <!-- 组件内使用早期的v-model接收法 -->
  <MyInput v-model="txt"></MyInput>
  {{txt}}
  <!-- 使用新式API -- defineModel -->
  <NewInput v-model="txt"></NewInput>
</template>