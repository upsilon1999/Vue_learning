<script setup>
// 导入watch
import { ref, watch } from "vue"
const count = ref(0)

//调用watch 侦听变化
//一旦监听的ref数据变化，就会执行回调
watch(
  count,
  (newValue, oldValue) => {
    console.log(`count发生了变化，老值为${oldValue},新值为${newValue}`);
  }
)
</script>

<template>

</template>