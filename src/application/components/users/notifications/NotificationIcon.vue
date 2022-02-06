<template>
	<span class="flex items-center">
		<IonIcon :class="{'text-red': hasUnread}" :icon="notifications" />
	</span>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { notifications } from 'ionicons/icons'
import { useNotificationList } from '@app/composable/users/notifications'

export default defineComponent({
	name: 'NotificationIcon',
	setup () {
		const { notifications: allNotifications } = useNotificationList()
		const hasUnread = computed(() => allNotifications.value.filter((n) => !n.seen).length > 0)
		return { notifications, hasUnread }
	}
})
</script>
