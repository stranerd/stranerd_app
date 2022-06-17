<template>
	<Modal class="h-screen md:h-auto">
		<template v-slot:title>
			Courses list
		</template>
		<div class="flex flex-col gap-6">
			<div class="flex gap-2 items-center">
				<IonInput v-model="course"
					class="flex-grow" placeholder="Enter course"
					@keydown.enter.prevent="addCourse" />
				<IonButton class="btn-primary" @click="addCourse">
					<IonIcon slot="icon-only" :icon="addOutline" class="text-xl" />
				</IonButton>
			</div>
			<div v-for="(course, index) in factory.courses" :key="index + course"
				class="flex gap-4 items-center justify-between">
				<span class="truncate flex-grow">{{ course }}</span>
				<IonIcon :icon="trashBinOutline" class="text-danger text-2xl"
					@click="factory.removeCourse(course)" />
			</div>
			<IonButton :disabled="loading || !factory.valid" class="w-full btn-primary" @click.prevent="editClass">
				<SpinLoading v-if="loading" />
				<span v-else>Save</span>
			</IonButton>
		</div>
	</Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useEditClass } from '@app/composable/classes/classes'
import { addOutline, trashBinOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'EditClassCourseModal',
	setup () {
		const { editClass, factory, error, loading } = useEditClass()
		const course = ref('')
		const addCourse = async () => {
			if (!course.value) return
			factory.value.addCourse(course.value)
			course.value = ''
		}
		return {
			error, loading, editClass, factory,
			trashBinOutline, addOutline, course, addCourse
		}
	}
})
</script>
