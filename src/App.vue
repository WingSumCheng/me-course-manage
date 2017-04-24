<template>
    <div id="app">
        <sidebar/>
        <mainbar/>
    </div>
</template>

<script>

var getPassword = require("@/utils").getPassword;

module.exports = {
    name: 'app',
    components: {
        sidebar: require("./components/sidebar"),
        mainbar: require("./components/mainbar")
    },
    created() {
        var phone = "15622323113",
            password = "admin";
        this.$store.dispatch("user:login", {
            phone: phone,
            password: getPassword(phone, password),
            success: function(result) {
                if (!result.code) {
                    console.log(result);
                }
            }
        });
    }
}
</script>

<style>

#app {
	min-height: 750px;
}

</style>
