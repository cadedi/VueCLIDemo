<template>
  <div>
    <h2 @click="showName">学生姓名：{{ name }}</h2>
    <h2>学生年龄：{{ myAge }}</h2>
    <slot :slot-str="slotStr"></slot>
  </div>
</template>
<script>
import {myMixins} from '../mixin'
import PubSub from 'pubsub-js'
export default {
  name: 'Student',
  data() {
    return {
      // name: "张三",
      // age: 18,
      myAge: this.age,
      slotStr: '我是插槽'
    };
  },
  mixins: [myMixins],
  // props: ["age","name"] 简单接收,除非子组件使用v-bind求值表达式限定类型,否则总为字符串

  //限定类型,传入组件的值若类型不符将报错(父组件使用v-bind限定类型)
  // props: {
  //   age: Number,
  //   name: String
  // }

  // 限定类型+默认值指定+必要性限制
  props: {
    age: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      default: '无名氏'
    },
  },

  // props与data同名变量props的优先级更高(Vue会警告)
  // props中的变量同样可以类似this.age访问,修改会导致Vue警告(但能奏效)
  // 基于这两点,若要修改父组件传来的prop数据,可以在data中设置引用该实例prop的属性,然后修改该data中的属性

  mounted() {
    //接收同级组件数据
    //方式一处理全局事件总线的事件
    // this.$bus.$on('busNews',busMessage => {
    //   alert(Date.now()+"学生通过全局事件总线收到了"+busMessage)
    // })
    //方式二消息订阅(回调使用箭头函数或使用组件上的method(自动绑定this为组件))
    this.pubId = PubSub.subscribe('hello',(msgName,data) => {
        console.log("student收到消息")
        console.log(msgName,data)
    })
  },
  beforeDestroy(){
    //取消处理全局事件总线事件
    // this.$bus.$off('busNews')

    //取消订阅
    PubSub.unsubscribe(this.pubId)
  }
};
</script>
<style lang="less" scoped>
// 支持css预处理器,使用lang指定
  // .outter{
  //   background-color: blanchedalmond;
  //   .inner{
  //     font-size: 40px;
  //   }
  // }
</style>