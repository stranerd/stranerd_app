<template>
	<div class="flex items-start card-padding !py-3 gap-2">
		<Avatar :id="comment.user.id" :name="comment.user.bio.fullName" :size="20" :src="comment.user.bio.photo" />
		<div class="flex flex-col gap-1">
			<IonText>
				<span class="inline-flex gap-1 items-center font-bold mr-2">
					<span>{{ comment.user.bio.firstName }}</span>
					<Verified :verified="comment.isUserVerified" />
				</span>
				<span>{{ comment.body }}</span>
			</IonText>
			<div class="text-sm text-secondaryText flex items-center gap-4">
				<span>{{ formatTime(comment.createdAt) }}</span>
				<a v-if="0 && comment.canReply"
					@click="openCreateCommentModal({ id: comment.id, type: InteractionEntities.comments })">Reply</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CommentEntity, InteractionEntities } from '@modules/interactions'
import { formatTime } from '@utils/dates'
import { openCreateCommentModal } from '@app/composable/interactions/comments'

export default defineComponent({
	name: 'CommentsListCard',
	props: {
		comment: {
			type: CommentEntity,
			required: true
		}
	},
	setup () {
		return { formatTime, InteractionEntities, openCreateCommentModal }
	}
})
</script>
