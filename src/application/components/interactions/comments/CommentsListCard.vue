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
			<span class="text-secondaryText text-sub">{{ formatTime(comment.createdAt) }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CommentEntity } from '@modules/interactions'
import { formatTime } from '@utils/dates'

export default defineComponent({
	name: 'CommentsListCard',
	props: {
		comment: {
			type: CommentEntity,
			required: true
		}
	},
	setup () {
		return { formatTime }
	}
})
</script>
