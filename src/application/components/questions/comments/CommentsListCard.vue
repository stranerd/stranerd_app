<template>
	<div class="flex mt-2 items-center">
		<Avatar :id="comment.userId" :size="24" :src="comment.avatar" class="mr-2 ml-4" />
		<ion-text class="text-dark_gray">
			<b>{{ comment.userBio.firstName }} : </b>
			{{ comment.body }}
		</ion-text>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CommentEntity } from '@modules/questions'

export default defineComponent({
	name: 'CommentsListCard',
	props: {
		comment: {
			type: CommentEntity,
			required: true
		}
	}
})
</script>
