
<template>
	<div class="commentBox py-4">
		<div v-for="(item, index) in comm" :key="index">
			<EachComment :comment="item.comment" :replies="item.replies" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EachComment from './eachComment.vue'


export default defineComponent({
	name: 'commentBox',
	components: { EachComment },
	setup() {
		const comm = [
			{ comment: 'This is a comment', replies: [] },
			{
				comment: 'Another comment this is', replies: [
					{ comment: 'This is a comment', replies: [] },
					{ comment: 'This is a comment', replies: [] },
					{ comment: 'This is a comment', replies: [] },
					{ comment: 'This is a comment', replies: [] }
				]
			},
			{
				comment: 'Thanks for the answer', replies: [
					{ comment: 'This is a reply', replies: [] },
					{ comment: 'Another reply', replies: [] },
				]
			},
			{ comment: 'This is the last comment', replies: [] },
		]

		return {
			comm
		}
	}
})
</script>
