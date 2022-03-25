<template>
	<IonAccordion>
		<IonItem slot="header">
			<IonLabel class="capitalize text-[18px]">{{ department.name }}</IonLabel>
		</IonItem>

		<IonList slot="content">
			<IonItem>
				<IonLabel />
				<a class="flex items-center gap-1 mr-4"
					@click.prevent="openCourseCreateModal(department.institutionId, department.id)">
					<IonIcon :icon="addOutline" class="text-green" />
					<IonLabel>Add Course</IonLabel>
				</a>
				<a class="flex items-center gap-1 mr-4" @click.prevent="openDepartmentEditModal(department)">
					<IonIcon :icon="pencilOutline" class="text-orange" />
					<IonLabel>Edit Department</IonLabel>
				</a>
				<a class="flex items-center gap-1" @click.prevent="deleteDepartment">
					<IonIcon :icon="trashOutline" class="text-red" />
					<IonLabel>Delete Department</IonLabel>
				</a>
			</IonItem>
			<AdminCourseListCard v-for="course in departmentCourses" :key="course.hash" :course="course" />
		</IonList>
		<PageLoading v-if="loading" />
		<PageLoading v-if="courseLoading" />
	</IonAccordion>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { DepartmentEntity } from '@modules/school'
import { openDepartmentEditModal, useDeleteDepartment } from '@app/composable/school/departments'
import { IonAccordion, IonItem, IonLabel, IonList } from '@ionic/vue'
import { addOutline, pencilOutline, trashOutline } from 'ionicons/icons'
import { openCourseCreateModal, useCourseList } from '@app/composable/school/courses'
import AdminCourseListCard from '@app/components/school/courses/AdminCourseListCard.vue'

export default defineComponent({
	name: 'AdminDepartmentListCard',
	props: {
		department: {
			type: DepartmentEntity,
			required: true
		}
	},
	components: { IonAccordion, IonList, IonItem, IonLabel, AdminCourseListCard },
	setup (props) {
		const { loading, error, deleteDepartment } = useDeleteDepartment(props.department)
		const { courses, loading: courseLoading } = useCourseList()
		const departmentCourses = computed(() => courses.value
			.filter((course) => course.departmentId === props.department.id))
		return {
			loading, error, deleteDepartment, openCourseCreateModal,
			openDepartmentEditModal, departmentCourses, courseLoading,
			addOutline, pencilOutline, trashOutline
		}
	}
})
</script>
