<template>
	<div id='mainbar'>
		<div class='mainbar-content'>
			<transition :name="transitionName" mode="out-in">
                <router-view></router-view>
            </transition>
		</div>
	</div>
</template>

<script>

module.exports = {
	name: 'mainbar',
	data() {
		return {
			transitionName: "page-fade"
		}
	}
}

</script>

<style lang="less" scoped>

#mainbar {
	margin-left: 200px;
	.mainbar-content {
		margin: 0 60px;
		padding: 50px 0;
		min-width: 960px;
	}
}

</style>
