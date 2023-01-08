<template>
	<div class="flex items-start py-3 gap-2">
		<Avatar :id="comment.user.id" :name="comment.user.bio.fullName" :size="20" :src="comment.user.bio.photo" />
		<div class="flex flex-col gap-1">
			<IonText>
				<UserName :isTutor="comment.user.roles.isStranerdTutor" :name="comment.user.bio.fullName"
					class="!inline-flex font-bold mr-2" />
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

<script lang="ts" setup>
import { defineComponent } from 'vue'
import { CommentEntity, InteractionEntities } from '@modules/interactions'
import { formatTime } from '@utils/dates'
import { openCreateCommentModal } from '@app/composable/interactions/comments'

defineProps({
	comment: {
		type: CommentEntity,
		required: true
	}
})
</script>
