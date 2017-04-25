<template>
	<div id='member-teacher'>
		<div id='teacher-list-table-container'>
			<button
				class='add-btn btn btn-success'
				style="width:140px"
				@click="showAdd"
				v-if="user_info.type === 99"
			>添加教师</button>
			<table class='table table-hover js-teacher-list-table' valign="center" align="center"></table>
		</div>
		<div id='teacher-modal-container'>
			<div class="modal fade js-teacher-modal">
				<div class="modal-dialog modal-m" role="document">
					<div class="modal-content">
						<div class="modal-header">
		                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        					<h4 class="modal-title">{{modal_title}}</h4>
		                </div>
		                <div class="modal-body">
		                	<p>带 * 号的为必填项，原始密码同手机号</p>
		                	<form class="form-horizontal">
		                		<div class="form-group">
		                			<label for="name" class="col-sm-2 control-label">教师姓名 *</label>
		                			<div class="col-sm-10">
		                				<input
		                					class="form-control"
		                					id="name"
		                					placeholder="教师姓名"
		                					v-model="model_name"
		                				>
		                			</div>
		                		</div>
		                		<div class="form-group">
		                			<label for="sex" class="col-sm-2 control-label">性别 *</label>
		                			<div class="col-sm-10">
		                				<select
		                					class="form-control"
		                					v-model="model_sex"
		                				>
		                					<option value="1">男</option>
		                					<option value="0">女</option>
		                				</select>
		                			</div>
		                		</div>
		                		<div class="form-group" v-if="state === 'add'">
		                			<label for="phone" class="col-sm-2 control-label">手机 *</label>
		                			<div class="col-sm-10">
		                				<input
		                					class="form-control"
		                					id="phone"
		                					placeholder="手机号码"
		                					maxLength="11"
		                					v-model="model_phone"
		                				>
		                			</div>
		                		</div>
		                		<div class="form-group" v-else>
		                			<label for="password" class="col-sm-2 control-label">密码 *</label>
		                			<div class="col-sm-10">
		                				<input
		                					class="form-control"
		                					id="password"
		                					placeholder="密码"
		                					maxLength="20"
		                					type="password"
		                					v-model="model_password"
		                				>
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
					{{user_info}}
				</div>
            </div>
		</div>
	</div>
</template>

<script>

var user_type = require("@/config").user_type;

var testPhone = require("@/utils").testPhone;
var getPassword = require("@/utils").getPassword;

module.exports = {
	name: 'member-teacher',
	computed: {
		warning_msg: function() {
			return this.warning_msg_arr.join("</br>");
		},
		modal_title: function() {
			if (this.state === "add") {
				return "添加教师";
			}
			return "修改教师";
		},
		user_info: function() {
			let user_info = this.$store.state.user.user_info;
			return user_info;
		}
	},
	data() {
		return {
			$table: null,
			$modal: null,
			$confirm_btn: null,
			table_selector: ".js-teacher-list-table",
			modal_selector: ".js-teacher-modal",
			confirm_btn_selector: ".js-confirm-btn",
			table_data: [],
			operation_column: {
				field: "operation",
				title: "操作",
				formatter: function(value, item, index) {
					return `
						<button class='btn btn-primary js-teacher-edit' data-id='${item.id}'>修改</button>
						<button class='btn btn-danger js-teacher-remove' data-id='${item.id}'>删除</button>
					`;
				}
			},
			default_options_for_table: {
				search: true,
				pagination: true,
                pageSize: 25,
                pageList: [10, 25, 50, 100, "All"],
				columns: [
					{ field: "name", title: "姓名"},
					{
						field: "sex",
						title: "性别",
						sortable: true,
						formatter: function(value, item, index) {
							if (value === 0) {
								return "女";
							} else {
								return "男";
							}
						}
					},
					{ field: "phone", title: "手机号（账号）", sortable: true}
				]
			},
			model_name: "",
			model_sex: 1,
			model_phone: "",
			model_password: "",
			warning_msg_arr: [],
			state: "add",
			target: null
		}
	},
	mounted() {
		let vm = this;
		vm.$table = $(vm.table_selector);
		vm.$modal = $(vm.modal_selector);
		vm.$confirm_btn = $(vm.confirm_btn_selector);

		vm.$table.bootstrapTable("destroy").bootstrapTable(vm.default_options_for_table);
		vm.$table.bootstrapTable("load", vm.table_data);
		vm.fetchTeacherList();

		vm.$table.on("click", ".js-teacher-edit", function() {
			var id = $(this).data("id");
			vm.showEdit(id);
		});
		vm.$table.on("click", ".js-teacher-remove", function() {
			var id = $(this).data("id");
			vm.showRemove(id);
		});

		this._checkUserType();
	},
	methods: {
		fetchTeacherList() {
			let vm = this;
			NProgress.start();
			this.$store.dispatch("user:list", {
				type: user_type.TEACHER,
				success: function(result) {
					if (!result.code) {
						vm.table_data = result.data.users;
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
			this.$store.dispatch("user:add", {
				user: {
					phone: vm.model_phone,
					sex: vm.model_sex,
					password: getPassword(vm.model_phone, vm.model_phone),
					name: vm.model_name
				},
				type: user_type.TEACHER,
				success: function(result) {
					if (!result.code) {
						vm.$modal.modal("hide");
						vm.fetchTeacherList();
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
			this.$store.dispatch("user:edit", {
				user: {
					sex: vm.model_sex,
					password: getPassword(vm.target.phone, vm.model_password),
					name: vm.model_name
				},
				id: vm.target.id,
				success: function(result) {
					if (!result.code) {
						vm.$modal.modal("hide");
						vm.fetchTeacherList();
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
			NProgress.start();
			this.$store.dispatch("user:remove", {
				id: vm.target.id,
				success: function(result) {
					if (!result.code) {
						vm.$modal.modal("hide");
						vm.fetchTeacherList();
					}
				},
				complete: function() {
					NProgress.done();
				}
			});
		},
		showAdd() {
			this.reset();
			this.state = "add";
			this.$modal.modal("show");
		},
		showEdit(id) {
			this.reset();
			this.state = "edit";
			this.target = this.table_data.find(function(item) {
				return item.id == id;
			});
			this._getDataFromTarget();
			this.$modal.modal("show");
		},
		showRemove(id) {
			this.target = this.table_data.find(function(item) {
				return item.id == id;
			});
			if (confirm(`确认删除用户 ${this.target.name}(${this.target.phone})吗？\n(此操作无法撤销)`)) {
				this.requestForRemove();
			}
		},
		reset() {
			this.model_name = "";
			this.model_sex = 1;
			this.model_phone = "";
			this.model_password = "";
			this.warning_msg_arr = [];
			this.$confirm_btn.button("reset");
		},
		_getDataFromTarget() {
			this.model_name = this.target.name;
			this.model_sex = this.target.sex;
		},
		_checkIsValid() {
			this.warning_msg_arr = [];
			if (!this.model_name) {
				this.warning_msg_arr.push("请输入教师姓名");
			}
			if (this.state === "add") {
				if (!testPhone(this.model_phone)) {
					this.warning_msg_arr.push("请输入正确的11位手机号码");
				}
			} else {
				if (this.model_password.length <= 5) {
					this.warning_msg_arr.push("请输入六位以上的密码");
				}
			}
			return this.warning_msg_arr.length === 0;
		},
		_confirmBtnClickEvent() {
			let vm = this;
			if (!this._checkIsValid()) {
				return;
			}
			if (this.state === "add") {
				this.requestForAdd();
			} else {
				this.requestForEdit();
			}
		},
		_checkUserType() {
			let vm = this,
				user_info = this.user_info;
			if (
				user_info.type
			&& 	user_info.type === 1
			) {
				this.$router.push("/main/user/info");
			}
			if (user_info.type === 99) {
				vm.default_options_for_table.columns.push(vm.operation_column);
				vm.$table.bootstrapTable("destroy").bootstrapTable(vm.default_options_for_table);
				vm.$table.bootstrapTable("load", vm.table_data);
			}
		}
	},
	watch: {
		"user_info": function(newData, oldData) {
			this._checkUserType();
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
