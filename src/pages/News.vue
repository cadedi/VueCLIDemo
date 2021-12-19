<template>
  <div>
    <button @click="back">后退</button>
    <button @click="forward">前进</button>
    使用组件上的$router进行编程式导航可在任意标签上实现路由跳转
    <ul>
      <li v-for="n in newsList" :key="n.id">
        <button @click="pushShow(n)">push查看</button>
        <button @click="replaceShow(n)">replace查看</button>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
	export default {
		name:'News',
    data() {
			return {
				newsList:[
					{id:'001',title:'消息001'},
					{id:'002',title:'消息002'},
					{id:'003',title:'消息003'}
				]
			}
		},
    methods:{
      pushShow(n){
        this.$router.push({
          name:'newsDeatil',
          query:{
            id:n.id,
            title:n.title
          }
        })
      },
      replaceShow(n){
        this.$router.replace({
          name:'newsDeatil',
          query:{
            id:n.id,
            title:n.title
          }
        })
      },
      back(){
        this.$router.back()
        // this.$router.go(-1)
      },
      forward(){
        this.$router.forward()
        // this.$router.go(1)
      }
    }
	}
</script>