<template>
	<SideMenu :close="close" background-class="sd-menu-background" menu-class="sd-menu-left">
		<div class="head gap-1">
			<Logo :secondary="true" class="bright" />
			<div @click="close">
				<Icon
					class="text-primary-dark bright d-none d-sm-block "
					size="s"
					icon-name="close"
				/>
				<Icon
					class="text-primary-dark bright d-block d-sm-none"
					size="s"
					icon-name="close-thin"
				/>
			</div>
		</div>
		<div class="d-flex flex-column flex-grow-1">
			<slot />
		</div>
	</SideMenu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { modal } from '@/application/hooks/core/modals'
import SideMenu from '@app/components/core/modals/SideMenu.vue'

export default defineComponent({
	name: 'LeftSideMenu',
	components: { SideMenu },
	props: {
		modal: {
			type: String,
			required: true
		}
	},
	setup (props) {
		return { close: () => modal.close(props.modal) }
	}
})
</script>

<style lang="scss" scoped>
	.head, /deep/ .head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1.4rem;
		background: $color-primary-dark;
		color: $color-white;
		padding: 0.75rem 1rem;
		@media (max-width: $md) {
			background: $color-white;
			border-bottom: 4px solid $color-primary-dark;
			padding: 0.63rem 1.875rem;
		}
		@media (max-width: $sm) {
			padding: 0.75rem 2.125rem;
			border-bottom: 1px solid $color-line;
		}
	}

	.bright {
		@media (min-width: $md) {
			filter: brightness(1000%);
		}
	}
</style>
