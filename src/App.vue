<template>
  <div>
    <button @click="sayThis">App sayThis</button>
    <!-- <img src="./assets/logo.png"> -->
    <div ref="hi">Hi</div>
    <!-- 第一种为事件绑定处理函数的方法(.once修饰符可限制只触发一次) -->
    <!-- <School @getSchoolName.once="logSchoolName"></school> -->
    <!-- 第二种为事件绑定处理函数的方法 -->
    <School ref="school"/>
    <!-- 结合v-bind可以限定组件接收到的参数是number类型(而非字符串) -->
    <Student ref="stu" name="Mike" :age="18">
      <div slot-scope="{slotStr}">
        {{slotStr}}
      </div>
    </student>
    <button @click="say">获取子组件示例对象</button>
    <!-- 组件绑定原生事件必须使用native修饰符,原生事件会在组件模版的根元素上触发 -->
    <!-- <Student @click.native="window.alert(1)" name="John" :age="18"/> -->

    <hr/>
    <Count/>

    <hr/>
    <!-- 指定路由的路径和激活状态添加的样式(该标签编译后为a标签) -->
    <router-link active-class="active" to="/about">About</router-link>
    <router-link active-class="active" to="/home">Home</router-link>
    <h2>路由切换时以下发生组件切换</h2>
    <!-- 指定路由切换组件的呈现位置 -->
    <router-view></router-view>

  </div>
</template>
<script>
  import School from "./components/School"; //脚手架中vue后缀可不写
  import Student from "./components/Student";
  import Count from './components/Count'
  export default {
    name: "App",
    data(){
      return {
        window: window  //使得模版中能间接访问window对象,不推荐
      }
    },
    components: {
      School,
      Student,
      Count
    },
    methods: {
      say(){
        console.log(this.$refs.stu)
        console.log('原生标签的ref是DOM元素',this.$refs.hi)
        console.log(this.$refs.hi instanceof HTMLElement) //true
      },
      sayThis(){
        console.log(this)
      },
      // 若有多个参数
      // logSchoolName(name,x,y)
      // logSchoolName(name,...params)
      // logSchoolName(paramsObj) 子组件直接发送包装成对象的参数
      logSchoolName(name){
        console.log("校名为"+name)
      }
    },
    mounted(){
      // 第二种为事件绑定处理函数的方法(调用子组件实例对象方法,但使用父组件上的回调,如此才能实现子==>父的数据流动)
      // 如果处理函数直接在参数中声明为function(){}则其this为子组件的this,只有声明为箭头函数才可绑定当前组件的this
      this.$refs.school.$on('getSchoolName',this.logSchoolName)

      // 仅触发一次
      // this.$refs.school.$once('getSchoolName',this.logSchoolName)
    }
  };
</script>

<style>
  .active{
    background-color: antiquewhite;
  }
</style>