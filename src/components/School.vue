<template>
  <div class="demo">
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
    <button @click="showName">点我提示学校名</button>
    <button @click="emitEvent">触发自定义事件</button>
    <button @click="unbind">解绑自定义事件</button>
    <!-- <button @click="sendByBus">利用总线发送数据给Student</button> -->
    <button @click="sendByBus">发送订阅消息</button>
    <button @click="getServerStu">获取服务器学生数据</button>
  </div>
</template>
<script>
import {myMixins,myMixins2} from '../mixin'
import axios from 'axios'
import pubsub from 'pubsub-js'
// export default Vue.extend() 简写为配置对象
export default {
  name: "School", //指定在Vue开发者工具中的组件名
  data() {
    return {
      name: "河南少林寺",
      address: "河南",
    };
  },
  methods: {
    getServerStu(){
      // 第一种代理请求方式
      // axios.get('http://localhost:8080/mock/u/97843174/getStudent').then(response => {
      //   console.log(response.data)
      // })

      // 第二种代理请求方式(需设置前缀以动态设置代理服务器,前缀可被配置清除)
      axios.get('http://localhost:8080/api/mock/u/97843174/getStudent').then(response => {
        console.log(response.data)
      })
    },
    // 触发自定义事件
    emitEvent(){
      console.log("与响应式语句无关的语句") //即使解绑自定义事件(或销毁组件)触发相应事件时该语句仍会触发执行
      this.$emit('getSchoolName',this.name)
    },
    // 解绑自定义事件
    unbind(){
      this.$off('getSchoolName')
      // this.$off(['thing1','thing2']) 解绑多个自定义事件
      // this.$off() //解绑所有自定义事件
    },
    
    //传递数据给同级组件
    sendByBus(){
      //方式一触发全局事件总线的事件
      // this.$bus.$emit("busNews","学校通知给学生了")

      //方式二消息订阅
      pubsub.publish('hello',666)
    }
  },
  mixins: [myMixins,myMixins2],
  beforeMount(){
    console.log('school挂载了')
  }
};
</script>
<style>
.demo {
  background-color: antiquewhite;
}
</style>