<template>
	<div class="flex flex-col h-full max-h-full">
		<EmptyState v-if="!loading && chats.length === 0" class="h-full flex items-center"
			info="No messages found. Send a message now" />
		<div v-chat-scroll class="flex flex-col gap-6 overflow-y-auto hide-scrollbar"
			@scroll-top="() => hasMore && fetchOlderChats()">
			<div v-for="date in chats" :key="date.key" class="flex flex-col gap-4">
				<span class="w-full text-center text-sm">{{ formatTime(date.key, true) }}</span>
				<ChatsListCard v-for="chat in date.values" :key="chat.hash"
					:chat="chat" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useChats } from '@app/composable/messaging/chats'
import { formatTime } from '@utils/dates'
import ChatsListCard from '@app/components/messaging/chats/ChatsListCard.vue'

const props = defineProps({
	to: {
		required: true,
		type: String
	}
})

const { loading, error, hasMore, chats, fetchOlderChats } = useChats(props.to)
</script>
