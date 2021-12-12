<template>
  <div>
    <!-- <h1>{{greetAbout.greetStr}}</h1> -->
    <h1>{{greetStr}}</h1>
    <button @click="getSentence">来一句</button>
    <!-- <h1>当前求和为:{{countAbout.sum}}</h1>  -->
    <h1>当前求和为:{{sum}}</h1> 
    <h1>当前求和放大十倍后: {{bigSum}}</h1>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
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
      
      //模块不设置使用namespace时的方式,访问state时必须 模块名.属性名(似乎此种情况模块化时只有state需在模块下访问,其它都还是全局域下(使用mapxxx或访问时都是))
      // ...mapState(['countAbout','greetAbout']),


      //模块设置namespaced:true时,辅助函数需指定命名空间,访问时无需加模块名
      //在$store中,state中的属性处于相应命名空间下(作为其属性),而getters与actions,mutations则被设置为namespace/属性名 的命名方式,如果手动访问而不使用辅助函数,则必须使用此种命名访问 
      ...mapState('countAbout',['sum']),
      ...mapState('greetAbout',['greetStr']),

      // 不使用辅助函数访问state
      // sum(){
      //   return this.$store.state.countAbout.sum
      // }


      ...mapGetters('countAbout',['bigSum'])
      //不使用辅助函数时访问getters
      // bigSum(){
      //   return this.$store.getters['countAbout/bigSum']
      // }

    },
    methods:{
      ...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
      ...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'}),

      // 如果不使用辅助函数,第一个参数需写作 namespace/fun-name的格式
      // increment(){
      //   this.$store.commit('countAbout/JIA',this.n)
      // }

      getSentence(){
        this.$store.dispatch('greetAbout/sayProverb')
      }
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