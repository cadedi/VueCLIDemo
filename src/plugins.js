export default {
  // 第一个参数是Vue构造函数
  install(Vue,num){
    
    console.log("传给插件的自定义参数是"+num)

    // 全局过滤器
    Vue.filter('mySlice',function(val){
      return val.slice(0,4)
    })

    // 全局指令
    Vue.directive('fbind',{
      bind(el,binding){
        el.value = binding.value
      },
      inserted(el,binding){
        el.focus()
      },
      update(el,binding){
        el.value = binding.value
      }
    })

    // 全局混入
    Vue.mixin({
      data(){
        return {
          x: 100,
          y: 200
        }
      }
    })

    // 所有vm与vc都可访问该原型对象上的方法
    Vue.prototype.allHi = () => {console.log("大家好")}
  }
}