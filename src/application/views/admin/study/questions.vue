<template>
	<AdminWrapper>
		<div>
			<div class="flex justify-end mb-4">
				<ion-button class="btn-primary" @click.prevent="openCreatePastQuestion">
					Add New Question
				</ion-button>
			</div>
			<AdminPastQuestionsList />
		</div>
	</AdminWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminWrapper from '@app/components/admin/AdminWrapper.vue'
import AdminPastQuestionsList from '@app/components/study/pastQuestions/AdminPastQuestionsList.vue'
import { useStudyModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'AdminStudyQuestions',
	displayName: 'Test Questions',
	components: { AdminPastQuestionsList, AdminWrapper },
	setup () {
		return {
			openCreatePastQuestion: useStudyModal().openCreatePastQuestion
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
