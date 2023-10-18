import { createApp } from 'vue'

//引入pinia的创建方法
import {createPinia} from "pinia"

import App from './App.vue'

//创建pinia实例
const pinia = createPinia()

// 全局挂载pinia
createApp(App).use(pinia).mount('#app')

/* 
	createApp(App).use(pinia).mount('#app')
	这是链式调用的写法

	还可以分开写，可读性高
	const app = createApp(App)
	app.use(pinia)
	app.mount("#app")
*/
