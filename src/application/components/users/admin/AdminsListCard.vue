<template>
	<div class="flex items-center justify-between w-full font-bold text-sub p-4">
		<div class="w-8/12 flex items-center gap-2">
			<avatar :id="user.id" :name="user.bio.fullName" :size="24" :src="user.bio.photo" />
			<span class="flex items-center gap-1">
				<span>{{ user.bio.fullName }}</span>
				<Verified :verified="user.isVerified" />
			</span>
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
import { useAdminsList } from '@app/composable/users/roles/admins'
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
		const { loading, error, deAdminUser, adminUser } = useAdminsList()
		return { loading, error, deAdminUser, adminUser }
	}
})
</script>
