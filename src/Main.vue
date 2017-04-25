<template>
    <div id="main">
        <sidebar/>
        <mainbar/>
    </div>
</template>

<script>

var getPassword = require("@/utils").getPassword;

module.exports = {
    name: 'main',
    components: {
        sidebar: require("@/components/sidebar"),
        mainbar: require("@/components/mainbar")
    },
    created() {
        let vm = this;
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
    }
}
</script>

<style lang="less" scoped>

</style>
