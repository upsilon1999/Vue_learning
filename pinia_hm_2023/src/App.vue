<script setup>

import { storeToRefs } from 'pinia';
import { useMsgStore} from './store/message';

const msgStore = useMsgStore()

// 直接对pinia的仓库实例结构会使解析出来的数据丢失响应式
// const {count,msg} = msgStore


/* 
	如果希望解构之后，数据仍然保留响应式，需要在解构的时候用storeToRefs方法包裹仓库实例
	const {解构内容} = storeToRefs(仓库实例)
*/
const {count,msg} = storeToRefs(msgStore)

// 解构方法不需要包裹，因为方法无需响应式
const {addCount} = msgStore
</script>

<template>
  <div>
  </div>
</template>

<style scoped>
</style>
