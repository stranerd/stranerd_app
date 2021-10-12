<template>
	<div :id="comment.id" class="my-0-5 flex align-items-start gap-0-5">
		<NuxtLink :to="`/users/${comment.userId}`" class="flex-shrink-0">
			<Avatar :size="35" :src="comment.avatar" />
		</NuxtLink>
		<div>
			<NuxtLink :to="`/users/${comment.userId}`" class="d-block text-wrap font-bold text-sub">
				<DynamicText>
					{{ comment.userName }}
				</DynamicText>
			</NuxtLink>
			<DynamicText>
				{{ comment.body }}
			</DynamicText>
		</div>
		<DynamicText :no-wrap="true" class="ms-auto">
			{{ formatTime(comment.createdAt) }}
		</DynamicText>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { CommentEntity } from '@/modules/questions'
import { formatTime } from '@/utils/dates'

export default defineComponent({
	name: 'CommentsListCard',
	props: {
		comment: {
			required: true,
			type: Object as PropType<CommentEntity>
		}
	},
	setup () {
		return { formatTime }
	}
})
</script>
