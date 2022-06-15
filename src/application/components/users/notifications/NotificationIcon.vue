<template>
	<router-link class="relative text-sub leading-none" to="/notifications">
		<IonIcon :icon="notificationsOutline" class="text-heading2" />
		<span :style="`width: ${unReadCount.length + 0.5}ch;`"
			class="absolute bg-primaryBg text-primaryText aspect-square rounded-full flex items-center justify-center bottom-[50%] right-[50%] leading-none">
			<span>{{ unReadCount }}</span>
		</span>
	</router-link>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { notificationsOutline } from 'ionicons/icons'
import { useNotificationList } from '@app/composable/users/notifications'

export default defineComponent({
	name: 'NotificationIcon',
	setup () {
		const { notifications: allNotifications } = useNotificationList()
		const unReadCount = computed(() => {
			const count = allNotifications.value.filter((n) => !n.seen).length
			if (count === 0) return ''
			return count > 99 ? '99+' : count.toString()
		})
		return { notificationsOutline, unReadCount }
	}
})
</script>
