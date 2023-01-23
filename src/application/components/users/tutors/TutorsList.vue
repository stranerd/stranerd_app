<template>
	<div>
		<TutorsListCard v-for="tutor in tutors" :key="tutor.hash" :user="tutor" class="mb-4" />
		<EmptyState v-if="!loading && !error && tutors.length === 0" info="No tutors found" />
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import { useTutorsList } from '@app/composable/users/roles/tutors'
import TutorsListCard from '@app/components/users/tutors/TutorsListCard.vue'

const { loading, error, tutors } = useTutorsList()
</script>
