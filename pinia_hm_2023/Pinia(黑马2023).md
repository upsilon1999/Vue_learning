# Pinia快速入门(黑马)

## 什么是Pinia

```sh
Pinia是Vue的最新的"状态管理工具",是Vuex的"替代品"
```

>特点

```sh
1.提供更加简单的API(去掉了mutation)

2.提供符合"组合式风格"的API(和Vue3新语法统一)

3.去掉了modules的概念，每一个store都是一个独立的模块
理解：有多个仓库，每个仓库自成一个模块，支持跨仓库(模块)调数据

4.配合TypeScript更加友好，提供可靠的类型推断
```

## 项目中使用Pinia

### 方式一

在实际开发项目的时候，关于Pinia的配置，可以在项目创建时自动添加。

### 方式二

在一个Vue3项目中引入Pinia

>使用Vite创建一个空的Vue3项目

```sh
npm create vue@latest
# 在配置项目中就可以加入Pinia
# 不过我们这次的目的是在项目中途加入
```

>参考Pinia官网集成入项目

```sh
#安装pinia
npm install pinia
```

>在`main.js`创建pinia实例（根store）

初始`main.js`

```js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

引入`pinia`

```js
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
```

## Pinia之Store

### 定义store

#### 官网讲解

在深入研究核心概念之前，我们得知道 Store 是用 `defineStore()` 定义的，它的第一个参数要求是一个**独一无二的**名字：

```js
import { defineStore } from 'pinia'

// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useAlertsStore = defineStore('alerts', {
  // 其他配置...
})
```

这个**名字** ，也被用作 *id* ，是必须传入的， Pinia 将用它来连接 store 和 devtools。为了养成习惯性的用法，将返回的函数命名为 *use...* 是一个符合组合式函数风格的约定。

`defineStore()` 的第二个参数可接受两类值：Setup 函数或 Option 对象。

>Option选项

与 Vue 的选项式 API 类似，我们也可以传入一个带有 `state`、`actions` 与 `getters` 属性的 Option 对象

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      //这里使用this操作state对象里面的值
      this.count++
    },
  },
})
```

你可以认为 `state` 是 store 的数据 (`data`)，`getters` 是 store 的计算属性 (`computed`)，而 `actions` 则是方法 (`methods`)。

为方便上手使用，Option Store 应尽可能直观简单。

>Setup函数

也存在另一种定义 store 的可用语法。与 Vue 组合式 API 的 [setup 函数](https://cn.vuejs.org/api/composition-api-setup.html) 相似，我们可以传入一个函数，该函数定义了一些响应式属性和方法，并且返回一个带有我们想暴露出去的属性和方法的对象。

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
```

在 *Setup Store* 中：

- `ref()` 就是 `state` 属性
- `computed()` 就是 `getters`
- `function()` 就是 `actions`

Setup store 比 [Option Store](https://pinia.vuejs.org/zh/core-concepts/#option-stores) 带来了更多的灵活性，因为你可以在一个 store 内创建侦听器，并自由地使用任何[组合式函数](https://cn.vuejs.org/guide/reusability/composables.html#composables)。

Setup的优势，针对同一功能的state、getters、actions等可以在一块，相当于组合式的优点。

不过，请记住，使用组合式函数会让 [SSR](https://pinia.vuejs.org/zh/cookbook/composables.html) 变得更加复杂。

### 实例讲解

#### 定义store

>在src目录下新建store目录

未来和仓库相关的都会在这个目录下

>store目录下的每个js文件行驶独立的功能，相当于一个个仓库

`counter.js`

```js
//引入定义store的方法
import { defineStore } from "pinia";

import {computed, ref} from "vue"
//定义store
/* 
	defineStore(①，②)
	① 仓库的唯一标识
	② 配置项，选项式就是一个对象，组合式是一个箭头函数

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
})
```

#### 组合式--组件使用pinia

1.引入store暴露出来的模块

```js
//引入模块
import {useCountStore} from '../store/counter'
//获得仓库实例对象
const counterStore = useCountStore()
console.log(counterStore);

//注意，不要对仓库实例对象做解构 -- 会失去响应式
```

2.访问state

```vue
<script setup>
/* 
    访问state：
        得到的仓库对象.属性名
    例如：
        counterStore.count
*/
</script>
<template>
	{{counterStore.count}}
</template>
```

3.访问actions

```vue
<script setup>
/* 
    使用actions
        得到的仓库对象.方法名
    例如：
        counterStore.addCount
*/
</script>
<template>
	<button @click="counterStore.addCount">点我加一</button>
</template>
```

4.访问getter

```vue
<script setup>
/* 
   	访问getter
        得到的仓库对象.属性名
    例如：
        counterStore.double
*/
</script>
<template>
	<p>数的两倍{{counterStore.double}}</p>
</template>
```

## action异步实现

>编写方式

```sh
异步action函数的写法和组件中获取异步数据的写法完全一致
```

### 举例

>仓库书写

`channel.js`

```js
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
```

>使用

```vue
<script setup>
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
```

## storeToRefs方法

### 前置准备

`message.js`

```js
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
```



### 背景

```sh
对于pinia的仓库实例，如果进行解构，会使得解析出来的数据失去响应式
```

```vue
<script setup>

import { useMsgStore} from './store/message';

const msgStore = useMsgStore()

// 直接对pinia的仓库实例结构会使解析出来的数据丢失响应式
const {count,msg} = msgStore


</script>
```

### 方案

```sh
如果希望解构之后，数据仍然保留响应式，需要在解构的时候用storeToRefs方法包裹仓库实例

const {解构内容} = storeToRefs(仓库实例)
```

>举例

```vue
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
</script>
```

### 原理解析

请注意，`store` 是一个用 `reactive` 包装的对象，这意味着不需要在 getters 后面写 `.value`，就像 `setup` 中的 `props` 一样，**如果你写了，我们也不能解构它**：

vue

```js
<script setup>
const store = useCounterStore()
// ❌ 这将不起作用，因为它破坏了响应性
// 这就和直接解构 `props` 一样
const { name, doubleCount } = store 
name // 将始终是 "Eduardo" 
doubleCount // 将始终是 0 
setTimeout(() => {
  store.increment()
}, 1000)
// ✅ 这样写是响应式的
// 💡 当然你也可以直接使用 `store.doubleCount`
const doubleValue = computed(() => store.doubleCount)
</script>
```

为了从 store 中提取属性时保持其响应性，你需要使用 `storeToRefs()`。它将为每一个响应式属性创建引用。当你只使用 store 的状态而不调用任何 action 时，它会非常有用。请注意，你可以直接从 store 中解构 action，因为它们也被绑定到 store 上：

vue

```js
<script setup>
import { storeToRefs } from 'pinia'
const store = useCounterStore()
// `name` 和 `doubleCount` 是响应式的 ref
// 同时通过插件添加的属性也会被提取为 ref
// 并且会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性
const { name, doubleCount } = storeToRefs(store)
// 作为 action 的 increment 可以直接解构
const { increment } = store
</script>
```

### 总结

```sh
1.对于state或getters，为了保持响应式，我们需要借助storeToRefs进行解构
const {解构的state/getters} = storeToRefs(仓库实例)
```

```sh
2.对于actions，方法直接解构就可以，因为方法不存在响应式
const {解构的actions} = 仓库实例
```

具体的使用参考项目情况，看是否需要解构，如果要解构请明确注意事项

>举例

```vue
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
```

## Pinia持久化插件

### 官网介绍

#### 安装

1.用你喜欢的包管理器安装依赖：

```sh
pnpm i pinia-plugin-persistedstate
```

2.将插件添加到 pinia 实例上

```js
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
```

#### 用法

创建 Store 时，将 `persist` 选项设置为 `true`。

> 选项式语法

```ts
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      someState: '你好 pinia',
    }
  },
  persist: true,
})
```

>组合式语法

```ts
import { defineStore } from 'pinia'

export const useStore = defineStore(
  'main',
  () => {
    const someState = ref('你好 pinia')
    return { someState }
  },
  {
    persist: true,
  },
)
```

#### 配置

该插件的默认配置如下:

- 使用 [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) 进行存储

- [`store.$id`](https://pinia.vuejs.org/api/interfaces/pinia.StoreProperties.html) 作为 storage 默认的 key

  ```sh
  store.$id 就是我们定义store时的第一个参数
  ```

  

- 使用 [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)/[`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) 进行序列化/反序列化

- 整个 state 默认将被持久化

如何你不想使用默认的配置，那么你可以将一个对象传递给 Store 的 `persist` 属性来配置持久化。

```ts
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    someState: '你好 pinia',
  }),
  persist: {
    // 在这里进行自定义配置
  },
})
```

##### key

- **类型**：`string`
- **默认值**：`store.$id`

Key 用于引用 storage 中的数据

```js
import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    someState: '你好 pinia',
  }),
  persist: {
    key: 'my-custom-key',
  },
})
//这个 Store 将被持久化存储在 `localStorage` 中的 `my-custom-key` key 中。
```

##### storage

- **类型**：`StorageLike`
- **默认值**：`localStorage`

将数据持久化到的 storage 中，必须具有 `getItem: (key: string) => string | null` 和 `setItem: (key: string, value: string) => void` 两个方法。

```js
import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    someState: '你好 pinia',
  }),
  persist: {
    storage: sessionStorage,
  },
})
//这个 store 将被持久化存储在 sessionStorage中。
```

> 警告

存储数据必须是同步的

##### paths

- **类型**：`string[]`
- **默认值**：`undefined`

用于指定 state 中哪些数据需要被持久化。`[]` 表示不持久化任何状态，`undefined` 或 `null` 表示持久化整个 state。

```js
import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    save: {
      me: 'saved',
      notMe: 'not-saved',
    },
    saveMeToo: 'saved',
  }),
  persist: {
    paths: ['save.me', 'saveMeToo'],
  },
})
//该 store 中, 只有 `save.me` 和 `saveMeToo` 被持久化，而 `save.notMe` 不会被持久化。
```

##### serializer

- **类型**：`Serializer`
- **默认值**：`JSON.stringify/JSON.parse`

该配置能够指定持久化时所使用的序列化方法，以及恢复 Store 时的反序列化方法。另外，必须具有 `serialize: (value: StateTree) => string` 和 `deserialize: (value: string) => StateTree` 方法。

```js
import { defineStore } from 'pinia'
import { parse, stringify } from 'zipson'

export const useStore = defineStore('store', {
  state: () => ({
    someState: '你好 pinia',
  }),
  persist: {
    serializer: {
      deserialize: parse,
      serialize: stringify,
    },
  },
})
//该 store 将使用 zipson 的 stringify/parse 处理序列化/反序列化，并进行压缩。
```

##### beforeRestore

- **类型**：`(context: PiniaPluginContext) => void`
- **默认值**：`undefined`

该 hook 将在从 storage 中恢复数据之前触发，并且它可以访问整个`PiniaPluginContext`，这可用于在恢复数据之前强制地执行特定的操作。

```js
import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    someState: '你好 pinia',
  }),
  persist: {
    beforeRestore: (ctx) => {
      console.log(`即将恢复 '${ctx.store.$id}'`)
    },
  },
})
//该 Store 将会在恢复数据之前输出 即将恢复 'store'
```

> 警告

请谨慎使用 `PiniaPluginContext`，意外可能会出现。

##### afterRestore

- **类型**：`(context: PiniaPluginContext) => void`
- **默认值**：`undefined`

该 hook 将在从 storage 中恢复数据之后触发，并且它可以访问整个`PiniaPluginContext`，这可用于在恢复数据之后强制地执行特定的操作。

```js
import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    someState: '你好 pinia',
  }),
  persist: {
    afterRestore: (ctx) => {
      console.log(`刚刚恢复完 '${ctx.store.$id}'`)
    },
  },
})
//该 Store 将会在恢复数据之后输出 刚刚恢复完 'store'
```

> 警告

请谨慎使用 `PiniaPluginContext`，意外可能会出现。

##### debug

- **类型**：`boolean`
- **默认值**：`false`

当设置为 true 时，持久化/恢复 Store 时可能发生的任何错误都将使用 `console.error` 输出。

### 持久化操作

vuex也有类似的持久化插件，不需要我们自己去配localstorage

>官方文档

```sh
https://prazdevs.github.io/pinia-plugin-persistedstate/zh/
```

>安装插件`pinia-plugin-persistedstate`

```sh
npm i pinia-plugin-persistedstate
```

>`main.js`使用

```js
import persist from "pinia-plugin-persistedstate"
...

app.use(createPinia().use(persist))
```

>store仓库中，`persist:true`开启

### 实际操作

>引入插件

`main.js`

```js
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
```

>给需要持久化的仓库开启插件

```js
defineStore(①，②[,③])
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
```

`count.js`

```js
//引入定义store的方法
import { defineStore } from "pinia";

import {computed, ref} from "vue"
//定义store
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
```



