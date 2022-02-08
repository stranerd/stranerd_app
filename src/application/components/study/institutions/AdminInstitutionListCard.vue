<template>
	<IonAccordion>
		<IonItem slot="header">
			<IonLabel class="uppercase text-[20px]">{{ institution.name }}</IonLabel>
		</IonItem>

		<IonList slot="content">
			<IonItem>
				<IonLabel />
				<a class="flex items-center gap-1 mr-4" @click.prevent="openCourseCreateModal(institution.id)">
					<IonIcon :icon="add" class="text-green" />
					<IonLabel>Add Course</IonLabel>
				</a>
				<a class="flex items-center gap-1 mr-4" @click.prevent="openInstitutionEditModal(institution)">
					<IonIcon :icon="pencil" class="text-orange" />
					<IonLabel>Edit Inst.</IonLabel>
				</a>
				<a class="flex items-center gap-1" @click.prevent="deleteInstitution">
					<IonIcon :icon="trash" class="text-red" />
					<IonLabel>Delete Inst.</IonLabel>
				</a>
			</IonItem>
			<IonItem v-for="course in institutionCourses" :key="course.hash">
				<IonLabel class="capitalize">{{ course.name }}</IonLabel>
				<a class="flex items-center gap-2 mr-4" @click.prevent="openCourseEditModal(course)">
					<IonIcon :icon="pencil" class="text-orange" />
					<IonLabel>Edit</IonLabel>
				</a>
				<a class="flex items-center gap-2" @click.prevent="deleteCourse(course)">
					<IonIcon :icon="trash" class="text-red" />
					<IonLabel>Delete</IonLabel>
				</a>
			</IonItem>
		</IonList>
		<PageLoading v-if="loading" />
		<PageLoading v-if="courseLoading" />
		<PageLoading v-if="deleteCourseLoading" />
	</IonAccordion>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { InstitutionEntity } from '@modules/study'
import { openInstitutionEditModal, useDeleteInstitution } from '@app/composable/study/institutions'
import { IonAccordion, IonItem, IonLabel, IonList } from '@ionic/vue'
import {
	openCourseCreateModal,
	openCourseEditModal,
	useCourseList,
	useDeleteCourse
} from '@app/composable/study/courses'
import { add, pencil, trash } from 'ionicons/icons'

export default defineComponent({
	name: 'AdminInstitutionListCard',
	props: {
		institution: {
			type: InstitutionEntity,
			required: true
		}
	},
	components: { IonAccordion, IonList, IonItem, IonLabel },
	setup (props) {
		const { loading, error, deleteInstitution } = useDeleteInstitution(props.institution)
		const { courses, loading: courseLoading } = useCourseList()
		const institutionCourses = computed(() => courses.value
			.filter((course) => course.institutionId === props.institution.id))
		const { loading: deleteCourseLoading, deleteCourse } = useDeleteCourse()
		return {
			loading, error, deleteInstitution, institutionCourses, courseLoading,
			openInstitutionEditModal,
			add, pencil, trash, openCourseCreateModal, openCourseEditModal,
			deleteCourseLoading, deleteCourse
		}
	}
})
</script>
