<template>
	<NuxtLink to="/notifications">
		<span class="position-relative">
			<Icon
				class="head-icons"
				class-name="head-icons"
				size="s"
				icon-name="bell"
			/>
			<i
				v-if="notifications.filter((n) => !n.seen).length > 0"
				class="fas fa-circle text-danger position-absolute"
				style="top: 0; right: 0; font-size: 0.6em;"
			/>
		</span>
	</NuxtLink>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useNotificationList } from '@app/hooks/users/notifications'

export default defineComponent({
	name: 'NotificationBell',
	setup () {
		const { notifications, listener } = useNotificationList()
		onMounted(() => {
			if (!listener.isRunning.value) listener.startListener()
		})
		return { notifications }
	}
})
</script>

<style scoped lang="scss">
	.head-icons {
		color: white;
		@media (max-width: $md) {
			color: $color-primary-dark;
		}
	}
</style>
