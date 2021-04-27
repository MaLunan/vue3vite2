vue3+vite2 配置 axios router  vuex element 基础搭建    学习中~~~

## vite 
`不支持ie11`

创建项目
```js
npm init @vitejs/app
```
命名：
![image.png](https://upload-images.jianshu.io/upload_images/20151630-a3be1a33cf00f127.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


选择要创建的框架，这里选择vue
![image.png](https://upload-images.jianshu.io/upload_images/20151630-b036259ebc65ab53.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

选择语言 这里用TypeScript或者javaScript都可以
![image.png](https://upload-images.jianshu.io/upload_images/20151630-5be5c8e5df49aeed.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


这样一个vite2+vue3项目就创建完成了
![image.png](https://upload-images.jianshu.io/upload_images/20151630-db9745968ef520f9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

`cd 项目目录`   
`npm install` 
`npm run dev`

成功启动，几乎是秒开

![image.png](https://upload-images.jianshu.io/upload_images/20151630-f95e337d8b686bcd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/20151630-95a634bc06936232.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



##配置路由

要4版本
```js
npm install vue-router@4 -s
```
src/router/index.ts
```js
import {createRouter,createWebHashHistory} from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [{
            path: "/",
            name: "index",
            component: () => import( "@/views/index/index"),
        },
    ]
})

export default router;
```
main.js
```js
//main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App).use(router)
app.mount('#app')
```
## 配置vuex
src/store/index.js

```js
npm install vuex@next --save
```

```js
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state : {
      count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
     actions: {},
    modules: {}
})
export default store
```
main.js
```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
const app = createApp(App).use(router).use(store)
app.mount('#app')
```
vite.config.js配置

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  alias: {
    // 配置路径别名
    '@': path.resolve(__dirname, 'src'),
    'view': path.resolve(__dirname, 'src/view'),
    'com': path.resolve(__dirname, 'src/components'),
    'api': path.resolve(__dirname, 'src/api'),
    'utils': path.resolve(__dirname, 'src/utils'),
  },
  // 引入第三方的配置
  // optimizeDeps: {
  //   include: ["echarts", "axios", ]
  // },
  plugins: [vue()],
  // hostname: '0.0.0.0',
  // port: 8090,
  // 是否自动在浏览器打开
  // open: true,
  // 是否开启 https
  https: false,
  // 服务端渲染
  ssr: false,
  /**
   * 在生产中服务时的基本公共路径。
   * @default '/'
   */
   base: './',
   /**
   * 与“根”相关的目录，构建输出将放在其中。如果目录存在，它将在构建之前被删除。
   * @default 'dist'
   */
  outDir: 'dist',
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      },
    },
  }
})


```
## axios

```js
npm install axios -S
```


## vue3写法

## 变量声明改变，不用在创建data函数，使用reactive声明，比如：

```js
<template>
    <div>{{state.name}}//这里直接使用
</template>

<script>
const state=reactive({name:'malunan'})//直接声明
</script>

```


## emit接收方式一样，触发不一样例如

```js

<script>
import {defineEmit} from 'vue'//获取emit方法
const emit=defineEmit(["myemit"])//定义事件
emit('myemit')//触发emit
</script>

```

## 没有this，通过useContext()获取上下文

```js
import {useContext} from 'vue'
const ctx=useContext()//这里ctx就相当于vue2 的this
```
## 定义输出 父组件通过ref访问

上下文中，有个方法叫`expose({})`接收一个对象

```js
//子组件
<script>
import {useContext} from 'vue'
const ctx=useContext()//这里ctx就相当于vue2 的this
ctx.expose({
  setMetod(){//定义事件
  console.log(myMetod
  )}
})
</script>
```

```js
//父组件
<template>
    <div>
    <el-button @click="cont">dj</el-button>
    <Com ref="hw"></Com>//注册ref
  </div>
</template>
<script setup>
import Com from 'com/com.vue'
import {useContext,ref} from 'vue'
const hw=ref(null)//要和上面对应
const ctx=useContext()
const cont=()=>{
    hw.value.setMetod()//调用方法
}

</script>
```

## ref定义变量 

ref(10)==>本质 reactive(value:10)

`用ref函数创建的数组不能用watch去监听`  主要用来声明普通变量

```js
import {ref} from 'vue'
setup(){
    let cou=ref(0)//定义了一个初始值为0 的变量cou  
}
return {cou}  //在组合api中  想要使用变量  必须要把变量/方法暴漏出去
//通过  cou.value 改变值   原因:本质是reactive({value:0})
```

## reactive定义对象数组


```js
import {reactive} from 'vue'
setup(){
    let cou=reactive({name:'malunan'})//定义了一个初始值为0 的变量cou  
}
return {cou}  //在组合api中  想要使用变量  必须要把变量/方法暴漏出去
```

## 判断是否是ref或者是reactive类型

ref和 reactive 底层是通过  _v_ref来判断的

`isRef`和`isReactive`

通过 import {isRef,isReactive} vue 引入

```
isRef(变量)
isRef(isReactive)
```

## 非递归监听变量创建  shallowRef 和 shallowReactive 创建   （场景：数据量比较大的时候使用）

如果是shallowRef创建的数据。那么vue 监听的是.value的变化，并不是第一层的变化 

## triggerRef(变量)

shallowRef数值变化 主动更新页面  
vue没有提供trigerReactive方法


## twRaw 获取到原始数据

```js
import {reactive,toRaw} from 'vue'
setup(){
    let obj={name:'lnj',age:'18'}
    let state=reactive(obj)//其实这里是被包装后的，虽然指向同一个地址，但vue监听的不一样
    let obj2=toRaw(state)
    obj===obj2//true
    obj===state//false
    //直接改变obj内的变量  不会触发视图更新

    //ref创建获取原始数据
    let state=ref(obj)
    let obj2 =toRaw(state.value)
}
```

如果利用ref将某一个对象中的属性变化成响应式数据。
我们修改的响应式数据，是不会影响到原始数据的

```js
let obj={name:'js'}
let state=ref(obj.name)
state.value='zs'  //改后  obj的数据不会发生变化
```

可以使用toRef变成响应式
### toRef

```js
let obj={name:'js'}
let state=toRef(obj,'name') //这样声明，obj的数据是会发生变化，但视图不会变化
state.value='zs'
```
ref->复制
toRef->引用

### toRefs
多个声明 相当于toRef简写

```js
let obj={name:'js'}
let state=toRefs(obj) //这样声明，obj的数据是会发生变化，但视图不会变化
state.value='zs'
```

## makRow  禁止追踪

使用makRow()的数据，修改后的数据不会被追踪,修改视图后不会更新

## customRef 创建自定义ref  

接收两个参数  track用来追踪  trigger用来触发响应，更新界面

```js
customRef((track,trigger)=>{
    return {
        get(){
            track();//用来追踪
            
        },
        set(newValue){
            //
            trigger();//trigger用来触发响应，更新界面
        }
    }
})
```

## readonly创建只读数据  shallowReadonly创建一层只读数据

```js
let state=readonly({name:'ma'})  //创建一个只读数据

```

```js
let state=readonly({name:'ma'，age:{num:18}})  //创建一个只读数据,name是只读，num不受影响

```

### isReadonly 判断是否是只读数据

```js
isReadonly(state)//返回true或false
```

## Vue.prototype 替换为 config.globalProperties

在 Vue 2 中， Vue.prototype 通常用于添加所有组件都能访问的 property。

在 Vue 3 等同于config.globalProperties。这些 property 将被复制到应用中作为实例化组件的一部分。

```js

// 之前 - Vue 2
Vue.prototype.$http = () => {}
// 之后 - Vue 3
const app = createApp({})
app.config.globalProperties.$http = () => {}

```

## nextTick 在vue3中使用

```js
import { nextTick } from 'vue'

nextTick(() => {
  // 一些和DOM有关的东西
})
```

## 注册组件

```js
// 3.x
import { h, resolveComponent } from 'vue'

export default {
  setup() {
    const ButtonCounter = resolveComponent('button-counter')
    return () => h(ButtonCounter)
  }
}
```

## 支持绑定多个v-model

例如：
```js
<ChildComponent v-model:title="pageTitle" v-model:content="pageContent" />

```
这也可以作为 .sync 修饰符的替代  
.sync作用 子组件更新父组件值 `this.$emit('update:title', pageTitle)` 不用在父组件声明事件



## vuex使用

```js
import {useStore} from 'vuex'
const store=useStore()

//在使用的地方直接使用 相当于  vue2的this.store
store.state.collapse;
store.commit("hadndleCollapse", !collapse);
```

## computed 计算属性使用

```js
import {computed} from 'vue'
setup(){
    let username=computed(()=>{
    let myname = localStorage.getItem("ms_username");
        return myname ? myname : name.value;
    })
}
```
相当于vue2

```js
computed:{
    username(){
        let myname = localStorage.getItem("ms_username");
        return myname ? myname : name.value;
    }
}
```

## router 使用

```js
import {useRouter} from 'vue-router'
let router=useRouter()
//router 就相当于this.router
```

## watch监听

```js
import {watch} from 'vue'
watch(
    ()=>state.count,//要监听的值
    (new,old)=>{
        console.log(new)
        console.log(old)
    }
)
```

多个监听

```js
watch(
    ()=>[state.count,state.title],//要监听的值
    ([newcount,oldcount],[newtitle,oldtitle])=>{
    }
)
```

## onBeforeRouteUpdate 监听路由   watch监听路由已被废弃

```js
onBeforeRouteUpdate((to,from)=>{
            console.log(to,from)
        })
```