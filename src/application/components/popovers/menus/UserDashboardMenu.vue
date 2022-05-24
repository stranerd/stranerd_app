<template>
	<Popover>
		<router-link class="flex gap-2 items-center text-gray hover:text-secondaryText border-bottom-line card-padding"
			to="/account">
			<div class="w-48 flex items-center gap-3">
				<ion-icon :icon="personOutline" class="text-2xl"></ion-icon>
				<ion-label class="font-bold">Profile</ion-label>
			</div>
		</router-link>
		<router-link v-if="user?.isAdmin"
			class="flex gap-4 items-center text-gray hover:text-secondaryText border-bottom-line card-padding"
			to="/admin/">
			<div class="w-48 flex items-center gap-3">
				<ion-icon :icon="cogOutline" class="text-3xl"></ion-icon>
				<ion-label class="font-bold">Admin</ion-label>
			</div>
		</router-link>
		<router-link class="flex gap-2 items-center text-gray hover:text-secondaryText border-bottom-line card-padding"
			to="/study">
			<div class="w-48 flex items-center gap-3">
				<ion-icon :icon="libraryOutline" class="text-2xl"></ion-icon>
				<ion-label class="font-bold">Study</ion-label>
			</div>
		</router-link>
		<router-link class="flex gap-2 items-center text-gray hover:text-secondaryText border-bottom-line card-padding"
			to="/users/leaderboard">
			<div class="w-48 flex items-center gap-3">
				<ion-icon :icon="podiumOutline" class="text-3xl"></ion-icon>
				<ion-label class="font-bold">LeaderBoard</ion-label>
			</div>
		</router-link>
		<router-link v-if="user"
			class="flex gap-2 items-center text-gray hover:text-secondaryText border-bottom-line card-padding"
			to="/settings">
			<div class="w-48 flex items-center gap-3">
				<ion-icon :icon="settingsOutline" class="text-3xl"></ion-icon>
				<ion-label class="font-bold">Settings</ion-label>
			</div>
		</router-link>
		<div v-if="user" class="flex gap-2 items-center text-gray hover:text-secondaryText border-bottom-line card-padding"
			@click="signout()">
			<div class="w-48 flex items-center gap-3">
				<ion-icon :icon="logOutOutline" class="text-3xl"></ion-icon>
				<ion-label class="font-bold">Logout</ion-label>
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
