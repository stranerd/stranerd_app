<template>
	<div class="flex mt-2 items-center">
		<Avatar :id="comment.userId" :size="24" :src="comment.avatar" class="mr-2 ml-4" />
		<ion-text class="text-dark_gray">
			<b class="flex gap-1 items-center">
				<span>{{ comment.userBio.firstName }}</span>
				<IonIcon v-if="comment.isUserVerified" :icon="checkmarkCircle" color="primary" />
			</b>
			<b>:</b>
			{{ comment.body }}
		</ion-text>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CommentEntity } from '@modules/questions'
import { checkmarkCircle } from 'ionicons/icons'

export default defineComponent({
	name: 'CommentsListCard',
	props: {
		comment: {
			type: CommentEntity,
			required: true
		}
	},
	setup () {
		return { checkmarkCircle }
	}
})
</script>
