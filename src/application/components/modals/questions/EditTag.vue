<template>
	<Modal>
		<template v-slot:title>
			Edit Tag
		</template>
		<TagForm
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
import TagForm from '@app/components/questions/tags/TagForm.vue'
import { useEditTag } from '@app/composable/questions/tags'

export default defineComponent({
	name: 'EditTagModal',
	components: { TagForm },
	setup () {
		const { factory, error, loading, editTag } = useEditTag()
		return { factory, error, loading, editTag }
	}
})
</script>
