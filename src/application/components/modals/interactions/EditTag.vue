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

<script lang="ts">
import { defineComponent } from 'vue'
import TagForm from '@app/components/interactions/tags/TagForm.vue'
import { useEditTag } from '@app/composable/interactions/tags'

export default defineComponent({
	name: 'EditTagModal',
	components: { TagForm },
	props: {
		close: {
			type: Function,
			required: true
		}
	},
	setup () {
		const { factory, error, loading, editTag } = useEditTag()
		return { factory, error, loading, editTag }
	}
})
</script>
