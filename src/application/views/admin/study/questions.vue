<template>
	<AdminWrapper>
		<div>
			<div class="flex justify-end mb-8">
				<ion-button class="btn-primary">Add New Question</ion-button>
			</div>
			<AdminPastQuestionsList />
		</div>
	</AdminWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminWrapper from '@app/components/admin/AdminWrapper.vue'
import AdminPastQuestionsList from '@app/components/study/pastQuestions/AdminPastQuestionsList.vue'

export default defineComponent({
	name: 'AdminStudyQuestions',
	displayName: 'Administration',
	components: { AdminPastQuestionsList, AdminWrapper },
	setup () {
		return {}
	}
})
</script>

<style scoped>
	ion-button {
		--padding-top: 1.7rem !important;
		--padding-bottom: 1.7rem !important;
	}
</style>
