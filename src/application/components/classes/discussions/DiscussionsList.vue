<template>
	<div class="flex flex-col">
		<EmptyState v-if="!loading && discussions.length === 0" class="h-full flex items-center"
			info="No messages found. Send a message now" />
		<div v-chat-scroll class="flex flex-col gap-3 overflow-y-auto hide-scrollbar"
			@scroll-top="() => hasMore && fetchOlderDiscussions()">
			<div v-for="date in discussions" :key="date.key" class="flex flex-col gap-7">
				<span class="w-full text-center text-sm">{{ formatTime(date.key, true) }}</span>
				<DiscussionsListCard v-for="discussion in date.values" :key="discussion.hash"
					:discussion="discussion" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useGroupDiscussions } from '@app/composable/classes/discussions'
import { formatTime } from '@utils/dates'
import DiscussionsListCard from '@app/components/classes/discussions/DiscussionsListCard.vue'

export default defineComponent({
	name: 'DiscussionsList',
	components: { DiscussionsListCard },
	props: {
		classId: {
			required: true,
			type: String
		},
		groupId: {
			required: true,
			type: String
		}
	},
	setup (props) {
		const {
			loading,
			error,
			hasMore,
			discussions,
			fetchOlderDiscussions
		} = useGroupDiscussions(props.classId, props.groupId)
		return { loading, error, hasMore, discussions, fetchOlderDiscussions, formatTime, console }
	}
})
</script>
