<template>
    <div id="login">
        <div id='login-modal-container modal-open'>
            <div class="modal in js-login-modal" style="display:block;">
                <div class="modal-dialog" role="document" style="margin: 150px auto;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">课程管理系统</h4>
                        </div>
                        <div class="modal-body">
                            <form class="form-horizontal">
                                <div class="form-group">
                                    <label for="phone" class="col-sm-2 control-label">手机 *</label>
                                    <div class="col-sm-10">
                                        <input
                                            class="form-control"
                                            id="phone"
                                            placeholder="手机"
                                            v-model="model_phone"
                                            maxLength="11"
                                        >
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="password" class="col-sm-2 control-label">密码 *</label>
                                    <div class="col-sm-10">
                                        <input
                                            class="form-control"
                                            id="password"
                                            placeholder="密码"
                                            v-model="model_password"
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
                            <button
                                class="btn btn-success js-confirm-btn"
                                style="width:120px"
                                @click="_confirmBtnClickEvent"
                                data-loading-text="提交中......"
                            >登录</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

var utils = require("./utils");

module.exports = {
    name: 'login',
    computed: {
        warning_msg: function() {
            return this.warning_msg_arr.join("</br>");
        }
    },
    data() {
        return {
            model_phone: "",
            model_password: "",

            warning_msg_arr: [],

            $confirm_btn: null,

            confirm_btn_selector: ".js-confirm-btn"
        }
    },
    mounted() {
        this.$confirm_btn = $(this.confirm_btn_selector);
    },
    methods: {
        requestForLogin() {
            let vm = this;
            NProgress.start();
            this.$confirm_btn.button("loading");
            this.$store.dispatch("user:login", {
                phone: vm.model_phone,
                password: utils.getPassword(vm.model_phone, vm.model_password),
                success: function(result) {
                    if (!result.code) {
                        let path = vm.$route.query.to || "/main/user/info"
                        vm.$router.push(path);
                    }
                },
                complete: function() {
                    NProgress.done();
                    vm.$confirm_btn.button("reset");
                }
            });
        },
        _checkIsValid() {
            this.warning_msg_arr = [];
            if (!utils.testPhone(this.model_phone)) {
                this.warning_msg_arr.push("请输入正确的11位手机号码");
            }
            if (!this.model_password) {
                this.warning_msg_arr.push("请输入密码");
            }
            return this.warning_msg_arr.length === 0;
        },
        _confirmBtnClickEvent() {
            if (!this._checkIsValid()) {
                return;
            }
            this.requestForLogin();
        }
    }
}
</script>

<style lang="less">

.background-norm(@elem: "none") {
    background-repeat: no-repeat;
    background-position: center;
}

html, body, #app {
    height: 100%;
}

#login {
    width: 100%;
    min-width: 1280px;
    height: 100%;
    min-height: 750px;
    background-size: 100% 100%;
    background-image: url("./assets/bg.png");
}

</style>
