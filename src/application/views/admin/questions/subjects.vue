<template>
	<AdminWrapper>
		<div>
			<SubjectForm :error="error" :factory="factory" :loading="loading" :submit="createSubject" class="mb-8">
				<template v-slot:buttonText>Add Subject</template>
			</SubjectForm>

			<AdminSubjectsList />
		</div>
	</AdminWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminWrapper from '@app/components/admin/AdminWrapper.vue'
import AdminSubjectsList from '@app/components/questions/subjects/AdminSubjectsList.vue'
import { useCreateSubject } from '@app/composable/questions/subjects'
import SubjectForm from '@app/components/questions/subjects/SubjectForm.vue'

export default defineComponent({
	name: 'AdminQuestionsSubjects',
	displayName: 'Subjects',
	components: { AdminWrapper, AdminSubjectsList, SubjectForm },
	middlewares: ['isAdmin'],
	setup () {
		const { loading, createSubject, factory, error } = useCreateSubject()
		return { loading, createSubject, factory, error }
	}
})
</script>
