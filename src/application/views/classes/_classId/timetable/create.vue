<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useClassModal } from '@app/composable/core/modals'
import { useAuth } from '@app/composable/auth/auth'
import { generateMiddlewares } from '@app/middlewares'
import { getCreateEventClass } from '@app/composable/classes/timetable'

export default defineComponent({
	name: 'ClassesClassIdTimetableCreate',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', async ({ from }) => {
		const { id } = useAuth()
		const classInst = getCreateEventClass()
		if (!classInst) return '/classes/'
		if (!classInst.admins.includes(id.value)) return `/classes/${classInst.id}/timetable`
		useClassModal().openCreateTimetable()
		const backPath = from?.fullPath ?? '/dashboard'
		return backPath.startsWith('/auth/') ? '/dashboard' : backPath
	}])
})
</script>
