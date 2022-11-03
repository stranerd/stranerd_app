<template>
	<div class="flex items-center justify-between w-full font-bold text-sm card-sm card-padding !gap-0">
		<div class="w-8/12 flex items-center gap-2">
			<Avatar :id="user.id" :name="user.bio.fullName" :size="24" :src="user.bio.photo" />
			<UserName :isTutor="user.roles.isStranerdTutor" :name="user.bio.fullName" />
		</div>
		<a v-if="user.roles.isStranerdAdmin" class="w-3/12 font-bold text-right text-danger"
			@click.prevent="adminUser(user, false)">
			Remove
		</a>
		<a v-else class="w-3/12 font-bold text-right text-success" @click.prevent="adminUser(user, true)">
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
		const { loading, error, adminUser } = useAdminsList()
		return { loading, error, adminUser }
	}
})
</script>
