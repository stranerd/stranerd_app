<template>
	<div :class="{'justify-end': discussion.userId === id}"
		class="flex gap-1 items-end text-main_dark text-sm lg:text-base w-full">
		<Avatar v-if="discussion.userId !== id" :id="discussion.userId" :name="discussion.userBio.firstName"
			:size="24" :src="discussion.userBio.photo" />
		<div :class="discussion.userId === id ? 'bg-new_gray rounded-bl-xl' : 'bg-[#1997DE1A] rounded-br-xl'"
			class="py-[6px] px-3 flex gap-2 items-end flex-grow max-w-[70%] rounded-t-xl">
			<div class="flex-grow">{{ discussion.content }}</div>
			<span class="text-sm">{{ formatTimeAsDigits(new Date(discussion.createdAt)) }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { DiscussionEntity } from '@modules/classes'
import { useAuth } from '@app/composable/auth/auth'
import { formatTimeAsDigits } from '@utils/dates'

export default defineComponent({
	name: 'DiscussionsListCard',
	props: {
		discussion: {
			required: true,
			type: DiscussionEntity
		}
	},
	setup () {
		const { id } = useAuth()
		return { id, formatTimeAsDigits }
	}
})
</script>
