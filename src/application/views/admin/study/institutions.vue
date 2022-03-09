<template>
	<AdminWrapper>
		<div>
			<div class="flex justify-end mb-4">
				<ion-button class="btn-primary" @click="openCreateInstitution">
					Add New Institution
				</ion-button>
			</div>
			<AdminInstitutionsList />
		</div>
	</AdminWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminWrapper from '@app/components/admin/AdminWrapper.vue'
import AdminInstitutionsList from '@app/components/study/institutions/AdminInstitutionsList.vue'
import { useStudyModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'AdminStudyInstitutions',
	displayName: 'Institutions',
	components: { AdminWrapper, AdminInstitutionsList },
	middlewares: ['isAdmin'],
	setup () {
		return {
			openCreateInstitution: useStudyModal().openCreateInstitution
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
