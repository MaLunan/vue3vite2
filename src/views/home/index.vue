<template>
  <div>
      <div>
          <!-- {{'ma'}} -->
          <Test @myclick='myclick'></Test>
          ma
      </div>
  </div>
</template>

<script>
import {useContext,getCurrentInstance} from 'vue'
import Test from 'com/test/index.vue'
export default{
  components:{
    Test
  },
 setup(){
    const cxt=useContext()
    let cont=getCurrentInstance()
    console.log(cxt)
    const myclick = ()=>{
      console.log('clickTest')
    }
    return {myclick}
 }
}
</script>

<style>

</style>