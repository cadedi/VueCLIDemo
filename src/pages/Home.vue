<template>
  <div>
    <h2>我是Home的内容</h2>
    在home组件中切换路由
    <router-link active-class="active" to="/home/news">News</router-link>
    <!-- 开启replace,使跳转后的url在活动历史记录中替换当前url -->
    <router-link replace active-class="active" to="/home/message">Message</router-link>
    <!-- keep-alive指定要缓存的路由组件(指定**组件名**)，若保留标签但不指定则缓存所有组件 -->
    <keep-alive include="Message">
      <router-view></router-view>
    </keep-alive>
    <!-- 缓存多个组件 -->
    <!-- 
      <keep-alive :include="['News','Message']">
        <router-view></router-view>
      </keep-alive> 
    -->
  </div>   
</template>

<script>
	export default {
		name:'Home'
	}
</script>

<style>
  .active{
    background-color: antiquewhite;
  }
</style>