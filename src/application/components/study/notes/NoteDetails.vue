<template>
	<div>
		<p>{{ note }}</p>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { NoteEntity } from '@modules/study'

export default defineComponent({
	name: 'NoteDetails',
	props: {
		note: {
			type: Object as PropType<NoteEntity>,
			required: true
		}
	}
})
</script>
