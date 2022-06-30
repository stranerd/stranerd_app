<template>
	<AdminWrapper>
		<div v-if="department">
			<div class="flex mb-4 p-4">
				<span class="text-xl mr-auto uppercase">{{ department.name }}</span>
				<a class="flex items-center gap-1 mr-4 text-sm"
					@click.prevent="openCourseCreateModal(department.institutionId, department.id)">
					<IonIcon :icon="addOutline" class="text-success" />
					<IonLabel>Add Course</IonLabel>
				</a>
				<a class="flex items-center gap-1 mr-4 text-sm" @click.prevent="openDepartmentEditModal(department)">
					<IonIcon :icon="pencilOutline" class="text-warning" />
					<IonLabel>Edit Department</IonLabel>
				</a>
				<a class="flex items-center gap-1 text-sm" @click.prevent="deleteDepartment">
					<IonIcon :icon="trashBinOutline" class="text-danger" />
					<IonLabel>Delete Department</IonLabel>
				</a>
			</div>
			<AdminCoursesList :departmentId="department.id" />
		</div>
	</AdminWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminWrapper from '@app/components/admin/AdminWrapper.vue'
import AdminCoursesList from '@app/components/school/courses/AdminCoursesList.vue'
import { useRoute } from 'vue-router'
import { openDepartmentEditModal, useDeleteDepartment, useDepartment } from '@app/composable/school/departments'
import { addOutline, pencilOutline, trashBinOutline } from 'ionicons/icons'
import { openCourseCreateModal } from '@app/composable/school/courses'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'AdminStudyInstitutionsInstitutionIdDepartmentsDepartmentIdDepartmentsDepartmentId',
	components: { AdminWrapper, AdminCoursesList },
	beforeRouteEnter: generateMiddlewares(['isAdmin']),
	setup () {
		useRouteMeta('Department', { back: true })
		const route = useRoute()
		const { departmentId, institutionId } = route.params
		const { loading, deleteDepartment } = useDeleteDepartment(departmentId as string)
		const { department } = useDepartment(institutionId as string, departmentId as string)
		return {
			addOutline, pencilOutline, trashBinOutline,
			department, loading, deleteDepartment,
			openDepartmentEditModal, openCourseCreateModal
		}
	}
})
</script>
