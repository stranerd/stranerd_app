<template>
	<div class="flex flex-col gap-1 gap-md-2">
		<SubjectForm :error="error" :factory="factory" :loading="loading" :submit="createSubject">
			<template slot="buttonText">
				Add
			</template>
		</SubjectForm>
		<SubjectsList />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SubjectsList from '@/application/components/questions/subjects/AdminSubjectsList.vue'
import { useCreateSubject } from '@/application/hooks/questions/subjects'
import SubjectForm from '@/application/components/questions/subjects/SubjectForm.vue'

export default defineComponent({
	name: 'AdminQuestionsSubjectsPage',
	components: { SubjectsList, SubjectForm },
	layout: 'admin',
	setup () {
		const { loading, createSubject, factory, error } = useCreateSubject()
		return { loading, createSubject, factory, error }
	},
	head: {}
})
</script>
