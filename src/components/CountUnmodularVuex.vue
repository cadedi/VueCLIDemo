<template>
  <div>
    <h1>{{greetStr}}</h1>
    <!--  不实现计算属性的繁琐访问  -->
    <h1>当前求和为:{{$store.state.sum}}</h1>
    <h1>当前求和为:{{countRes}}</h1>  
    <h1>当前求和放大十倍后: {{$store.getters.bigSum}}</h1>
    <h1>当前求和放大十倍后: {{bigSum}}</h1>
    <!-- 运算的步长 -->
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <!-- 使用mapActions与mapMutations简化方法写法,必须显式传入参数作为value(以覆盖默认的$event参数) -->
    <button @click="increment(n)">+</button>
    <button @click="decrement(n)">-</button>
    <button @click="incrementOdd(n)">当前求和为奇数再加</button>
    <button @click="incrementWait(n)">等一等再加</button>
  </div>
</template>

<script>
  //一系列mapxxx方法,可选,仅仅是简化对store的访问和节省代码量
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  export default {
    name: 'Count',
    data(){
      return {
        n:1 //运算的步长
      }
    },
    computed: {
      // 手写计算属性简化对state的访问
      // countRes(){
      //   return this.$store.state.sum
      // },

      // mapState可生成多个计算属性,简化以上写法,在Vue浏览器开发者工具中由此生成的计算属性不在computed下而在vuex bindings下
      // 对象写法,对象中key,value即使同名不可简写作一个(因value非对象而是字符串)
      ...mapState({countRes:'sum'}),
      // 数组写法,key,value同名时使用,即计算属性名与所需state上的属性同名时可用
      ...mapState(['greetStr']),


      // mapGetters用于getters中的属性,用法与mapState相同(两种写法)
      ...mapGetters(['bigSum'])
    },
    methods:{
      // increment(){
      //   // 无业务逻辑需处理,直接交付mutations
      //   this.$store.commit('JIA',this.n)
      // },
      // decrement(){
      //   this.$store.commit('JIAN',this.n)
      // },

      // incrementOdd(){
      //   // 有业务逻辑,先转发至actions
      //   this.$store.dispatch('jiaOdd',this.n)
      // },
      // incrementWait(){
      //   this.$store.dispatch('jiaWait',this.n)
      // },

      // 简化方法写法,自然,也有对象与数组写法
      ...mapMutations({increment:'JIA',decrement:'JIAN'}),
      ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
    },
    mounted(){
      console.log('组件Count',this.$store)
    }
  }
</script>

<style>
  button{
    margin-left: 5px;
  }
</style>