<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { useStudyModal } from '@app/composable/core/modals'
import { getEditingSet } from '@app/composable/study/sets'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'StudySetsSetIdEdit',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', async ({ goBackToNonAuth, to }) => {
		const { id } = useAuth()
		const { setId = '' } = to.params
		const set = getEditingSet()
		if (!set || set.id !== setId) return `/study/sets/${setId}`
		const canEdit = set.user.id === id.value
		if (!canEdit) return `/study/sets/${set.id}`
		useStudyModal().openEditSet()
		return goBackToNonAuth()
	}])
})
</script>
