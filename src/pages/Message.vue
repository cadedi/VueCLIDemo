<template>
	<div>
    <input placeholder="测试路由缓存"/><br>
    query参数演示
		<ul>
			<li v-for="m in messageList" :key="m.id">

        <!-- 跳转路由并携带query参数，写法一:to的字符串写法  -->
        <!-- v-bind以实现动态传参 -->
        <!-- <router-link :to="`/home/message/detail1?id=${m.id}&title=${m.title}`">
          {{m.title}}
        </router-link> -->

				<!-- 跳转路由并携带query参数，写法二:to的对象写法 -->
        <router-link :to="{
          path:'/home/message/detail1',
          //name: 'Msgsdeatil1', 若配置了name属性可简化写法
          query:{
            id:m.id,
            title:m.title
          }
        }">
          {{m.title}}
        </router-link>
      </li>
		</ul>

    param参数演示
    <ul>
      <li v-for="m in messageList" :key="m.id">
        <!-- param参数,写法一 -->
        <!-- <router-link :to="`/home/message/detail2/${m.id}/${m.title}`">
          {{m.title}}
        </router-link> -->

        <!-- param参数,写法二,对象写法必须使用name而不是path指定路径 -->
        <router-link :to="{
          name: 'Msgsdeatil2',
          params:{
            id:m.id,
            title:m.title
          }
        }">
          {{m.title}}
        </router-link>

      </li>
      <li :style="{opacity}">路由缓存组件的钩子</li>
    </ul>
    <hr>
    <router-view></router-view>
	</div>
</template>

<script>
	export default {
		name:'Message',
    data(){
      return {
        messageList: [
          {id:'001',title:'消息001'},
					{id:'002',title:'消息002'},
					{id:'003',title:'消息003'}
        ],
        opacity: 1
      }
    },
    activated(){
      console.log('Message组件被激活了')
      this.timer = setInterval(() => {
        console.log('@')
        this.opacity -= 0.01
        if(this.opacity <= 0) this.opacity = 1
      },16)
    },
    deactivated(){
      console.log('Message组件失活了')
      clearInterval(this.timer)
    }
    //以上逻辑若使用mounted与beforeDestory实现,则缓存的组件被切换时定时器仍会运行
	}
</script>