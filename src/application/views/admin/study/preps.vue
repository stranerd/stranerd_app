<template>
	<AdminWrapper>
		<div>
			<div class="flex justify-end mb-8">
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

export default defineComponent({
	name: 'AdminStudyPreps',
	displayName: 'Administration',
	components: { AdminWrapper, AdminTestPrepsList },
	middlewares: ['isAdmin'],
	setup () {
		return { openCreateTestPrep: useStudyModal().openCreateTestPrep }
	}
})
</script>

<style scoped>
	ion-button {
		--padding-top: 1.6rem !important;
		--padding-bottom: 1.6rem !important;
		--padding-start: 2rem !important;
		--padding-end: 2rem !important;
	}
</style>
