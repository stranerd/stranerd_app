<template>
	<div class="flex gap-6 items-center text-lg">
		<IonIcon :icon="addCircleOutline" @click="openModal" />
		<NotificationIcon :key="user?.id" />
		<router-link class="flex items-center" to="/settings">
			<IonIcon :icon="settingsOutline" />
		</router-link>
	</div>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import { addCircleOutline, arrowBackOutline, searchOutline, settingsOutline } from 'ionicons/icons'
import NotificationIcon from '@app/components/users/notifications/NotificationIcon.vue'
import { useAuth } from '@app/composable/auth/auth'
import { useUserModal } from '@app/composable/core/modals'

const { user } = useAuth()
const openModal = () => useUserModal().openFabMenu()
</script>
