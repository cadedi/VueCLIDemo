// 该文件用于创建Vue中最核心的store

// 引入Vue(以应用Vuex插件)
import Vue from 'vue'
// 引入Vuex(插件) 
import Vuex from 'vuex'
// 应用Vuex插件,不在main.js中应用的原因:main.js引入(import)store模块时需要已应用Vuex插件,而在Vue脚手架中import操作总会提在其它语句之前,以至于无法先应用插件再import store模块,故在store模块中直接应用Vuex插件
Vue.use(Vuex)

// 准备actions - 用于响应组件中的动作
const actions = {
  // 第一个参数是上下文对象,上面有部分store模块的属性
  jiaOdd(context,value){
    console.log('actions中的jiaOdd被调用了')
    // 业务逻辑(例如网络请求),此例若sum为奇数才执行
    if(context.state.sum % 2){  
      // context.dispatch('nextjiaOdd',value) //可以继续转发,在后续action中再commit
      context.commit('JIA',value)
    }
  },
  jiaWait(context,value){
    console.log('actions中的jiaWait被调用了')
    setTimeout(() => {
      context.commit('JIA',value)
    }, 500);
  }
}

// 准备mutations - 用于操作数据(状态state)
const mutations = {
  // 第一个参数是状态(数据)
  JIA(state,value){
    console.log('mutations中的JIA被调用了')
    state.sum += value
  },
  JIAN(state,value){
    console.log('mutations中的JIAN被调用了')
    state.sum -= value
  }
}
// 准备state - 用于存储数据
const state = {
  sum:0, //初始数据
  greetStr: '你好啊'
}

// (可选)准备getters-用于将state中的数据进行加工,类似计算属性
const getters = {
  bigSum(state){
    return state.sum * 10 //放大数字
  }
}

// 创建并暴露store
export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters
})


// 为了应对复杂业务逻辑时进行逻辑分层
//actions不应该直接操作context.state(虽然可行)
//组件也不应该处理actions负责的业务逻辑(虽然可行)