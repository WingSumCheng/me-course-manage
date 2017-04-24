<template>
	<div id='sidebar'>
		<div
			class='link-block'
			v-for="block in links"
		>
			<div class='link-title'>{{block.title}}</div>
			<sidebar-link
				v-for="(item, $index) in block.contents"
				:key="$index"
				:name="item.name"
				:link="item.link"
			></sidebar-link>
		</div>
	</div>
</template>

<script>

const links = [
	{
		title: "用户管理",
		contents: [
			{ name: "教师管理", link: "/member/teacher"},
			{ name: "学生管理", link: "/member/student"}
		]
	},
	{
		title: "课程管理",
		contents: [
			{ name: "课程列表", link: "/course/list"},
			{ name: "反馈列表", link: "/course/feedback"},
		]
	},
	{
		title: "公告管理",
		contents: [
			{ name: "公告列表", link: "/notice/list"}
		]
	},
	{
		title: "个人管理",
		contents: [
			{ name: "个人信息", link: "/user/info"}
		]
	}
];

module.exports = {
	name: 'sidebar',
	data() {
		return {
			links: links
		}
	},
	created() {
		console.log(this);
	},
	components: {
		"sidebar-link": require("./sidebar-link")
	}
}

</script>

<style lang="less" scoped>

#sidebar {
	position: absolute;
	left: 0;
	top: 0;
	width: 200px;
	height: 100%;
	min-height: 750px;
	background-color: #344147;
	color: #fff;
}

.link-block {
	padding: 40px 0;
	text-align: center;
	border-bottom: solid 1px #838486;
	&:last-of-type {
		border-bottom: none;
	}
	line-height: 38px;
	.link-title {
		color: #838486;
	}
}

</style>
