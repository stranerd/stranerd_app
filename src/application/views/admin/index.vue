<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
	name: 'AdminIndexPage',
	middleware: [
		({ redirect }) => redirect('/admin/questions/subjects')
	]
})
</script>
