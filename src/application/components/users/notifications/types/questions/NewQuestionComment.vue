<template>
	<div v-if="comment" class="flex border-bottom-line card-padding items-start">
		<Avatar :id="comment.user.id" :name="comment.user.bio.fullName" :size="32" :src="comment.user.bio.photo" />
		<div class="flex flex-col gap-2 flex-1">
			<div class="flex gap-2 items-center">
				<IonText>{{ comment.user.bio.fullName }} dropped a comment</IonText>
				<IonIcon :icon="ellipse" class="dot" />
				<IonText>{{ formatTime(notification.createdAt) }}</IonText>
			</div>
			<div class="border border-2 border-itemBg rounded-xl flex flex-col gap-4 p-4">
				{{ comment.body }}
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NotificationEntity } from '@modules/users'
import { formatTime } from '@utils/dates'
import { useCommentsById } from '@app/composable/interactions/comments'
import { ellipse } from 'ionicons/icons'

export default defineComponent({
	name: 'NewQuestionComment',
	props: {
		notification: {
			type: NotificationEntity,
			required: true
		},
		commentId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { comment } = useCommentsById(props.commentId)
		return { comment, formatTime, ellipse }
	}
})
</script>
