<template>
    <div id="app">
        <transition :name="'page-fade'" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>

var getPassword = require("@/utils").getPassword;

module.exports = {
    name: 'app',
    created() {}
}
</script>

<style>

#app {
	min-height: 750px;
}

</style>
