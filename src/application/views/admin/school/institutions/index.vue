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
		useRouteMeta('Institutions', { back: true })
		return { openCreateInstitution: useSchoolModal().openCreateInstitution }
	}
})
</script>
