<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useClassModal } from '@app/composable/core/modals'
import { useAuth } from '@app/composable/auth/auth'
import { generateMiddlewares } from '@app/middlewares'
import { getCreateSchemeClass } from '@app/composable/classes/schemes'

export default defineComponent({
	name: 'ClassesClassIdSchemesCreate',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', async ({ from }) => {
		const { id } = useAuth()
		const classInst = getCreateSchemeClass()
		if (!classInst) return '/classes/'
		if (!classInst.admins.includes(id.value)) return `/classes/${classInst.id}/scheme`
		useClassModal().openCreateScheme()
		const backPath = from?.fullPath ?? '/dashboard'
		return backPath.startsWith('/auth/') ? '/dashboard' : backPath
	}])
})
</script>
