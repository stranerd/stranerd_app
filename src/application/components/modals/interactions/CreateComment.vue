<template>
	<Modal :close="close">
		<template v-slot:title>
			<span />
		</template>
		<CommentForm v-if="entity" :id="entity.id" :type="entity.type" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CommentForm from '@app/components/interactions/comments/CommentForm.vue'
import { getCommentEntity } from '@app/composable/interactions/comments'

export default defineComponent({
	name: 'CreateCommentModal',
	components: { CommentForm },
	props: {
		close: {
			type: Function,
			required: true
		}
	},
	setup () {
		const entity = getCommentEntity()
		return { entity }
	}
})
</script>
