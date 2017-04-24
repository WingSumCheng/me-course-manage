<template>
	<div id='notice-list'>
		<div id='notice-list-table-container'>
			<button
				class='add-btn btn btn-success'
				style="width:140px"
				@click="showAdd"
			>发布公告</button>
			<table class='table table-hover js-notice-list-table' valign="center" align="center"></table>
		</div>
	</div>
</template>

<script>

var user_type = require("@/config").user_type;
var vm;

module.exports = {
	name: 'notice-list',
	data() {
		return {
			$table: null,
			$modal: null,
			$confirm_btn: null,
			table_selector: ".js-notice-list-table",
			modal_selector: ".js-notice-modal",
			confirm_btn_selector: ".js-confirm-btn",
			table_data: [],
			user_arr: [],
			user_map: {},
			default_options_for_table: {
				search: true,
				pagination: true,
                pageSize: 25,
                pageList: [10, 25, 50, 100, "All"],
				columns: [
					{ field: "content", title: "公告内容"},
					{
						field: "user_id",
						title: "发布人",
						formatter: function(value, item, index) {
							let temp;
							if (!vm.user_map[value]) {
								temp = "加载中";
							} else {
								temp = vm.user_map[value].name;
							}
							return `<a href='javascript: void 0;' class='js-teacher-detail' data-id='${value}'>${temp}</a>`;
						}
					},
					{
						field: "create_time",
						title: "发布时间",
						formatter: function(value, item, index) {
							return moment(value).format("YYYY-MM-DD</br>hh:mm:ss");
						}
					},
					{
						field: "update_time",
						title: "上一次修改时间",
						formatter: function(value, item, index) {
							return moment(value).format("YYYY-MM-DD</br>hh:mm:ss");
						}
					},
					{
						field: "operation",
						title: "操作",
						formatter: function(value, item, index) {
							return `
								<button class='btn btn-primary js-notice-edit' data-id='${item.id}'>修改</button>
								<button class='btn btn-danger js-notice-remove' data-id='${item.id}'>删除</button>
							`;
						}
					}
				]
			},
		};
	},
	mounted() {
		vm = this;
		vm.$table = $(vm.table_selector);
		vm.$modal = $(vm.modal_selector);
		vm.$confirm_btn = $(vm.confirm_btn_selector);

		vm.$table.bootstrapTable("destroy").bootstrapTable(vm.default_options_for_table);
		vm.$table.bootstrapTable("load", vm.table_data);
		

		vm.fetchPublisherList();
		vm.fetchNoticeList();
	},
	methods: {
		fetchPublisherList() {
			let vm = this;
			NProgress.start();
			var ep = new eventproxy();
			ep.all(["fetch_teacher", "fetch_manager"], function() {
				NProgress.done();
			});
			this.$store.dispatch("user:list", {
				type: user_type.TEACHER,
				success: function(result) {
					if (!result.code) {
						result.data.users.forEach(function(item) {
							vm.user_arr.push(item);
							vm.user_map[item.id] = item;
						});
						vm.$table.bootstrapTable("load", vm.table_data);
					}
				},
				complete: function() {
					ep.done("fetch_teacher")(null);
				}
			});
			this.$store.dispatch("user:list", {
				type: user_type.MANAGER,
				success: function(result) {
					if (!result.code) {
						result.data.users.forEach(function(item) {
							vm.user_arr.push(item);
							vm.user_map[item.id] = item;
						});
						vm.$table.bootstrapTable("load", vm.table_data);
					}
				},
				complete: function() {
					ep.done("fetch_manager")(null);
				}
			});
		},
		fetchNoticeList() {
			NProgress.start();
			this.$store.dispatch("notice:list", {
				success: function(result) {
					if (!result.code) {
						vm.table_data = result.data.notices;
						vm.$table.bootstrapTable("load", vm.table_data);
					}
				},
				complete: function() {
					NProgress.done();
				}
			});
		},
		showAdd() {

		}
	}
}

</script>


<style lang="less" scoped>
</style>
