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
export default new VueRouter({
  routes:[
    {
      path:'/home', //域名之后的第一个路径需加斜杠
      component:Home,
      children:[  //多级路由
        {
					path:'news',  //不加斜杠
					component:News,
          children:[
            // 编程式导航示例
            {
              name:'newsDeatil',
              path:'newsDeatil',
              component: NewsDetail,  
              props($route){
                return {
                  id:$route.query.id,
                  title:$route.query.title,
                }
              }
            }
          ]
				},
				{
					path:'message',
					component:Message,
          children:[
            {             
              path:'detail1',  //Message的子路由,Message对其动态传**query参数**
              name:'Msgsdeatil1',  //使用可选的name参数配置命名路由,可简化to属性(必须是:对象形式)的路径写法
              component: Detail1,
            },
            {
              path:'detail2/:id/:title', //路径中params参数的写法
              name:'Msgsdeatil2', //:对象配置to属性时,必须使用name配置跳转路径而不能使用path
              component: Detail2,

              //配置props参数,可简化组件获取参数,使其使用组件props的方式获取参数,不必再显式访问$route
          

              //props的第一种写法，通用,值为对象，该对象中的所有key-value都会以props的形式传给Detail组件(不动态,较少使用)
							// props:{a:1,b:'hello'}

							//props的第二种写法，只适用于param写法,值为布尔值，若布尔值为真，就会把该路由组件收到的所有params参数，以props的形式传给Detail组件(即route.params 将会被设置为组件属性)
							// props:true

							//props的第三种写法，通用,值为函数
              props($route){
                return {
                  id:$route.query.id,
                  title:$route.query.title,
                  a:1,
                  b:'hello'
                }
              }
              //解构赋值
              // props({query:{id,title}}){
              //   return {id,title}
              // }

            }
          ]
				}
      ]
    },
    {
      path: '/about',
      component:About
    }
    
  ]
})