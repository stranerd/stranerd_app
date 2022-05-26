<template>
	<div>
		<p>{{ document }}</p>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { DocumentEntity } from '@modules/study'

export default defineComponent({
	name: 'DocumentDetails',
	props: {
		document: {
			type: Object as PropType<DocumentEntity>,
			required: true
		}
	}
})
</script>
