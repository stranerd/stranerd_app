<template>
	<div>
		<div class="notification-body">
			<Heading class="p-0 p-sm-1 p-md-3 text-dark border bottom border-line d-none d-sm-block" variant="1">
				Notifications
			</Heading>
			<NotificationsList class=" px-0-5 px-sm-1 px-md-3" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NotificationsList from '@app/components/users/notifications/NotificationsList.vue'

export default defineComponent({
	name: 'NotificationsPage',
	components: { NotificationsList },
	middleware: ['isAuthenticated'],
	setup () {
		// useMeta(() => ({
		// 	title: 'Your Notifications | Stranerd'
		// }))
		return {}
	},
	head: {}
})
</script>

<style lang="scss" scoped>
	.notification-body {
		background: $color-white;
		border: 1px solid $color-line;
		border-radius: 6px;
		@media (max-width: $sm) {
			border: none;
		}
	}
</style>
