<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useClassModal } from '@app/composable/core/modals'
import { generateMiddlewares } from '@app/middlewares'
import { setGroupClassId } from '@app/composable/classes/groups'

export default defineComponent({
	name: 'ClassesGroupsCreate',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', async ({ to, goBackToNonAuth }) => {
		if (to.query.classId) setGroupClassId(to.query.classId as string)
		useClassModal().openCreateGroup()
		return goBackToNonAuth()
	}])
})
</script>
