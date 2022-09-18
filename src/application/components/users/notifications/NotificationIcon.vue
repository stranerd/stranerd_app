<template>
	<router-link class="relative leading-none" to="/account/notifications">
		<IonIcon :icon="notificationsOutline" />
		<span v-if="isLoggedIn && unReadCount.length"
			:style="`width: ${unReadCount.length + 0.5}ch; min-width: 2ch;max-width:3.1ch`"
			class="absolute bg-headerBg text-xs text-headerText aspect-square rounded-full flex items-center justify-center bottom-[50%] right-[50%] leading-none">
			<span>{{ unReadCount }}</span>
		</span>
	</router-link>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { notificationsOutline } from 'ionicons/icons'
import { useNotificationList } from '@app/composable/users/notifications'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'NotificationIcon',
	setup () {
		const { isLoggedIn } = useAuth()
		const { unRead } = useNotificationList()
		const unReadCount = computed(() => {
			if (unRead.value === 0) return ''
			return unRead.value > 99 ? '99+' : unRead.value.toString()
		})
		return { isLoggedIn, notificationsOutline, unReadCount }
	}
})
</script>
