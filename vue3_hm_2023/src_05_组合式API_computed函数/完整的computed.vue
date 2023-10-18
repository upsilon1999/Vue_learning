<script setup>
import { computed, ref } from "vue"
// computed是具有getter和setter的，具体参照官网的使用
//  API --> 组合式API --> 响应式：核心

/* 
  之前：只读属性的计算属性
*/
const myCount = ref(1)
const getCount = computed(() => count.value + 1)
console.log(getCount.value) // 2
//getCount.value++ // 错误,只读的计算属性不能操作



// 需求：创建一个可写的计算属性 ref
/* 
  计算属性的对象写法，也叫做完整写法，参数是一个对象
  const 计数属性 = computed({
    get:()=>{},
    set:()=>{}
  })
*/
const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1
  }
})
// 可写的计算属性
plusOne.value = 1
console.log(count.value) // 0

/*
  在完整的计算属性中，
  当我们修改计算属性时，set对应的方法就会被调用，计算属性监听的ref数据就会响应式更新
  监听的ref数据修改，同时也会触发get方法，修改计算属性值
*/
</script>

<template>

</template>