<template>
	<IonAccordion>
		<IonItem slot="header">
			<IonLabel class="capitalize text-[18px]">{{ faculty.name }}</IonLabel>
		</IonItem>

		<IonList slot="content">
			<IonItem>
				<IonLabel />
				<a class="flex items-center gap-1 mr-4" @click.prevent="openDepartmentCreateModal(faculty.id)">
					<IonIcon :icon="addOutline" class="text-green" />
					<IonLabel>Add Department</IonLabel>
				</a>
				<a class="flex items-center gap-1 mr-4" @click.prevent="openFacultyEditModal(faculty)">
					<IonIcon :icon="pencilOutline" class="text-orange" />
					<IonLabel>Edit Faculty</IonLabel>
				</a>
				<a class="flex items-center gap-1" @click.prevent="deleteFaculty">
					<IonIcon :icon="trashOutline" class="text-red" />
					<IonLabel>Delete Faculty</IonLabel>
				</a>
			</IonItem>
			<IonAccordionGroup>
				<AdminDepartmentListCard v-for="department in facultyDepartments" :key="department.hash"
					:department="department" />
			</IonAccordionGroup>
		</IonList>
		<PageLoading v-if="loading" />
	</IonAccordion>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { FacultyEntity } from '@modules/school'
import { openFacultyEditModal, useDeleteFaculty } from '@app/composable/school/faculties'
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList } from '@ionic/vue'
import { addOutline, pencilOutline, trashOutline } from 'ionicons/icons'
import { openDepartmentCreateModal, useDepartmentList } from '@app/composable/school/departments'
import AdminDepartmentListCard from '@app/components/school/departments/AdminDepartmentListCard.vue'

export default defineComponent({
	name: 'AdminFacultyListCard',
	props: {
		faculty: {
			type: FacultyEntity,
			required: true
		}
	},
	components: { AdminDepartmentListCard, IonAccordionGroup, IonAccordion, IonList, IonItem, IonLabel },
	setup (props) {
		const { loading, error, deleteFaculty } = useDeleteFaculty(props.faculty)
		const { departments } = useDepartmentList(true)
		const facultyDepartments = computed(() => departments.value
			.filter((department) => department.facultyId === props.faculty.id))
		return {
			loading, error, deleteFaculty, openDepartmentCreateModal,
			openFacultyEditModal, facultyDepartments,
			addOutline, pencilOutline, trashOutline
		}
	}
})
</script>
