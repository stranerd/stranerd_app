<template>
	<Popover class="flex flex-col">
		<router-link class="py-2 my-2 mx-auto flex gap-4 items-center text-gray hover:text-main_dark"
			to="/account">
			<div class="w-48 flex items-center gap-3">
				<ion-icon :icon="person" class="text-2xl"></ion-icon>
				<ion-label class="font-bold">Profile</ion-label>
			</div>
		</router-link>
		<router-link v-if="isAdmin" class="py-2 my-2 mx-auto flex gap-4 items-center text-gray hover:text-main_dark"
			to="/admin/">
			<div class="w-48 flex items-center gap-3">
				<ion-icon :icon="cog" class="text-3xl"></ion-icon>
				<ion-label class="font-bold">Admin</ion-label>
			</div>
		</router-link>
		<router-link class="py-2 my-2 mx-auto flex gap-4 items-center text-gray hover:text-main_dark"
			to="/study">
			<div class="w-48 flex items-center gap-3">
				<ion-icon :icon="library" class="text-2xl"></ion-icon>
				<ion-label class="font-bold">Study</ion-label>
			</div>
		</router-link>
		<router-link class="py-2 my-2 mx-auto flex gap-4 items-center text-gray hover:text-main_dark"
			to="/users/leaderboard">
			<div class="w-48 flex items-center gap-3">
				<ion-icon :icon="podium" class="text-3xl"></ion-icon>
				<ion-label class="font-bold">LeaderBoard</ion-label>
			</div>
		</router-link>
		<router-link v-if="user" :to="`/users/${user.id}/settings`"
			class="py-2 my-2 mx-auto flex gap-4 items-center text-gray hover:text-main_dark">
			<div class="w-48 flex items-center gap-3">
				<ion-icon :icon="settings" class="text-3xl"></ion-icon>
				<ion-label class="font-bold">Settings</ion-label>
			</div>
		</router-link>
		<div class="py-2 my-2 mx-auto flex gap-4 items-center text-gray hover:text-main_dark"
			@click="signout()">
			<div class="w-48 flex items-center gap-3">
				<ion-icon :icon="logOut" class="text-3xl"></ion-icon>
				<ion-label class="font-bold">Logout</ion-label>
			</div>
		</div>

		<PageLoading v-if="loading" />
	</Popover>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { cog, library, logOut, person, podium, settings } from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'
import { useSessionSignout } from '@app/composable/auth/session'

export default defineComponent({
	name: 'UserDashboardMenu',
	setup () {
		const { user, isAdmin } = useAuth()
		const { signout, loading } = useSessionSignout()
		return {
			cog, library, logOut, person, podium, settings,
			isAdmin, user, signout, loading
		}
	}
})
</script>
