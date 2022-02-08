<template>
	<div
		class="flex items-center justify-between w-full bg-white rounded-xl font-bold lg:text-base text-xs text-main_dark py-4 px-6">
		<div class="w-8/12 flex items-center gap-2">
			<avatar :id="user.id" :size="24" :src="user.avatar" color="#64778A" />
			<span>{{ user.fullName }}</span>
		</div>
		<a v-if="user.isAdmin" class="w-3/12 font-bold text-right text-red" @click.prevent="deAdminUser(user)">
			Remove
		</a>
		<a v-else class="w-3/12 font-bold text-right text-success" @click.prevent="adminUser(user)">
			Make Admin
		</a>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAdminRoles } from '@app/composable/users/roles/admins'
import { UserEntity } from '@modules/users'

export default defineComponent({
	name: 'AdminsListCard',
	props: {
		user: {
			required: true,
			type: UserEntity
		}
	},
	setup () {
		const { loading, error, deAdminUser, adminUser } = useAdminRoles()
		return { loading, error, deAdminUser, adminUser }
	}
})
</script>
