<template>
	<div :class="backgroundClass" class="sd-menu-background">
		<div class="sd-menu-under" @click="close" />
		<div :class="menuClass" class="sd-menu-sidebar">
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType } from '@nuxtjs/composition-api'
import { disableScroll, enableScroll } from '@utils/html'

export default defineComponent({
	name: 'SideMenu',
	props: {
		close: {
			type: Function as PropType<() => void>,
			required: true
		},
		backgroundClass: {
			type: String,
			required: false,
			default: ''
		},
		menuClass: {
			type: String,
			required: false,
			default: ''
		}
	},
	setup () {
		onMounted(disableScroll)
		onBeforeUnmount(enableScroll)
	}
})
</script>

<style lang="scss" scoped>
	.sd-menu-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100%;
		z-index: 100;
		overflow-y: auto;

		.sd-menu-under {
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100%;
		}

		.sd-menu-sidebar {
			display: flex;
			flex-direction: column;
			min-height: 100%;
			position: absolute;
			top: 0;
		}
	}
</style>
