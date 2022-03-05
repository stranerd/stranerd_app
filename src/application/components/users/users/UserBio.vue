<template>
	<div class="col-span-12 flex flex-col text-body bg-white rounded-xl">
		<div class="flex flex-col !gap-2 card-padding text-icon_inactive border-bottom-line">
			<h1 class="text-base text-main_dark font-bold">Bio</h1>
			<span class="text-main_dark text-sm">{{ user.description || 'N/A' }}</span>
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
