//引入定义store的方法
import { defineStore } from "pinia";
import {ref} from "vue"
import axios from "axios"

export const useChannelStore = defineStore("myChannel",()=>{
	//声明数据 state部分
	const channelList = ref([])

	//声明操作数据的方法 actions部分
	/* 
		同步和异步都按正常的写
	*/
	const getList = async ()=>{
		//支持异步
		const res = await axios.get("http://geek.itheima.net/v1_0/channels")

		console.log(res);
		// 根据后台返回的数据结构拿到需要的数据
		const {data:{data}} = res

		channelList.value = data.channels

	}


	//声明getters


	//return出去
	return {
		channelList,
		getList
	}
})