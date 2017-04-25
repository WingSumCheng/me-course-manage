<template>
	<div id='sidebar'>
		<div
			class='link-block'
			v-for="block in links_with_auth"
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
			{ name: "教师管理", link: "/main/member/teacher", type: [2, 99]},
			{ name: "学生管理", link: "/main/member/student", type: [1, 99]}
		]
	},
	{
		title: "课程管理",
		contents: [
			{ name: "课程列表", link: "/main/course/list", type: [1, 2, 99]},
			{ name: "反馈列表", link: "/main/course/feedback", type: [2, 99]},
		]
	},
	{
		title: "公告管理",
		contents: [
			{ name: "公告列表", link: "/main/notice/list", type: [1, 2, 99]}
		]
	},
	{
		title: "个人管理",
		contents: [
			{ name: "个人信息", link: "/main/user/info", type: [1, 2, 99]}
		]
	}
];

module.exports = {
	name: 'sidebar',
	computed: {
		user_info: function() {
			return this.$store.state.user.user_info;
		},
		links_with_auth: function() {
			let user_info = this.user_info;
			if (!user_info.type) {
				return this.links;
			}
			let temp = [];
			this.links.forEach(function(outer) {
				let outer_temp = {title: outer.title, contents: []};
				outer.contents.forEach(function(item) {
					if (item.type.indexOf(user_info.type) >= 0) {
						outer_temp.contents.push(item);
					}
				});
				temp.push(outer_temp);
			});
			return temp;
		}
	},
	data() {
		return {
			links: links
		}
	},
	created() {

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
