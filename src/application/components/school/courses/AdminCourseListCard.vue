<template>
	<IonItem>
		<IonLabel class="capitalize">{{ course.name }}</IonLabel>
		<a class="flex items-center gap-2 mr-4" @click.prevent="openCourseEditModal(course)">
			<IonIcon :icon="pencilOutline" class="text-orange" />
			<IonLabel>Edit</IonLabel>
		</a>
		<a class="flex items-center gap-2" @click.prevent="deleteCourse(course)">
			<IonIcon :icon="trashOutline" class="text-red" />
			<IonLabel>Delete</IonLabel>
		</a>
		<PageLoading v-if="loading" />
	</IonItem>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CourseEntity } from '@modules/school'
import { openCourseEditModal, useDeleteCourse } from '@app/composable/school/courses'
import { IonItem, IonLabel } from '@ionic/vue'
import { pencilOutline, trashOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'AdminCourseListCard',
	components: { IonItem, IonLabel },
	props: {
		course: {
			type: CourseEntity,
			required: true
		}
	},
	setup (props) {
		const { loading, deleteCourse } = useDeleteCourse(props.course)
		return {
			loading, deleteCourse, openCourseEditModal,
			trashOutline, pencilOutline
		}
	}
})
</script>
