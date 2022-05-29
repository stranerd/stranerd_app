<template>
	<AdminWrapper>
		<div>
			<div class="flex justify-end mb-4">
				<ion-button class="btn-primary" @click="openCreateTestPrep">Add New Test</ion-button>
			</div>
			<AdminTestPrepsList />
		</div>
	</AdminWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminWrapper from '@app/components/admin/AdminWrapper.vue'
import AdminTestPrepsList from '@app/components/study/testPreps/AdminTestPrepsList.vue'
import { useStudyModal } from '@app/composable/core/modals'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'AdminStudyPreps',
	displayName: 'Preps',
	components: { AdminWrapper, AdminTestPrepsList },
	beforeRouteEnter: generateMiddlewares(['isAdmin']),
	setup () {
		return { openCreateTestPrep: useStudyModal().openCreateTestPrep }
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
