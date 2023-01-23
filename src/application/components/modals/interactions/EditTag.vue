<template>
	<Modal :close="close">
		<template v-slot:title>
			Edit Tag
		</template>
		<TagForm
			:disabled="{ type: true }"
			:error="error"
			:factory="factory"
			:loading="loading"
			:submit="editTag"
		>
			<template v-slot:buttonText>
				Update Tag
			</template>
		</TagForm>
	</Modal>
</template>

<script lang="ts" setup>
import TagForm from '@app/components/interactions/tags/TagForm.vue'
import { useEditTag } from '@app/composable/interactions/tags'
import { PropType } from 'vue'

defineProps({
	close: {
		type: Function as PropType<() => void>,
		required: true
	}
})

const { factory, error, loading, editTag } = useEditTag()
</script>
