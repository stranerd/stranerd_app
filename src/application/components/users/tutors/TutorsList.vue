<template>
	<div>
		<TutorsListCard v-for="tutor in tutors" :key="tutor.hash" :user="tutor" class="mb-4" />
		<EmptyState v-if="!loading && !error && tutors.length === 0" info="No tutors found" />
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTutorsList } from '@app/composable/users/roles/tutors'
import TutorsListCard from '@app/components/users/tutors/TutorsListCard.vue'

export default defineComponent({
	name: 'TutorsList',
	components: { TutorsListCard },
	setup () {
		const { loading, error, tutors } = useTutorsList()
		return { loading, error, tutors }
	}
})
</script>
