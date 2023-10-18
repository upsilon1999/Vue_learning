<script setup>
// 导入watch
import { ref, watch } from "vue"
const count = ref(0)
const name = ref("cp")
//调用watch 侦听变化
//一旦监听的ref数据变化，就会执行回调
// 多个侦听，就用列表
watch(
  [count, name],
  ([newCount, newName], [oldCount, oldName]) => {
    console.log(`count发生了变化，新值为${[newCount, newName]},老值为${[oldCount, oldName]}`);
  }
)

const changeCount = () => {
  count.value++
}

const changeName = () => {
  name.value = new Date()
}
</script>

<template>
  <div>{{count}}</div>
  <button @click="changeCount">改数</button>
  <div>{{name}}</div>
  <button @click="changeName">改名</button>
</template>