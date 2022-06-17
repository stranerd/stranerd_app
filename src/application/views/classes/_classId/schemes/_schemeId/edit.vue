<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { useClassModal } from '@app/composable/core/modals'
import { generateMiddlewares } from '@app/middlewares'
import { getEditScheme } from '@app/composable/classes/schemes'

export default defineComponent({
	name: 'ClassesClassIdSchemesSchemeIdEdit',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', async ({ goBackToNonAuth, to }) => {
		const { id } = useAuth()
		const { classId = '', schemeId = '' } = to.params
		const info = getEditScheme()
		if (!info || info.scheme.id != schemeId) return `/classes/${classId}/scheme`
		const canEdit = info.scheme.admins.includes(id.value)
		if (!canEdit) return `/classes/${classId}/scheme`
		useClassModal().openEditScheme()
		return goBackToNonAuth()
	}])
})
</script>
