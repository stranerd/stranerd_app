<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'ClassesClassIdGroups',
	beforeRouteEnter: generateMiddlewares([async ({ to }) => `/messages?classId=${to.params.classId}`])
})
</script>
