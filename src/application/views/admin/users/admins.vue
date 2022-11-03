<template>
	<AdminWrapper>
		<div>
			<div class="mb-4">
				<form class="flex justify-between items-center mb-4" @submit.prevent="search">
					<IonInput v-model="detail" class="w-full"
						placeholder="Search users" />
				</form>
				<DisplayError :error="error" />
				<div v-if="fetched">
					<DisplayError v-if="users.length === 0" error="No such user found" />
					<AdminsListCard v-for="user in users" :key="user.hash" :user="user" class="mb-4" />
					<hr class="my-0">
				</div>
				<PageLoading v-if="loading" />
			</div>
			<AdminsList />
		</div>
	</AdminWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminWrapper from '@app/components/admin/AdminWrapper.vue'
import AdminsList from '@app/components/users/admins/AdminsList.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import AdminsListCard from '@app/components/users/admins/AdminsListCard.vue'
import { useSearchUsers } from '@app/composable/users'

export default defineComponent({
	name: 'AdminUsersAdmins',
	components: { AdminWrapper, AdminsList, AdminsListCard },
	beforeRouteEnter: generateMiddlewares(['isAdmin']),
	setup () {
		useRouteMeta('Admins', { back: true })
		const {
			loading, fetched, detail, users, error, search, reset
		} = useSearchUsers()
		return { loading, fetched, detail, users, error, search, reset }
	}
})
</script>
