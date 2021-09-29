<template>
	<SideMenu :close="close" background-class="sd-menu-background" menu-class="sd-menu-right">
		<div class="head gap-1 text-primary">
			<div @click="close">
				<Icon
					class="text-primaryDark bright d-none d-sm-block "
					size="s"
					icon-name="close"
				/>
				<Icon
					class="text-primaryDark bright d-block d-sm-none"
					size="s"
					icon-name="close-thin"
				/>
			</div>

			<MessageLink :key="'messages' + isLoggedIn" class="d-inline d-md-none" />

			<NuxtLink v-if="isAdmin" to="/admin/">
				<Icon
					class="text-primaryDark bright"
					size="s"
					icon-name="admin"
				/>
			</NuxtLink>

			<div @click="signout">
				<Icon
					class="text-primaryDark bright"
					size="s"
					icon-name="logout"
				/>
			</div>
			<PageLoading v-if="loading" />
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
import { useAuth } from '@/application/hooks/auth/auth'
import { useSessionSignout } from '@/application/hooks/auth/session'
import MessageLink from '@app/components/layouts/topNavigations/MessageLink.vue'

export default defineComponent({
	name: 'RightSideMenu',
	components: { SideMenu, MessageLink },
	props: {
		modal: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { isLoggedIn, isAdmin } = useAuth()
		const { loading, error, signout } = useSessionSignout()
		return { isLoggedIn, isAdmin, loading, error, signout, close: () => modal.close(props.modal) }
	}
})
</script>

<style lang="scss" scoped>
	.head, /deep/ .head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1rem;
		background: $color-primaryDark;
		color: $color-white;
		padding: 0.75rem 1rem;
		@media (max-width: $md) {
			background: $color-white;
			border-bottom: 4px solid $color-primaryDark;
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
