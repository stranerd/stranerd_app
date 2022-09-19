<template>
	<div class="flex gap-6 items-center text-lg">
		<IonIcon :icon="addCircleOutline" @click="openModal" />
		<NotificationIcon :key="user?.id" />
		<router-link class="flex items-center" to="/settings">
			<IonIcon :icon="settingsOutline" />
		</router-link>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { addCircleOutline, arrowBackOutline, searchOutline, settingsOutline } from 'ionicons/icons'
import NotificationIcon from '@app/components/users/notifications/NotificationIcon.vue'
import { useAuth } from '@app/composable/auth/auth'
import { useUserModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'DesktopTopbar',
	components: { NotificationIcon },
	setup () {
		const { user } = useAuth()
		const openModal = () => useUserModal().openFabMenu()
		return { user, openModal, arrowBackOutline, searchOutline, settingsOutline, addCircleOutline }
	}
})
</script>
