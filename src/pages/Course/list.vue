<template>
	<div id='course-list'>
		<div id='course-list-table-container'>
			<button
				class='add-btn btn btn-success'
				style="width:140px"
				@click="showAdd"
			>添加课程</button>
			<table class='table table-hover js-course-list-table' valign="center" align="center"></table>
		</div>
		<div id='course-user-modal-container'>
			<div class="modal fade js-course-user-modal">
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
		<div id='course-modal-container'>
			<div class="modal fade js-course-modal">
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
		                			<label for="name" class="col-sm-2 control-label">课程名称 *</label>
		                			<div class="col-sm-10">
		                				<input
		                					class="form-control"
		                					id="name"
		                					placeholder="课程名"
		                					v-model="model_name"
		                				>
		                			</div>
		                		</div>
		                		<div class="form-group">
		                			<label for="teacher" class="col-sm-2 control-label">教师 *</label>
		                			<div class="col-sm-10">
		                				<select
		                					class="form-control"
		                					v-model="model_teacher_id"
		                					id="teacher"
		                				>
		                					<option
		                						v-for="teacher in teacher_arr"
		                						:value="teacher.id"
		                					>{{teacher.name}}({{teacher.phone}})</option>
		                				</select>
		                			</div>
		                		</div>
		                		<div class="form-group">
		                			<label for="student" class="col-sm-2 control-label">学生 *</label>
		                			<div class="col-sm-10">
		                				<select
		                					class="form-control"
		                					v-model="model_student_id"
		                					id="student"
		                				>
		                					<option
		                						v-for="student in student_arr"
		                						:value="student.id"
		                					>{{student.name}}({{student.phone}})</option>
		                				</select>
		                			</div>
		                		</div>
		                		<div class="form-group">
		                			<label for="class_time_week" class="col-sm-2 control-label">上课日 *</label>
		                			<div class="col-sm-10">
		                				<select
		                					class="form-control"
		                					v-model="model_class_time_week"
		                					id="class_time_week"
		                				>
		                					<option
		                						v-for="(week, $index) in static_week"
		                						:value="$index"
		                					>{{week}}</option>
		                				</select>
		                			</div>
		                		</div>
		                		<div class="form-group">
		                			<label class="col-sm-2 control-label">时间区间 *</label>
		                			<div class="col-sm-10 form-inline">
		                				<div class="input-group col-sm-5">
		                					<input
		                						type="text"
		                						class="form-control js-class-time-start-time"
		                						placeholder="开始时间"
		                						v-model="model_class_time_start_time"
		                						@keypress="_disableKeypress($event)"
		                					>
		                					<div
		                						class="input-group-addon icon icon-calendar"
		                						style="background-color:#fff;"
		                					></div>
		                				</div>
		                				<div class="input-group col-sm-1" style="text-align: center;">至</div>
		                				<div class="input-group col-sm-5">
		                					<input
		                						type="text"
		                						class="form-control js-class-time-end-time"
		                						placeholder="结束时间"
		                						v-model="model_class_time_end_time"
		                						@keypress="_disableKeypress($event)"
		                					>
		                					<div
		                						class="input-group-addon icon icon-calendar"
		                						style="background-color:#fff;"
		                					></div>
		                				</div>
		                			</div>
		                		</div>
		                		<div class="form-group">
		                			<label class="col-sm-2 control-label">日期区间 *</label>
		                			<div class="col-sm-10 form-inline">
		                				<div class="input-group col-sm-5">
		                					<input
		                						type="text"
		                						class="form-control js-class-time-start-date"
		                						placeholder="开始日期"
		                						v-model="model_class_time_start_date"
		                						@keypress="_disableKeypress($event)"
		                					>
		                					<div
		                						class="input-group-addon icon icon-calendar"
		                						style="background-color:#fff;"
		                					></div>
		                				</div>
		                				<div class="input-group col-sm-1" style="text-align: center;">至</div>
		                				<div class="input-group col-sm-5">
		                					<input
		                						type="text"
		                						class="form-control js-class-time-end-date"
		                						placeholder="结束日期"
		                						v-model="model_class_time_end_date"
		                						@keypress="_disableKeypress($event)"
		                					>
		                					<div
		                						class="input-group-addon icon icon-calendar"
		                						style="background-color:#fff;"
		                					></div>
		                				</div>
		                			</div>
		                		</div>
		                		<div class="form-group">
		                			<label for="class_room" class="col-sm-2 control-label">课室 *</label>
		                			<div class="col-sm-10">
		                				<input
		                					class="form-control"
		                					id="class_room"
		                					placeholder="课室"
		                					v-model="model_class_room"
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

var user_type = require("@/config").user_type;

let vm;
module.exports = {
	name: 'course-list',
	computed: {
		warning_msg: function() {
			return this.warning_msg_arr.join("</br>");
		},
		modal_title: function() {
			if (this.state === "add") {
				return "添加课程";
			}
			return "修改课程";
		}
	},
	data() {
		return {
			$table: null,
			$user_modal: null,
			$course_modal: null,
			$confirm_btn: null,

			$start_time: null,
			$end_time: null,
			$start_date: null,
			$end_date: null,
			table_selector: ".js-course-list-table",
			user_modal_selector: ".js-course-user-modal",
			course_modal_selector: ".js-course-modal",
			confirm_btn_selector: ".js-confirm-btn",

			start_time_selector: ".js-class-time-start-time",
			end_time_selector: ".js-class-time-end-time",
			start_date_selector: ".js-class-time-start-date",
			end_date_selector: ".js-class-time-end-date",
			table_data: [],
			student_map: {},
			student_arr: [],
			teacher_map: {},
			teacher_arr: [],
			warning_msg_arr: [],
			target_user: null,
			target_lesson: null,
			state: "add",
			model_name: "",
			model_teacher_id: "",
			model_student_id: "",
			model_class_time_week: 1,
			model_class_time_start_time: "",
			model_class_time_end_time: "",
			model_class_time_start_date: "",
			model_class_time_end_date: "",
			model_class_room: "",
			default_options_for_table: {
				search: true,
				pagination: true,
                pageSize: 25,
                pageList: [10, 25, 50, 100, "All"],
				columns: [
					{ field: "name", title: "课程"},
					{
						field: "class_time",
						title: "上课时间",
						formatter: function(value, item, index) {
							let temp = value.split(",");
							return `${vm.static_week[temp[0]]}</br>${temp[1]} ~ ${temp[2]}`;
						}
					},
					{
						field: "start_date",
						title: "开始日期",
						formatter: function(value, item, index) {
							return moment(value).format("YYYY-MM-DD");
						}
					},
					{
						field: "end_date",
						title: "开始日期",
						formatter: function(value, item, index) {
							return moment(value).format("YYYY-MM-DD");
						}
					},
					{ field: "class_room", title: "教室"},
					{
						field: "teacher_id",
						title: "教师",
						formatter: function(value, item, index) {
							let temp;
							if (!vm.teacher_map[value]) {
								temp = "加载中";
							} else {
								temp = vm.teacher_map[value].name;
							}
							return `<a href='javascript: void 0;' class='js-teacher-detail' data-id='${value}'>${temp}</a>`;
						}
					},
					{
						field: "student_id",
						title: "学生",
						formatter: function(value, item, index) {
							let temp;
							if (!vm.student_map[value]) {
								temp = "加载中";
							} else {
								temp = vm.student_map[value].name;
							}
							return `<a href='javascript: void 0;' class='js-student-detail' data-id='${value}'>${temp}</a>`;
						}
					},
					{
						field: "operation",
						title: "操作",
						formatter: function(value, item, index) {
							return `
								<button class='btn btn-primary js-course-edit' data-id='${item.id}'>修改</button>
								<button class='btn btn-danger'>删除</button>
							`;
						}
					}
				]
			},
			default_options_for_picker_time: {
				format: "hh:ii",
				startView: 1,
				maxView: 1,
				autoclose: true
			},
			default_options_for_picker_date: {
				format: "yyyy-mm-dd",
				startView: 2,
				minView: 2,
				autoclose: true
			},
			static_week: [
				"周日",
				"周一",
				"周二",
				"周三",
				"周四",
				"周五",
				"周六",
			],
		}
	},
	mounted() {
		vm = this;
		vm.$user_modal = $(vm.user_modal_selector);
		vm.$table = $(vm.table_selector);
		vm.$course_modal = $(vm.course_modal_selector);

		vm.$confirm_btn = $(vm.confirm_btn_selector);

		vm.$start_time = $(vm.start_time_selector)
						.datetimepicker(vm.default_options_for_picker_time)
						.on("changeDate", function() {
							vm.model_class_time_start_time = $(this).val();
						});
		vm.$end_time = $(vm.end_time_selector)
						.datetimepicker(vm.default_options_for_picker_time)
						.on("changeDate", function() {
							vm.model_class_time_end_time = $(this).val();
						});

		vm.$start_date = $(vm.start_date_selector)
						.datetimepicker(vm.default_options_for_picker_date)
						.on("changeDate", function() {
							vm.model_class_time_start_date = $(this).val();
						});

		vm.$end_date = $(vm.end_date_selector)
						.datetimepicker(vm.default_options_for_picker_date)
						.on("changeDate", function() {
							vm.model_class_time_end_date = $(this).val();
						});

		vm.$table.bootstrapTable("destroy").bootstrapTable(vm.default_options_for_table);
		vm.$table.bootstrapTable("load", vm.table_data);

		vm.$table.on("click", ".js-teacher-detail", function() {
			let id = $(this).data('id');
			vm.showUser(id, "teacher");
		});

		vm.$table.on("click", ".js-student-detail", function() {
			let id = $(this).data('id');
			vm.showUser(id, "student");
		});

		vm.$table.on("click", ".js-course-edit", function() {
			let id = $(this).data('id');
			vm.showEdit(id);
		});

		var ep = new eventproxy();
		ep.all(["fetch_student_list", "fetch_teacher_list", "fetch_lesson_list"], function() {
			NProgress.done();
		});
		vm.fetchTeacherList(ep.done("fetch_teacher_list"));
		vm.fetchStudentList(ep.done("fetch_student_list"));
		vm.fetchLessonList(ep.done("fetch_lesson_list"));
	},
	methods: {
		fetchLessonList(callback) {
			let vm = this;
			NProgress.start();
			this.$store.dispatch("lesson:list", {
				success: function(result) {
					if (!result.code) {
						vm.table_data = result.data.lessons;
						vm.$table.bootstrapTable("load", vm.table_data);
					}
				},
				complete: function() {
					callback = callback || function() {

					};
					callback(null);
				}
			});
		},
		fetchStudentList(callback) {
			let vm = this;
			NProgress.start();
			this.$store.dispatch("user:list", {
				type: user_type.STUDENT,
				success: function(result) {
					if (!result.code) {
						result.data.users.forEach(function(item) {
							vm.student_map[item.id] = item;
						});
						vm.student_arr = result.data.users;
						vm.$table.bootstrapTable("load", vm.table_data);
					}
				},
				complete: function() {
					callback = callback || function() {

					};
					callback(null);
				}
			});
		},
		fetchTeacherList(callback) {
			let vm = this;
			NProgress.start();
			this.$store.dispatch("user:list", {
				type: user_type.TEACHER,
				success: function(result) {
					if (!result.code) {
						result.data.users.forEach(function(item) {
							vm.teacher_map[item.id] = item;
						});
						vm.teacher_arr = result.data.users;
						vm.$table.bootstrapTable("load", vm.table_data);
					}
				},
				complete: function() {
					callback = callback || function() {

					};
					callback(null);
				}
			});
		},
		requestForAdd() {
			let vm = this;
			this.$confirm_btn.button("loading");
			NProgress.start();
			this.$store.dispatch("lesson:add", {
				lesson: {
					teacher_id: vm.model_teacher_id,
					student_id: vm.model_student_id,
					name: vm.model_name,
					class_time: `${vm.model_class_time_week},${vm.model_class_time_start_time},${vm.model_class_time_end_time}`,
					start_date: vm.model_class_time_start_date,
					end_date: vm.model_class_time_end_date,
					class_room: vm.model_class_room
				},
				success: function(result) {
					if (!result.code) {
						vm.$course_modal.modal("hide");
						vm.fetchLessonList();
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
			this.$store.dispatch("lesson:edit", {
				lesson: {
					teacher_id: vm.model_teacher_id,
					student_id: vm.model_student_id,
					name: vm.model_name,
					class_time: `${vm.model_class_time_week},${vm.model_class_time_start_time},${vm.model_class_time_end_time}`,
					start_date: vm.model_class_time_start_date,
					end_date: vm.model_class_time_end_date,
					class_room: vm.model_class_room
				},
				id: vm.target_lesson.id,
				success: function(result) {
					if (!result.code) {
						vm.$course_modal.modal("hide");
						vm.fetchLessonList();
					}
				},
				complete: function() {
					NProgress.done();
					vm.$confirm_btn.button("reset");
				}
			});
		},
		showUser(id, type) {
			this.target_user = this[`${type}_map`][id];
			this.$user_modal.modal("show");
		},
		showAdd() {
			this.state = "add";
			this.reset();
			this.$course_modal.modal("show");
		},
		showEdit(id) {
			this.state = "edit";
			this.reset();
			console.log(id, this.table_data);
			this.target_lesson = this.table_data.find(function(item) {
				return item.id == id;
			});
			this._getDataFromTarget();
			this.$course_modal.modal("show");
		},
		reset() {
			this.warning_msg_arr = [];
			this.model_name = "";
			this.model_student_id = (this.student_arr[0] || {}).id;
			this.model_teacher_id = (this.teacher_arr[0] || {}).id;
			this.model_class_time_week = 1;
			this.model_class_time_start_time = "";
			this.model_class_time_end_time = "";
			this.model_class_time_start_date = "";
			this.model_class_time_end_date = "";
		},
		_getDataFromTarget() {
			this.model_name = this.target_lesson.name;
			this.model_student_id = this.target_lesson.student_id;
			this.model_teacher_id = this.target_lesson.teacher_id;
			this.model_class_time_week = this.target_lesson.class_time.split(",")[0];
			this.model_class_time_start_time = this.target_lesson.class_time.split(",")[1];
			this.model_class_time_end_time = this.target_lesson.class_time.split(",")[2];
			this.model_class_time_start_date = moment(this.target_lesson.start_date).format("YYYY-MM-DD");
			this.model_class_time_end_date = moment(this.target_lesson.end_date).format("YYYY-MM-DD");
			this.model_class_room = this.target_lesson.class_room;
		},
		_checkIsValid() {
			this.warning_msg_arr = [];
			if (!this.model_name) {
				this.warning_msg_arr.push("请输入课程名称");
			}
			if (typeof this.model_student_id === 'undefined') {
				this.warning_msg_arr.push("请选择教师");
			}
			if (typeof this.model_student_id === 'undefined') {
				this.warning_msg_arr.push("请选择学生");
			}
			if (typeof this.model_class_time_week === 'undefined') {
				this.warning_msg_arr.push("请选择上课日");
			}
			if (!this.model_class_time_start_time) {
				this.warning_msg_arr.push("请选择上课开始时间");
			}
			if (!this.model_class_time_end_time) {
				this.warning_msg_arr.push("请选择上课结束时间");
			}
			if (
				this.model_class_time_start_time
			&& 	this.model_class_time_end_time
			&& 	this.model_class_time_start_time >= this.model_class_time_end_time
			){
				this.warning_msg_arr.push("上课结束时间不得早于或等于上课开始时间");
			}
			if (!this.model_class_time_start_date) {
				this.warning_msg_arr.push("请选择上课开始日期");
			}
			if (!this.model_class_time_end_date) {
				this.warning_msg_arr.push("请选择上课结束日期");
			}
			if (
				this.model_class_time_start_date
			&& 	this.model_class_time_end_date
			&& 	this.model_class_time_start_date >= this.model_class_time_end_date
			){
				this.warning_msg_arr.push("上课结束日期不得早于或等于上课开始日期");
			}
			if (!this.model_class_room) {
				this.warning_msg_arr.push("请输入上课课室");
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
		},
		_disableKeypress(e) {
			e.preventDefault();
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
