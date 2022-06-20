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

<style scoped>
	ion-button {
		--padding-top: 1rem !important;
		--padding-bottom: 1rem !important;
		--padding-start: 1rem !important;
		--padding-end: 1rem !important;
	}
</style>
