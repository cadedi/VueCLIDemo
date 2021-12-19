import Vue from 'vue'
import App from './App.vue'
// import {myMixins,myMixins2} from '../mixin'
//引入插件
import plugins from './plugins'

// 引入store
import store from './store' // store/index.js的简写

// 引入VueRouter
import VueRouter from 'vue-router'
// 引入(自定义)路由器
import router from './router'

Vue.config.productionTip = false

//应用插件(一般在创建实例之前)
Vue.use(plugins,3.14) //可传入一个以上参数,插件接收
// 应用路由
Vue.use(VueRouter)

//全局混入(所有vm与vc都会被混入)
// Vue.mixin(myMixins)
// Vue.mixin(myMixins2)

new Vue({
  // el:'#app', 也可如此挂载
  render: h => h(App),
  // render函数的完整写法示例,创建DOM节点 <h1>hello world</h1>
  // render(createElement){
  //   return createElement('h1','hello world')
  // }

  // 若使用了vuex插件,所有vm,vc上都会有$store属性
  // store模块赋给Vue实例的store属性,Vuex会将store包装给$store属性
  store,
  // 指定路由器
  router, 

  beforeCreate(){
    // 安装全局事件总线
    Vue.prototype.$bus = this
  }
}).$mount('#app')
