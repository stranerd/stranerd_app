<template>
	<div class="flex flex-col">
		<EmptyState v-if="discussions.length === 0" class="h-full flex items-center"
			info="No messages found. Send a message now" />
		<div v-else v-chat-scroll class="flex flex-col gap-3">
			<span v-if="hasMore" class="w-full text-center text-xs lg:text-sm"
				@click="fetchOlderDiscussions">Fetch Older Messages</span>
			<div v-for="date in discussions" :key="date.hash" class="flex flex-col gap-2">
				<span class="w-full text-center text-xs lg:text-sm">{{ formatTime(date.date, true) }}</span>
				<DiscussionsListCard v-for="discussion in date.discussions" :key="discussion.hash"
					:discussion="discussion" />
			</div>
		</div>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDiscussions } from '@app/composable/classes/discussions'
import { formatTime } from '@utils/dates'
import DiscussionsListCard from '@app/components/classes/discussions/DiscussionsListCard.vue'

export default defineComponent({
	name: 'DiscussionsList',
	components: { DiscussionsListCard },
	props: {
		groupId: {
			required: true,
			type: String
		}
	},
	setup (props) {
		const { loading, error, hasMore, discussions, fetchOlderDiscussions } = useDiscussions(props.groupId)
		return { loading, error, hasMore, discussions, fetchOlderDiscussions, formatTime }
	}
})
</script>
