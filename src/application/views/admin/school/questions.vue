<template>
	<AdminWrapper>
		<div>
			<div class="flex justify-end mb-4">
				<IonButton class="btn-primary" @click.prevent="openCreatePastQuestion">
					Add New Question
				</IonButton>
			</div>
			<AdminPastQuestionsList />
		</div>
	</AdminWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminWrapper from '@app/components/admin/AdminWrapper.vue'
import AdminPastQuestionsList from '@app/components/school/pastQuestions/AdminPastQuestionsList.vue'
import { useSchoolModal } from '@app/composable/core/modals'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'AdminStudyQuestions',
	components: { AdminPastQuestionsList, AdminWrapper },
	setup () {
		useRouteMeta('Test Questions', { back: true })
		return {
			openCreatePastQuestion: useSchoolModal().openCreatePastQuestion
		}
	}
})
</script>
