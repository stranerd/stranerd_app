<template>
	<AdminWrapper>
		<div v-if="institution">
			<div class="flex mb-4 p-4">
				<span class="text-xl mr-auto uppercase">{{ institution.name }}</span>
				<a class="flex items-center gap-1 mr-4 text-sm"
					@click.prevent="openCourseCreateModal(institution.id, null)">
					<IonIcon :icon="addOutline" class="text-success" />
					<IonLabel>Add General Course</IonLabel>
				</a>
				<a v-if="!institution.isGateway" class="flex items-center gap-1 mr-4 text-sm"
					@click.prevent="openFacultyCreateModal(institution.id)">
					<IonIcon :icon="addOutline" class="text-success" />
					<IonLabel>Add Faculty</IonLabel>
				</a>
				<a class="flex items-center gap-1 mr-4 text-sm" @click.prevent="openInstitutionEditModal(institution)">
					<IonIcon :icon="pencilOutline" class="text-warning" />
					<IonLabel>Edit Inst.</IonLabel>
				</a>
				<a class="flex items-center gap-1 text-sm" @click.prevent="deleteInstitution">
					<IonIcon :icon="trashBinOutline" class="text-danger" />
					<IonLabel>Delete Inst.</IonLabel>
				</a>
			</div>
			<AdminGeneralCoursesList :institutionId="institution.id" class="mb-4" />
			<AdminFacultiesList v-if="!institution.isGateway" :institutionId="institution.id" />
		</div>
	</AdminWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminWrapper from '@app/components/admin/AdminWrapper.vue'
import AdminFacultiesList from '@app/components/school/faculties/AdminFacultiesList.vue'
import AdminGeneralCoursesList from '@app/components/school/courses/AdminGeneralCoursesList.vue'
import { useRoute } from 'vue-router'
import { openInstitutionEditModal, useDeleteInstitution, useInstitution } from '@app/composable/school/institutions'
import { addOutline, pencilOutline, trashBinOutline } from 'ionicons/icons'
import { openFacultyCreateModal } from '@app/composable/school/faculties'
import { openCourseCreateModal } from '@app/composable/school/courses'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'AdminStudyInstitutionsInstitutionId',
	components: { AdminWrapper, AdminFacultiesList, AdminGeneralCoursesList },
	beforeRouteEnter: generateMiddlewares(['isAdmin']),
	setup () {
		useRouteMeta('Institution', { back: true })
		const route = useRoute()
		const { institutionId } = route.params
		const { loading, deleteInstitution } = useDeleteInstitution(institutionId as string)
		const { institution } = useInstitution(institutionId as string)
		return {
			addOutline, pencilOutline, trashBinOutline,
			institution, loading, deleteInstitution,
			openInstitutionEditModal, openCourseCreateModal, openFacultyCreateModal
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
