<template>
	<div>
		<form class="flex justify-between items-center mb-4 px-4 md:px-0" @submit.prevent="search">
			<IonInput v-model="detail" class="w-full"
				placeholder="Search users" />
		</form>
		<DisplayError :error="error" />
		<div v-if="fetched">
			<DisplayError v-if="users.length === 0" error="No user with such email exists" />
			<AdminsListCard v-for="user in users" :key="user.hash" :user="user" class="mb-4" />
			<hr class="my-0">
		</div>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminsListCard from '@app/components/users/admin/AdminsListCard.vue'
import { useSearchUsers } from '@app/composable/users'

export default defineComponent({
	name: 'UpgradeUserToAdmin',
	components: { AdminsListCard },
	setup () {
		const {
			loading, fetched, detail, users, error, search, reset
		} = useSearchUsers()
		return { loading, fetched, detail, users, error, search, reset }
	}
})
</script>
