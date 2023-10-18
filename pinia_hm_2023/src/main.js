import { createApp } from 'vue'

//引入pinia的创建方法
import {createPinia} from "pinia"

//导入持久化插件
import persist from "pinia-plugin-persistedstate"
import App from './App.vue'

//创建pinia实例
const pinia = createPinia()
//pinia使用持久化插件
// pinia.use(persist)

const app = createApp(App)
app.use(pinia.use(persist))
app.mount("#app")

