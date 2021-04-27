
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