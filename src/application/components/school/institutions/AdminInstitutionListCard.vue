<template>
	<IonAccordion>
		<IonItem slot="header">
			<IonLabel class="uppercase text-[20px]">{{ institution.name }}</IonLabel>
		</IonItem>

		<IonList slot="content">
			<IonItem>
				<IonLabel />
				<a class="flex items-center gap-1 mr-4 text-sub"
					@click.prevent="openCourseCreateModal(institution.id, null)">
					<IonIcon :icon="addOutline" class="text-green" />
					<IonLabel>Add General Course</IonLabel>
				</a>
				<a v-if="!institution.isGateway" class="flex items-center gap-1 mr-4 text-sub"
					@click.prevent="openFacultyCreateModal(institution.id)">
					<IonIcon :icon="addOutline" class="text-green" />
					<IonLabel>Add Faculty</IonLabel>
				</a>
				<a class="flex items-center gap-1 mr-4 text-sub" @click.prevent="openInstitutionEditModal(institution)">
					<IonIcon :icon="pencilOutline" class="text-orange" />
					<IonLabel>Edit Inst.</IonLabel>
				</a>
				<a class="flex items-center gap-1 text-sub" @click.prevent="deleteInstitution">
					<IonIcon :icon="trashOutline" class="text-red" />
					<IonLabel>Delete Inst.</IonLabel>
				</a>
			</IonItem>
			<IonAccordionGroup>
				<AdminFacultyListCard v-for="faculty in institutionFaculties" :key="faculty.hash" :faculty="faculty" />
				<IonAccordion>
					<IonItem slot="header">
						<IonLabel class="capitalize text-[18px]">General Courses</IonLabel>
					</IonItem>
					<IonList slot="content">
						<AdminCourseListCard v-for="course in institutionCourses" :key="course.hash" :course="course" />
					</IonList>
				</IonAccordion>
			</IonAccordionGroup>
		</IonList>
		<PageLoading v-if="loading" />
		<PageLoading v-if="courseLoading" />
		<PageLoading v-if="facultyLoading" />
	</IonAccordion>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { InstitutionEntity } from '@modules/school'
import { openInstitutionEditModal, useDeleteInstitution } from '@app/composable/school/institutions'
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList } from '@ionic/vue'
import { openCourseCreateModal, useCourseList } from '@app/composable/school/courses'
import { addOutline, pencilOutline, trashOutline } from 'ionicons/icons'
import { openFacultyCreateModal, useFacultyList } from '@app/composable/school/faculties'
import AdminFacultyListCard from '@app/components/school/faculties/AdminFacultyListCard.vue'
import AdminCourseListCard from '@app/components/school/courses/AdminCourseListCard.vue'

export default defineComponent({
	name: 'AdminInstitutionListCard',
	props: {
		institution: {
			type: InstitutionEntity,
			required: true
		}
	},
	components: {
		AdminCourseListCard,
		AdminFacultyListCard,
		IonAccordion,
		IonList,
		IonItem,
		IonLabel,
		IonAccordionGroup
	},
	setup (props) {
		const { loading, error, deleteInstitution } = useDeleteInstitution(props.institution)
		const { courses, loading: courseLoading } = useCourseList()
		const { faculties, loading: facultyLoading } = useFacultyList()
		const institutionFaculties = computed(() => faculties.value
			.filter((faculty) => faculty.institutionId === props.institution.id))
		const institutionCourses = computed(() => courses.value
			.filter((course) => course.institutionId === props.institution.id && course.facultyId === null))
		return {
			loading, error, deleteInstitution, institutionCourses, courseLoading,
			institutionFaculties, facultyLoading,
			addOutline, pencilOutline, trashOutline,
			openInstitutionEditModal, openCourseCreateModal, openFacultyCreateModal
		}
	}
})
</script>
