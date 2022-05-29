<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { useClassModal } from '@app/composable/core/modals'
import { getEditingGroup } from '@app/composable/classes/groups'

export default defineComponent({
	name: 'ClassesClassIdGroupsGroupIdEdit',
	displayName: 'Edit Discussion Group',
	middlewares: ['isAuthenticated', async ({ from, to }) => {
		const { id } = useAuth()
		const { classId = '', groupId = '' } = to.params
		const group = getEditingGroup()
		if (!group || group.id !== groupId) return `/classes/${classId}/groups/${groupId}`
		const canEdit = group.admins.includes(id.value)
		if (!canEdit) return `/classes/${classId}/groups/${group.id}`
		useClassModal().openEditGroup()
		const backPath = from?.fullPath ?? '/dashboard'
		return backPath.startsWith('/auth/') ? '/dashboard' : backPath
	}]
})
</script>
