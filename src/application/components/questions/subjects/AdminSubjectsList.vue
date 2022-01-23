<template>
	<div>
		<SubjectCard v-for="subject in subjects" :key="subject.hash" :subject="subject" class="mb-4" />
		<EmptyState v-if="!loading && !error && subjects.length === 0" class="mb-4" info="No subjects found" />
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSubjectList } from '@app/composable/questions/subjects'
import SubjectCard from '@app/components/questions/subjects/AdminSubjectsListCard.vue'
import EmptyState from '@app/components/core/EmptyState.vue'

export default defineComponent({
	name: 'AdminSubjectsList',
	components: { EmptyState, SubjectCard },
	setup () {
		const { loading, error, subjects } = useSubjectList()
		return { loading, error, subjects }
	}
})
</script>
