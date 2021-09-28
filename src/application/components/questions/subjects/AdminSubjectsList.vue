<template>
	<div class="d-flex flex-column gap-1">
		<SubjectCard v-for="subject in subjects" :key="subject.hash" :subject="subject" />
		<DisplayWarning v-if="!loading && !error && subjects.length === 0" message="No subjects found" />
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useSubjectList } from '@app/hooks/questions/subjects'
import SubjectCard from '@app/components/questions/subjects/AdminSubjectsListCard.vue'

export default defineComponent({
	name: 'AdminSubjectsList',
	components: { SubjectCard },
	layout: 'admin',
	setup () {
		const { loading, error, subjects } = useSubjectList()
		return { loading, error, subjects }
	}
})
</script>
