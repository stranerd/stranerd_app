<template>
	<DefaultLayout :hideFab="true">
		<div class="flex flex-col gap-6 page-padding">
			<div class="flex gap-2 items-center">
				<IonInput v-model="course"
					class="flex-grow" placeholder="Enter course"
					@keydown.enter.prevent="addCourse" />
				<IonButton class="btn-primary" @click="addCourse">
					<IonIcon slot="icon-only" :icon="addOutline" />
				</IonButton>
			</div>
			<div v-for="(course, index) in factory.courses" :key="index + course"
				class="flex gap-4 items-center justify-between">
				<span class="truncate flex-grow">{{ course }}</span>
				<IonIcon :icon="trashBinOutline" class="text-danger"
					@click="factory.removeCourse(course)" />
			</div>
			<IonButton :disabled="loading || !factory.valid" class="w-full btn-primary" @click.prevent="editClass">
				<SpinLoading v-if="loading" />
				<span v-else>Save</span>
			</IonButton>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { getEditingClass, useEditClass } from '@app/composable/classes/classes'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import { addOutline, trashBinOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'ClassesClassIdCourses',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', async ({ to }) => {
		const { id } = useAuth()
		const { classId = '' } = to.params
		const classInst = getEditingClass()
		if (!classInst || classInst.id !== classId) return `/classes/${classId}`
		const canEdit = classInst.admins.includes(id.value)
		if (!canEdit) return `/classes/${classInst.id}`
	}]),
	setup () {
		useRouteMeta('Edit courses', { back: true })
		const { editClass, factory, error, loading } = useEditClass()
		const course = ref('')
		const addCourse = async () => {
			if (!course.value) return
			factory.addCourse(course.value)
			course.value = ''
		}
		return {
			error, loading, editClass, factory,
			trashBinOutline, addOutline, course, addCourse
		}
	}
})
</script>
