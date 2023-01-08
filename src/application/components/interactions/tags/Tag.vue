<template>
	<span class="capitalize">
		<slot :tag="tag">
			{{ tag?.title ?? 'Tag' }}
		</slot>
	</span>
</template>

<script lang="ts" setup>
import { useTag } from '@app/composable/interactions/tags'

const props = defineProps({
	tagId: {
		type: String,
		default: '',
		required: true
	}
})

const { tag } = useTag(props.tagId)
</script>
