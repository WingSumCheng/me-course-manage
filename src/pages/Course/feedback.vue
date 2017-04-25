<template>
	<div id='course-feedback'>
		<div id='feedback-list-container'>
			<button
				class='add-btn btn btn-success'
				style="width:140px"
				@click="showAdd"
				v-if="user_info.type === 2"
			>添加反馈</button>
			<table class='table table-hover js-feedback-list-table' valign="center" align="center"></table>
		</div>
		<div id='feedback-modal-container'>
			<div class="modal fade js-feedback-modal">
				<div class="modal-dialog modal-m" role="document">
					<div class="modal-content">
						<div class="modal-header">
		                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        					<h4 class="modal-title">添加反馈</h4>
		                </div>
		                <div class="modal-body">
		                	<p>带 * 号的为必填项</p>
		                	<form class="form-horizontal">
		                		<div class="form-group">
		                			<label for="lesson" class="col-sm-2 control-label">课程 *</label>
		                			<div class="col-sm-10">
		                				<select
		                					class="form-control"
		                					v-model="model_lesson_id"
		                					id="lesson"
		                				>
		                					<option
		                						v-for="lesson in lesson_arr"
		                						:value="lesson.id"
		                					>{{getLessonName(lesson)}}</option>
		                				</select>
		                			</div>
		                		</div>
		                		<div class="form-group">
		                			<label for="content" class="col-sm-2 control-label">反馈内容 *</label>
		                			<div class="col-sm-10">
		                				<textarea
		                					class="form-control"
		                					id="content"
		                					placeholder="反馈内容"
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
	</div>
</template>

<script>

module.exports = {
	name: 'course-feedback',
	computed: {
		user_info: function() {
			let user_info = this.$store.state.user.user_info;
			return user_info;
		},
		warning_msg: function() {
			return this.warning_msg_arr.join("</br>");
		}
	},
	data() {
		return {
			$table: null,
			$feedback_modal: null,
			$confirm_btn: null,

			table_selector: ".js-feedback-list-table",
			feedback_modal_selector: ".js-feedback-modal",
			confirm_btn_selector: ".js-confirm-btn",

			table_data: [],

			lesson_arr: [],

			warning_msg_arr: [],

			model_content: "",
			model_lesson_id: 0,


			default_options_for_table: {
				search: true,
				pagination: true,
                pageSize: 25,
                pageList: [10, 25, 50, 100, "All"],
				columns: [
					{ field: "lesson_name", title: "课程"},
					{
						field: "content",
						title: "反馈内容",
						formatter: function(value, item, index) {
							return value.replace(/\n/g, "</br>");
						}
					},
					{ field: "teacher_name", title: "教师"},
					{ field: "student_name", title: "学生"},
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
					}
				]
			},
			static_week: [
				"周日",
				"周一",
				"周二",
				"周三",
				"周四",
				"周五",
				"周六",
			]
		};
	},
	mounted() {
		let vm = this;
		vm.$table = $(vm.table_selector)
						.bootstrapTable("destroy")
						.bootstrapTable(vm.default_options_for_table)
						.bootstrapTable("load", vm.table_data);

		vm.$feedback_modal = $(vm.feedback_modal_selector);
		vm.$confirm_btn = $(vm.confirm_btn_selector);
		vm.fetchFeedbackList();
		vm.fetchLessonList();
	},
	methods: {

		fetchFeedbackList() {
			let vm = this;
			NProgress.start();
			this.$store.dispatch("feedback:list", {
				success: function(result) {
					if (!result.code) {
						vm.table_data = result.data.feedbacks;
						vm.$table.bootstrapTable("load", vm.table_data);
					}
				},
				complete: function() {
					NProgress.done();
				}
			});
		},

		fetchLessonList() {
			let vm = this;
			NProgress.start();
			this.$store.dispatch("lesson:list", {
				success: function(result) {
					if (!result.code) {
						vm.lesson_arr = result.data.lessons;
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
			this.$store.dispatch("feedback:add", {
				feedback: {
					content: vm.model_content,
					lesson_id: vm.model_lesson_id
				},
				success: function(result) {
					if (!result.code) {
						vm.$feedback_modal.modal("hide");
						vm.fetchFeedbackList();
					}
				},
				complete: function() {
					NProgress.done();
					vm.$confirm_btn.button("reset");
				}
			});
		},

		getLessonName(lesson) {
			let class_time_arr = lesson.class_time.split(",");
			let temp = `${lesson.name}(${this.static_week[class_time_arr[0]]}, ${class_time_arr[1]} ~ ${class_time_arr[2]})`;
			return temp;
		},

		reset() {
			this.model_content = "";
			this.model_lesson_id = (this.lesson_arr[0] || {}).id;
		},

		showAdd() {
			this.reset();
			this.$feedback_modal.modal("show");
		},
		_checkIsValid() {
			this.warning_msg_arr = [];
			if (!this.model_lesson_id) {
				this.warning_msg_arr.push("请选择课程");
			}
			if (!this.model_content) {
				this.warning_msg_arr.push("请输入反馈内容");
			}
			return this.warning_msg_arr.length === 0;
		},
		_confirmBtnClickEvent() {
			if (!this._checkIsValid()) {
				return;
			}
			this.requestForAdd();
		}
	}
}

</script>


<style lang="less" scoped>
</style>
