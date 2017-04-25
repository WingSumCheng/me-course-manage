<template>
	<div id='user-info'>
		<div class="user-table-container fixed-table-container">
			<table
				class="table table-hover"
				style="text-align:left; margin-bottom:0;"
				valign="center"
				align="center"
			>
				<thead>
				    <tr>
				        <th>
				            <div class="th-inner">个人信息</div>
				        </th>
				    </tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<div class='left-part block-key'>姓名</div>
							<div class='left-part block-value'>{{user_info.name}}</div>
						</td>
					</tr>
					<tr>
						<td>
							<div class='left-part block-key'>账号</div>
							<div class='left-part block-value'>{{user_info.phone}}</div>
							<div class='right-part'>
								<button
			                    	class="btn btn-success"
			                    	style="width:120px"
			                    	data-loading-text="提交中......"
			                    	@click="showPassword"
			                    >修改密码</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div id='password-modal-container'>
			<div class="modal fade js-password-modal">
				<div class="modal-dialog modal-m" role="document">
					<div class="modal-content">
						<div class="modal-header">
		                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        					<h4 class="modal-title">修改密码</h4>
		                </div>
		                <div class="modal-body">
		                	<p>带 * 号的为必填项</p>
		                    <form class="form-horizontal">
		                		<div class="form-group">
		                			<label for="old_password" class="col-sm-2 control-label">旧密码 *</label>
		                			<div class="col-sm-10">
		                				<input
		                					class="form-control"
		                					id="old_password"
		                					placeholder="请输入旧密码"
		                					v-model="model_old_password"
		                					type="password"
		                				>
		                			</div>
		                		</div>
		                		<div class="form-group">
		                			<label for="new_password" class="col-sm-2 control-label">新密码 *</label>
		                			<div class="col-sm-10">
		                				<input
		                					class="form-control"
		                					id="new_password"
		                					placeholder="请输入新密码"
		                					v-model="model_new_password"
		                					type="password"
		                				>
		                			</div>
		                		</div>
		                		<div class="form-group">
		                			<label for="confirm_password" class="col-sm-2 control-label">确认密码 *</label>
		                			<div class="col-sm-10">
		                				<input
		                					class="form-control"
		                					id="confirm_password"
		                					placeholder="请再次输入新密码"
		                					v-model="model_confirm_password"
		                					type="password"
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
				</div>
            </div>
		</div>
	</div>
</template>

<script>

var getPassword = require("@/utils").getPassword;

module.exports = {
	name: 'user-info',
	computed: {
		warning_msg: function() {
			return this.warning_msg_arr.join("</br>");
		},
		user_info: function() {
			return this.$store.state.user.user_info;
		}
	},
	data() {
		return {

			$modal: null,
			$confirm_btn: null,

			modal_selector: ".js-password-modal",
			confirm_btn_selector: ".js-confirm-btn",

			warning_msg_arr: [],


			model_old_password: "",
			model_new_password: "",
			model_confirm_password: ""
		};
	},
	mounted() {
		let vm = this;
		vm.$modal = $(vm.modal_selector);
		vm.$confirm_btn = $(vm.confirm_btn_selector);
	},
	methods: {
		fetchUserInfo() {
			let vm = this;
			NProgress.start();
			this.$store.dispatch("user:info", {
				success: function(result) {
					if (!result.code) {
						vm.$store.commit("user:set-info", {
							user: result.data.user
						});
					}
				},
				complete: function() {
					NProgress.done();
				}
			});
		},
		requestForUpdate() {
			let vm = this;
			NProgress.start();
			this.$confirm_btn.button("loading");
			this.$store.dispatch("user:update-password", {
				user: {
					old_password: getPassword(vm.user_info.phone, vm.model_old_password),
					new_password: getPassword(vm.user_info.phone, vm.model_new_password)
				},
				success: function(result) {
					if (!result.code) {
						vm.$modal.modal("hide");
						vm.fetchUserInfo();
					}
				},
				complete: function() {
					NProgress.done();
					vm.$confirm_btn.button("reset");
				}
			});
		},
		reset() {
			this.model_old_password = "";
			this.model_new_password = "";
			this.model_confirm_password = "";
		},
		showPassword() {
			this.reset();
			this.$modal.modal("show");
		},
		_checkIsValid() {
			this.warning_msg_arr = [];
			if (!this.model_old_password) {
				this.warning_msg_arr.push("请输入旧密码");
			}
			if (!this.model_new_password) {
				this.warning_msg_arr.push("请输入新密码");
			} else {
				if (!this.model_confirm_password) {
					this.warning_msg_arr.push("请再次输入新密码");
				} else {
					if (this.model_new_password !== this.model_confirm_password) {
						this.warning_msg_arr.push("两次输入的新密码不一样, 请检查");
					}
				}
			}
			return this.warning_msg_arr.length === 0;
		},
		_confirmBtnClickEvent() {
			if (!this._checkIsValid()) {
				return;
			}
			this.requestForUpdate();
		}
	}
}

</script>


<style lang="less" scoped>

.table thead tr th {
	text-align: left;
}

.table tbody tr td {
	text-align: left;
}

.fixed-table-container {
	thead {
		th {
			.th-inner {
				padding-left: 22px;
			}
		}
	}
}
.table {
	tbody {
		tr {
			td {
				padding-left: 30px;
				padding-right: 30px;
				padding-top: 20px;
				padding-bottom: 20px;
			}
		}
	}
}

.block-key, .block-value {
	line-height: 34px;
}

.block-value {
	margin-left: 68px;
}

</style>
