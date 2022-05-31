<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { useClassModal } from '@app/composable/core/modals'
import { generateMiddlewares } from '@app/middlewares'
import { getEditEvent } from '@app/composable/classes/timetable'
import { EventType } from '@modules/classes'

export default defineComponent({
	name: 'ClassesClassIdTimetableTimetableIdEdit',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', async ({ from, to }) => {
		const { id } = useAuth()
		const { classId = '', timetableId = '' } = to.params
		const info = getEditEvent()
		if (!info || info.event.id != timetableId) return `/classes/${classId}/timetable`
		const canEdit = info.event.admins.includes(id.value)
		const day = info.event.data.type === EventType.timetable ? info.event.data.start.day : 1
		if (!canEdit) return `/classes/${classId}/timetable?day=${day}`
		useClassModal().openEditTimetable()
		const backPath = from?.fullPath ?? '/dashboard'
		return backPath.startsWith('/auth/') ? '/dashboard' : backPath
	}])
})
</script>
