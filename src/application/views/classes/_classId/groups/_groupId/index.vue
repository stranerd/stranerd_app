<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'ClassesClassIdGroupsGroupId',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', async ({ to }) => `/messages/classes/${to.params.classId}/${to.params.groupId}`])
})
</script>
