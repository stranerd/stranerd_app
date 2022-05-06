<template>
	<div class="flex mt-2 items-center">
		<Avatar :id="comment.user.id" :name="comment.user.bio.fullName" :size="24" :src="comment.user.bio.photo"
			class="mr-2 " />
		<ion-text class="text-dark_gray">
			<b class="flex gap-1 items-center">
				<span>{{ comment.user.bio.firstName }}</span>
				<Verified :verified="comment.isUserVerified" />
			</b>
			<b class="mx-1"> - </b>
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
