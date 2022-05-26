<template>
	<AdminWrapper>
		<div v-if="faculty">
			<div class="flex mb-4 p-4">
				<span class="text-heading mr-auto uppercase">{{ faculty.name }}</span>
				<a class="flex items-center gap-1 mr-4 text-sub"
					@click.prevent="openDepartmentCreateModal(faculty.id)">
					<IonIcon :icon="addOutline" class="text-green" />
					<IonLabel>Add Department</IonLabel>
				</a>
				<a class="flex items-center gap-1 mr-4 text-sub" @click.prevent="openFacultyEditModal(faculty)">
					<IonIcon :icon="pencilOutline" class="text-orange" />
					<IonLabel>Edit Faculty</IonLabel>
				</a>
				<a class="flex items-center gap-1 text-sub" @click.prevent="deleteFaculty">
					<IonIcon :icon="trashOutline" class="text-red" />
					<IonLabel>Delete Faculty</IonLabel>
				</a>
			</div>
			<AdminDepartmentsList :facultyId="faculty.id" />
		</div>
	</AdminWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminWrapper from '@app/components/admin/AdminWrapper.vue'
import AdminDepartmentsList from '@app/components/school/departments/AdminDepartmentsList.vue'
import { useRoute } from 'vue-router'
import { openFacultyEditModal, useDeleteFaculty, useFaculty } from '@app/composable/school/faculties'
import { addOutline, pencilOutline, trashOutline } from 'ionicons/icons'
import { openDepartmentCreateModal } from '@app/composable/school/departments'

export default defineComponent({
	name: 'AdminStudyInstitutionsInstitutionIdFacultiesFacultyId',
	displayName: 'Faculty',
	components: { AdminWrapper, AdminDepartmentsList },
	middlewares: ['isAdmin'],
	setup () {
		const route = useRoute()
		const { facultyId, institutionId } = route.params
		const { loading, deleteFaculty } = useDeleteFaculty(facultyId as string)
		const { faculty } = useFaculty(institutionId as string, facultyId as string)
		return {
			addOutline, pencilOutline, trashOutline,
			faculty, loading, deleteFaculty,
			openFacultyEditModal, openDepartmentCreateModal
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
