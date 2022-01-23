<template>
	<div>
		<form class="flex justify-between mb-4" @submit.prevent="getUsersByEmail">
			<ion-input v-model="email" class="bg-white border border-faded_gray !p-0 w-full"
				placeholder="Enter user's email address" />
			<ion-button :disabled="loading || !email" class="btn-primary" type="submit">
				Find Users
			</ion-button>
		</form>
		<DisplayError :error="error" />
		<div v-if="fetched" class="flex flex-column">
			<DisplayError v-if="users.length === 0" error="No user with such email exists" />
			<AdminsListCard v-for="user in users" :key="user.hash" :user="user" class="mb-4" />
			<hr class="my-0">
		</div>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAdminRoles } from '@app/composable/users/roles/admins'
import AdminsListCard from '@app/components/users/admin/AdminsListCard.vue'

export default defineComponent({
	name: 'UpgradeUserToAdmin',
	components: { AdminsListCard },
	setup () {
		const {
			loading, fetched, email, users, error,
			getUsersByEmail, adminUser, reset
		} = useAdminRoles()
		return {
			loading, fetched, email, users, error,
			getUsersByEmail, adminUser, reset
		}
	}
})
</script>

<style scoped>
	ion-button.btn-primary {
		--padding-top: 1.7rem !important;
		--padding-bottom: 1.7rem !important;
		--border-radius: 0 0.75rem 0.75rem 0 !important;
	}

	ion-input {
		--padding-top: 1rem !important;
		--padding-bottom: 1rem !important;
		border-bottom-right-radius: 0 !important;
		border-top-right-radius: 0 !important;
	}
</style>
