<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { useClassModal } from '@app/composable/core/modals'
import { getEditingClass } from '@app/composable/classes/classes'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'ClassesClassIdCourses',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', async ({ goBackToNonAuth, to }) => {
		const { id } = useAuth()
		const { classId = '' } = to.params
		const classInst = getEditingClass()
		if (!classInst || classInst.id !== classId) return `/classes/${classId}`
		const canEdit = classInst.admins.includes(id.value)
		if (!canEdit) return `/classes/${classInst.id}`
		useClassModal().openEditClassCourses()
		return goBackToNonAuth()
	}])
})
</script>
