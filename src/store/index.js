// 该文件用于创建Vue中最核心的store

import axios from 'axios'
// 引入Vue(以应用Vuex插件)
import Vue from 'vue'
// 引入Vuex(插件) 
import Vuex from 'vuex'
// 应用Vuex插件,不在main.js中应用的原因:main.js引入(import)store模块时需要已应用Vuex插件,而在Vue脚手架中import操作总会提在其它语句之前,以至于无法先应用插件再import store模块,故在store模块中直接应用Vuex插件
Vue.use(Vuex)

const countOptions = {
  namespaced:true,  //使用命名空间
  actions:{
    jiaOdd(context,value){
      console.log('actions中的jiaOdd被调用了')
      if(context.state.sum % 2){  
        context.commit('JIA',value)
      }
    },
    jiaWait(context,value){
      console.log('actions中的jiaWait被调用了')
      setTimeout(() => {
        context.commit('JIA',value)
      }, 500);
    }
  },
  mutations:{
    JIA(state,value){
      console.log('mutations中的JIA被调用了')
      state.sum += value
    },
    JIAN(state,value){
      console.log('mutations中的JIAN被调用了')
      state.sum -= value
    }
  },
  state:{
    sum:0, //初始数据
  },
  getters:{
    bigSum(state){
      return state.sum * 10 //放大数字
    }
  }
}

const greetOptions = {
  namespaced:true,
  actions:{
    sayProverb(context){
			axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(
				response => {
					context.commit('SAY_PROVERB',response.data)
				},
				error => {
					alert(error.message)
				}
			)
		}
  },
  mutations:{
    SAY_PROVERB(state,value){
      alert(value)
    }
  },
  state:{
    greetStr: '你好啊'
  },
  getters:{
    greetInTime(state){
      return state.greetStr + ',' + Date.now()
    }
  }
}



export default new Vuex.Store({
  modules:{
    countAbout:countOptions,
    greetAbout:greetOptions
  }
})

