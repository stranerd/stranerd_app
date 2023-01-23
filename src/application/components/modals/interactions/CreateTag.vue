<template>
	<Modal :close="close">
		<template v-slot:title>
			Create a tag
		</template>
		<TagForm
			:error="error"
			:factory="factory"
			:loading="loading"
			:submit="createTag"
		>
			<template v-slot:buttonText>
				Create Tag
			</template>
		</TagForm>
	</Modal>
</template>

<script lang="ts" setup>
import TagForm from '@app/components/interactions/tags/TagForm.vue'
import { useCreateTag } from '@app/composable/interactions/tags'
import { PropType } from 'vue'

defineProps({
	close: {
		type: Function as PropType<() => void>,
		required: true
	}
})

const { factory, error, loading, createTag } = useCreateTag()
</script>
