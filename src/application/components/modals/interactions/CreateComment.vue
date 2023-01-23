<template>
	<Modal :close="close">
		<template v-slot:title>
			<span />
		</template>
		<CommentForm v-if="entity" :id="entity.id" :type="entity.type" />
	</Modal>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import CommentForm from '@app/components/interactions/comments/CommentForm.vue'
import { getCommentEntity } from '@app/composable/interactions/comments'

defineProps({
	close: {
		type: Function as PropType<() => void>,
		required: true
	}
})

const entity = getCommentEntity()
</script>
