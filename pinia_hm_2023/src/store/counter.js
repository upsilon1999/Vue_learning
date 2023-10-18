//引入定义store的方法
import { defineStore } from "pinia";

import {computed, ref} from "vue"
//定义store
/* 
	defineStore(①，②,③)
	① 仓库的唯一标识
	② 配置项，选项式就是一个对象，组合式是一个箭头函数

	如果是选项式，就在参数②里面和state平级建一个 persist键值
	如果是组合式API，就有参数③，参数③也是对象
	③ 持久化插件的配置项
	{
		persist:true/false
	}
	true表示开启持久化，false不开启
	返回值是一个函数，需要接收
*/
export const useCountStore = defineStore("myCounter",()=>{
	//声明数据 state
	const count = ref(0)

	//声明操作数据的方法 actions
	const addCount = ()=>{
		count.value++
	}
	//声明基于数据派生的计算属性 getters
	const double = computed(()=>{
		return count.value*2
	})

	//加入返回值，外部才可访问
	return {
		count,
		addCount,
		double
	}
},{
	persist:true //开启当前模块的持久化
})

