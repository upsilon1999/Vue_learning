<script setup>
/* 
  watch(
    ref数据项,
    ()=>{要执行的回调},
      {
          immediate:true,  
      }
  )
开启immediate后：
在组件create时或者说刚进入页面时就执行一次回调
由newValue是数据初始值，oldValue是undefined我们可以进一步得知，
执行时机是数据初始化之后

*/
// 导入watch
import { ref, watch } from "vue"
const count = ref(0)
const name = ref("cp")

watch(
  [count, name],
  ([newCount, newName], [oldCount, oldName]) => {
    console.log(`count发生了变化，新值为${[newCount, newName]},老值为${[oldCount, oldName]}`);
  }, {
  immediate: true
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