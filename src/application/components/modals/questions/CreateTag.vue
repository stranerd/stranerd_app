<template>
	<Modal>
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
import TagForm from '@app/components/questions/tags/TagForm.vue'
import { useCreateTag } from '@app/composable/questions/tags'

export default defineComponent({
	name: 'CreateTagModal',
	components: { TagForm },
	setup () {
		const { factory, error, loading, createTag } = useCreateTag()
		return { factory, error, loading, createTag }
	}
})
</script>
