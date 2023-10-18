<script setup>
import Son1Com from './components/Son1Com.vue';
import Son2Com from './components/Son2Com.vue';
// 需求：获取频道列表并进行渲染
import { useChannelStore } from './store/channel';

const channelStore = useChannelStore()
</script>

<template>
  <div>
		<button @click="channelStore.getList">获取频道数据</button>
		<ul>
			<li 
				v-for="item in channelStore.channelList" 
				:key="item.id"
			> {{ item.name }}</li>
		</ul>
  </div>
</template>

<style scoped>
</style>
