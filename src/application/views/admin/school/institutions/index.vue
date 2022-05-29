<template>
	<AdminWrapper>
		<div>
			<div class="flex justify-end mb-4">
				<IonButton class="btn-primary" @click="openCreateInstitution">
					Add New Institution
				</IonButton>
			</div>
			<AdminInstitutionsList />
		</div>
	</AdminWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminWrapper from '@app/components/admin/AdminWrapper.vue'
import AdminInstitutionsList from '@app/components/school/institutions/AdminInstitutionsList.vue'
import { useSchoolModal } from '@app/composable/core/modals'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'AdminStudyInstitutions',
	components: { AdminWrapper, AdminInstitutionsList },
	beforeRouteEnter: generateMiddlewares(['isAdmin']),
	setup () {
		useRouteMeta('Institutions')
		return { openCreateInstitution: useSchoolModal().openCreateInstitution }
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
