<template>
	<AdminWrapper>
		<div>
			<div class="flex justify-end mb-4">
				<IonButton class="btn-primary" @click="openCreateTestPrep">Add New Test</IonButton>
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
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'AdminStudyPreps',
	components: { AdminWrapper, AdminTestPrepsList },
	beforeRouteEnter: generateMiddlewares(['isAdmin']),
	setup () {
		useRouteMeta('Preps', { back: true })
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
