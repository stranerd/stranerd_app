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

<script lang="ts">
import { defineComponent } from 'vue'
import TagForm from '@app/components/interactions/tags/TagForm.vue'
import { useCreateTag } from '@app/composable/interactions/tags'

export default defineComponent({
	name: 'CreateTagModal',
	components: { TagForm },
	props: {
		close: {
			type: Function,
			required: true
		}
	},
	setup () {
		const { factory, error, loading, createTag } = useCreateTag()
		return { factory, error, loading, createTag }
	}
})
</script>
