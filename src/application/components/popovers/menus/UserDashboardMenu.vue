<template>
	<Popover>
		<router-link class="flex gap-2 items-center text-gray hover:text-secondaryText border-bottom-line card-padding"
			to="/account">
			<div class="w-48 flex items-center gap-3">
				<IonIcon :icon="personOutline" class="text-3xl" />
				<IonLabel class="font-bold">Profile</IonLabel>
			</div>
		</router-link>
		<router-link v-if="user?.isAdmin"
			class="flex gap-4 items-center text-gray hover:text-secondaryText border-bottom-line card-padding"
			to="/admin/">
			<div class="w-48 flex items-center gap-3">
				<IonIcon :icon="cogOutline" class="text-3xl" />
				<IonLabel class="font-bold">Admin</IonLabel>
			</div>
		</router-link>
		<router-link class="flex gap-2 items-center text-gray hover:text-secondaryText border-bottom-line card-padding"
			to="/study">
			<div class="w-48 flex items-center gap-3">
				<IonIcon :icon="libraryOutline" class="text-3xl" />
				<IonLabel class="font-bold">Study</IonLabel>
			</div>
		</router-link>
		<router-link class="flex gap-2 items-center text-gray hover:text-secondaryText border-bottom-line card-padding"
			to="/users/leaderboard">
			<div class="w-48 flex items-center gap-3">
				<IonIcon :icon="podiumOutline" class="text-3xl" />
				<IonLabel class="font-bold">LeaderBoard</IonLabel>
			</div>
		</router-link>
		<router-link v-if="user"
			class="flex gap-2 items-center text-gray hover:text-secondaryText border-bottom-line card-padding"
			to="/settings">
			<div class="w-48 flex items-center gap-3">
				<IonIcon :icon="settingsOutline" class="text-3xl" />
				<IonLabel class="font-bold">Settings</IonLabel>
			</div>
		</router-link>
		<div v-if="user"
			class="flex gap-2 items-center text-gray hover:text-secondaryText border-bottom-line card-padding"
			@click="signout()">
			<div class="w-48 flex items-center gap-3">
				<IonIcon :icon="logOutOutline" class="text-3xl" />
				<IonLabel class="font-bold">Logout</IonLabel>
			</div>
		</div>

		<PageLoading v-if="loading" />
	</Popover>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
	cogOutline,
	libraryOutline,
	logOutOutline,
	personOutline,
	podiumOutline,
	settingsOutline
} from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'
import { useSessionSignout } from '@app/composable/auth/session'

export default defineComponent({
	name: 'UserDashboardMenu',
	setup () {
		const { user } = useAuth()
		const { signout, loading } = useSessionSignout()
		return {
			cogOutline, libraryOutline, logOutOutline, personOutline, podiumOutline, settingsOutline,
			user, signout, loading
		}
	}
})
</script>
