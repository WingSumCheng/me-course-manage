<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>

var getPassword = require("@/utils").getPassword;

module.exports = {
    name: 'app',
    created() {
        var phone = "15622323113",
            password = "123456";
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
