<template>
	<span class="capitalize">
		<slot :tag="tag">
			{{ tag?.title ?? 'Tag' }}
		</slot>
	</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTag } from '@app/composable/interactions/tags'

export default defineComponent({
	name: 'Tag',
	props: {
		tagId: {
			type: String,
			default: '',
			required: true
		}
	},
	setup (props) {
		const { tag } = useTag(props.tagId)
		return { tag }
	}
})
</script>
