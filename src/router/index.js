// 该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router"
// 引入组件(路由所需,统一放在pages下)
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail1 from '../pages/Detail1'
import Detail2 from '../pages/Detail2'
import NewsDetail from '../pages/NewsDetail'

// 创建并暴露一个路由器(在其中设置路由规则)
const router = new VueRouter({
  // hash模式,前端路由的路径在地址栏前缀#/,刷新(重新加载)时该路径不会发送给后端
  // 若开启history则无#,但刷新(重新加载)时当前路径会发送给后端,后端需设法处理前端路由
  // 注意,若用户仅仅在单页应用上单击操作,没有手动刷新,则两种模式都能正常工作(路由仅仅只是更改了地址栏的地址而没有发生跳转)
  mode:'hash',  
  routes: [
    {
      name: 'zhuye',
      path: '/home', //域名之后的第一个路径需加斜杠
      component: Home,
      children: [  //多级路由
        {
          name: 'xinwen',
          path: 'news',  //不加斜杠
          component: News,
          children: [
            {
              name: 'newsDeatil',
              path: 'newsDeatil',
              component: NewsDetail,
              props($route) {
                return {
                  id: $route.query.id,
                  title: $route.query.title,
                }
              }
            }
          ],
          // meta允许程序员存放任意自定义信息
          meta: { isAuth: true, title: '新闻' },

          // 2.独享路由守卫,用法与全局前置路由守卫相同(仅有前置守卫)
          beforeEnter: (to, from, next) => {
            console.log('独享路由守卫', to, from)
            if (to.meta.isAuth) { //判断是否需要鉴权
              if (localStorage.getItem('name')) {
                next()
              }else {
                alert('暂无权限')
              }
            } else {
              next()
            }
          }
        },
        {
          name: 'xiaoxi',
          path: 'message',
          component: Message,
          children: [
            {
              path: 'detail1',
              name: 'Msgsdeatil1',
              component: Detail1,
            },
            {
              path: 'detail2/:id/:title',
              name: 'Msgsdeatil2',
              component: Detail2,
              props($route) {
                return {
                  id: $route.query.id,
                  title: $route.query.title,
                  a: 1,
                  b: 'hello'
                }
              }
            }
          ],
          meta: { isAuth: true, title: '消息' }
        }
      ],
      meta: { title: '主页' }
    },
    {
      path: '/about',
      name: 'guanyu',
      component: About,
      meta: { title: '关于' }
    }

  ]
})

//1.全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
//回调中to,from上存放着路由的name与path等信息,调用next放行
/*
router.beforeEach((to,from,next) => {
  console.log('全局前置路由守卫',to,from)
  // if(to.name === 'xinwen' || to.name === 'xiaoxi'){
  if(to.meta.isAuth){ //判断是否需要鉴权
    if(localStorage.getItem('name')){
      next()
    }else{
      alert('暂无权限')
    }
  }else{
    next()
  }
})
*/

//全局后置路由守卫————初始化的时候被调用、每次路由**切换之后**被调用(beforeEach放行就紧随其后运行,注意与组件内路由守卫beforeRouteLeave的区别)
router.afterEach((to, from) => {
  console.log('全局后置路由守卫', to, from)
  // 路由切换时改变标题,为根路径(主页)也设置标题(如斯则最好将index.html(主页)的meta title也改成相同标题)
  document.title = to.meta.title || '硅谷系统'
})


//3.组件内路由守卫,可控制路由进入或**离开组件**时是否放行,在组件中编写(见message组件)

export default router