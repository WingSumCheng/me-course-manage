<template>
	<div
		class='siderbar-link'
		:class="{
			'choose': $route.path === link
		}"
		@click="$router.push(`${link}`)"
	>
		<slot>{{name}}</slot>
	</div>
</template>

<script>

module.exports = {
	name: 'siderbar-link',
	props: {
		link: String,
		name: String
	}
}

</script>

<style lang="less" scoped>

.transition (@time: .3s) {
    -webkit-transition: all @time ease-in-out;
    -moz-transition: all @time ease-in-out;
    -ms-transition: all @time ease-in-out;
    -o-transition: all @time ease-in-out;
    transition: all @time ease-in-out;
    -webkit-backface-visibility: hidden;
    -webkit-perspective: 1000;
    -moz-backface-visibility: hidden;
    -moz-perspective: 1000;
    backface-visibility: hidden;
    perspective: 1000;
}

.siderbar-link {
	cursor: pointer;
	.transition(.2s);
	&.choose, &:hover {
		background-color: #88B14B;
	}
}

</style>
