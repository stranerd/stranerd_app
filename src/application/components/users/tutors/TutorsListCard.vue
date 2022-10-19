<template>
	<div class="flex items-center justify-between w-full font-bold text-sm p-4">
		<div class="w-8/12 flex items-center gap-2">
			<Avatar :id="user.id" :name="user.bio.fullName" :size="24" :src="user.bio.photo" />
			<UserName :isTutor="user.roles.isStranerdTutor" :name="user.bio.fullName" />
		</div>
		<a v-if="user.roles.isStranerdTutor" class="w-3/12 font-bold text-right text-danger"
			@click.prevent="tutorUser(user, false)">
			Remove
		</a>
		<a v-else class="w-3/12 font-bold text-right text-success" @click.prevent="tutorUser(user, true)">
			Make Tutor
		</a>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTutorsList } from '@app/composable/users/roles/tutors'
import { UserEntity } from '@modules/users'

export default defineComponent({
	name: 'TutorsListCard',
	props: {
		user: {
			required: true,
			type: UserEntity
		}
	},
	setup () {
		const { loading, error, tutorUser } = useTutorsList()
		return { loading, error, tutorUser }
	}
})
</script>
