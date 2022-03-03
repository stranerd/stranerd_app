<template>
	<div class="col-span-12 flex flex-col text-body">
		<div class="flex flex-col gap-3 lg:p-8 p-6 bg-white rounded-xl">
			<div class="flex flex-col gap-2 text-icon_inactive pb-3 border-b-1 border-new_gray">
				<h1 class="text-base text-main_dark font-bold pt-4">Bio</h1>
				<span class="text-main_dark text-base">{{ user.description || 'N/A' }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { UserEntity } from '@modules/users'

export default defineComponent({
	name: 'ProfileBio',
	props: {
		user: {
			required: true,
			type: UserEntity
		}
	},
	setup () {
		// TODO: Figure out school and course of study
		const { id } = useAuth()
		return { id }
	}
})
</script>
