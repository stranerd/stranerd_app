<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<ClassForm :disabled="{ departmentId: true, facultyId: true, institutionId: true, year: true }" :error="error"
			:factory="factory"
			:loading="loading"
			:submit="editClass" class="page-padding">
			<template v-slot:buttonText>Save</template>
		</ClassForm>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { getEditingClass, useEditClass } from '@app/composable/classes/classes'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import ClassForm from '@app/components/classes/classes/ClassForm.vue'

export default defineComponent({
	name: 'ClassesClassIdEdit',
	components: { ClassForm },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', async ({ to }) => {
		const { id } = useAuth()
		const { classId = '' } = to.params
		const classInst = getEditingClass()
		if (!classInst || classInst.id !== classId) return `/classes/${classId}`
		const canEdit = classInst.admins.includes(id.value)
		if (!canEdit) return `/classes/${classInst.id}`
	}]),
	setup () {
		useRouteMeta('Edit class', { back: true })
		const { editClass, factory, error, loading } = useEditClass()
		return { error, loading, editClass, factory }
	}
})
</script>
