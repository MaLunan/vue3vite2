<template>
  <div>
      <div>
          测试
      </div>
  </div>
</template>

<script>
import {useContext,getCurrentInstance} from 'vue'
export default{
 setup(props,cxt){
    const cxt2=useContext()
    let cont=getCurrentInstance()
    console.log(cxt2.attrs)
    console.log(cont )
    // console.log(cxt===cxt2)//true
 }
}
</script>

<style>

</style>