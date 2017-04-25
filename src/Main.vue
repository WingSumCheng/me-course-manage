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
        console.log(this);
    }
}
</script>

<style lang="less" scoped>

</style>
