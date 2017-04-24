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
		<div id='notice-modal-container'>
			<div class="modal fade js-notice-modal">
				<div class="modal-dialog modal-m" role="document">
					<div class="modal-content">
						<div class="modal-header">
		                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        					<h4 class="modal-title">{{modal_title}}</h4>
		                </div>
		                <div class="modal-body">
		                	<p>带 * 号的为必填项</p>
		                	<form class="form-horizontal">
		                		<div class="form-group">
		                			<label for="content" class="col-sm-2 control-label">公告内容 *</label>
		                			<div class="col-sm-10">
		                				<textarea
		                					class="form-control"
		                					id="content"
		                					placeholder="公告内容"
		                					v-model="model_content"
		                					rows="10"
		                				></textarea>
		                			</div>
		                		</div>
		                		<div
		                			class="alert alert-warning alert-dismissible fade in js-alert"
		                			role="alert"
		                			:class="{
		                				'hide': warning_msg_arr.length === 0
		                			}"
		                		>
		                			<p
		                				v-html="warning_msg"
		                				style="line-height: 40px;"
		                			></p>
		                		</div>
		                	</form>
		                </div>
		                <div class="modal-footer">
		                    <button class="btn btn-default" style="width:120px" data-dismiss="modal">取消</button>
		                    <button
		                    	class="btn btn-success js-confirm-btn"
		                    	style="width:120px"
		                    	@click="_confirmBtnClickEvent"
		                    	data-loading-text="提交中......"
		                    >确定</button>
		                </div>
					</div>
				</div>
            </div>
		</div>
		<div id='notice-user-modal-container'>
			<div class="modal fade js-notice-user-modal">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
		                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        					<h4 class="modal-title">查看用户</h4>
		                </div>
		                <div class="modal-body">
		                    <dl class='dl-horizontal' v-if="target_user">
		                    	<dt>姓名</dt>
		                    	<dd>{{target_user.name}}</dd>
		                    	<dt>手机</dt>
		                    	<dd>{{target_user.phone}}</dd>
		                    	<dt>性别</dt>
		                    	<dd>{{target_user.sex === 0 ? "女" : "男"}}</dd>
		                    </dl>
		                </div>
		                <div class="modal-footer">
		                    <a href="javascript: void 0" class="btn btn-default" data-dismiss="modal">关闭</a>
		                </div>
					</div>
				</div>
            </div>
		</div>
	</div>
</template>

<script>

var user_type = require("@/config").user_type;
var vm;

module.exports = {
	name: 'notice-list',
	computed: {
		warning_msg: function() {
			return this.warning_msg_arr.join("</br>");
		},
		modal_title: function() {
			if (this.state === "add") {
				return "添加公告";
			}
			return "修改公告";
		}
	},
	data() {
		return {
			$table: null,
			$user_modal: null,
			$notice_modal: null,
			$confirm_btn: null,


			table_selector: ".js-notice-list-table",
			user_modal_selector: ".js-notice-user-modal",
			notice_modal_selector: ".js-notice-modal",
			confirm_btn_selector: ".js-confirm-btn",

			table_data: [],
			user_arr: [],
			user_map: {},

			target_user: null,
			target_notice: null,

			state: "add",

			warning_msg_arr: [],

			model_content: "",

			default_options_for_table: {
				search: true,
				pagination: true,
                pageSize: 25,
                pageList: [10, 25, 50, 100, "All"],
				columns: [
					{
						field: "content",
						title: "公告内容",
						formatter: function(value, item, index) {
							return value.replace(/\n/g, "</br>");
						}
					},
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
							return `<a href='javascript: void 0;' class='js-user-detail' data-id='${value}'>${temp}</a>`;
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
		vm.$user_modal = $(vm.user_modal_selector);
		vm.$notice_modal = $(vm.notice_modal_selector);
		vm.$confirm_btn = $(vm.confirm_btn_selector);

		vm.$table.bootstrapTable("destroy").bootstrapTable(vm.default_options_for_table);
		vm.$table.bootstrapTable("load", vm.table_data);
		
		vm.$table.on("click", ".js-user-detail", function() {
			let id = $(this).data("id");
			vm.showUser(id);
		});

		vm.$table.on("click", ".js-notice-edit", function() {
			let id = $(this).data("id");
			vm.showEdit(id);
		});

		vm.$table.on("click", ".js-notice-remove", function() {
			let id = $(this).data("id");
			vm.showRemove(id);
		});

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
		requestForAdd() {
			let vm = this;
			this.$confirm_btn.button("loading");
			NProgress.start();
			this.$store.dispatch("notice:add", {
				notice: {
					content: vm.model_content
				},
				success: function(result) {
					if (!result.code) {
						vm.$notice_modal.modal("hide");
						vm.fetchNoticeList();
					}
				},
				complete: function() {
					NProgress.done();
					vm.$confirm_btn.button("reset");
				}
			});
		},
		requestForEdit() {
			let vm = this;
			this.$confirm_btn.button("loading");
			NProgress.start();
			this.$store.dispatch("notice:edit", {
				notice: {
					content: vm.model_content
				},
				id: vm.target_notice.id,
				success: function(result) {
					if (!result.code) {
						vm.$notice_modal.modal("hide");
						vm.fetchNoticeList();
					}
				},
				complete: function() {
					NProgress.done();
					vm.$confirm_btn.button("reset");
				}
			});
		},
		requestForRemove() {
			let vm = this;
			this.$confirm_btn.button("loading");
			NProgress.start();
			this.$store.dispatch("notice:remove", {
				id: vm.target_notice.id,
				success: function(result) {
					if (!result.code) {
						vm.$notice_modal.modal("hide");
						vm.fetchNoticeList();
					}
				},
				complete: function() {
					NProgress.done();
					vm.$confirm_btn.button("reset");
				}
			});
		},
		showAdd() {
			this.state = "add";
			this.reset();
			this.$notice_modal.modal("show");
		},
		showEdit(id) {
			this.state = "edit";
			this.reset();
			this.target_notice = this.table_data.find(function(item) {
				return item.id == id;
			});
			this._getDataFromTarget();
			this.$notice_modal.modal("show");
		},
		showRemove(id) {
			this.target_notice = this.table_data.find(function(item) {
				return item.id == id;
			});
			if (confirm(`确认删除公告吗？\n(此操作无法撤销)`)) {
				this.requestForRemove();
			}
		},
		showUser(id) {
			this.target_user = this.user_map[id];
			this.$user_modal.modal("show");
		},
		reset() {
			this.model_content = "";
		},
		_getDataFromTarget() {
			this.model_content = this.target_notice.content;
		},
		_checkIsValid() {
			this.warning_msg_arr = [];
			if (!this.model_content) {
				this.warning_msg_arr.push("请输入公告内容");
			}
			return this.warning_msg_arr.length === 0;
		},
		_confirmBtnClickEvent() {
			if (!this._checkIsValid()) {
				return;
			}
			if (this.state === "add") {
				this.requestForAdd();
			} else {
				this.requestForEdit();
			}
		}
	}
}

</script>

<style lang="less" scoped>

.modal-body dl {
	dd, dt {
		line-height: 44px;
	}
}

</style>
