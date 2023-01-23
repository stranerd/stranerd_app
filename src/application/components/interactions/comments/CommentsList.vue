<template>
	<div class="flex flex-col flex-grow relative">
		<CommentsListCard v-for="comment in comments" :key="comment.hash" :comment="comment" />
		<BlockLoading v-if="loading" />
	</div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import CommentsListCard from '@app/components/interactions/comments/CommentsListCard.vue'
import { useCommentsList } from '@app/composable/interactions/comments'
import { InteractionEntities } from '@modules/interactions'

const props = defineProps({
	id: {
		type: String,
		required: true
	},
	type: {
		type: String as PropType<InteractionEntities>,
		required: true
	}
})

const { comments, loading, error } = useCommentsList(props.id, props.type)
</script>
