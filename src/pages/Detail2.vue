<template>
	<ul>
    <!-- 路由器不配置props属性时的写法 -->
		<!-- <li>消息编号：{{$route.params.id}}</li>
		<li>消息标题：{{$route.params.title}}</li> -->
    <li>消息编号：{{id}}</li>
		<li>消息标题：{{title}}</li>
    <li>{{a}}</li>
    <li>{{b}}</li>
	</ul>
</template>

<script>
	export default {
		name:'Detail2',
    props:['id','title','a','b'],
	}
</script>