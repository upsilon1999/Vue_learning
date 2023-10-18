import { defineStore } from "pinia";
import {ref} from "vue"

export const useMsgStore = defineStore("myMsg",()=>{
	const count = ref(0)

	const msg = ref("")

	const addCount = ()=>{
		count.value++
	}
	return {
		count,
		msg,
		addCount
	}
})