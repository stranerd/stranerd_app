<template>
	<div class="d-flex flex-column align-items-center py-0-5">
		<span v-if="chats.length === 0" class="text-center my-auto bg-line p-1">
			No messages found. Send a message now
		</span>
		<div v-else v-chat-scroll="chatProps" class="chat-box w-100 gap-0-5">
			<span v-if="hasMore" class="mb-1 mx-auto cursor-pointer bg-line info" @click="fetchOlderChats">Fetch Older Messages</span>
			<div v-for="session in chats" :key="session.hash" class="d-flex flex-column gap-0-5">
				<DynamicText class="bg-line info mx-auto">
					{{ formatTime(session.date, true) }}
				</DynamicText>
				<ChatListCard v-for="chat in session.chats" :key="chat.hash" :chat="chat" :user-id="userId" />
			</div>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { useChats } from '@/application/hooks/sessions/chats'
import ChatListCard from '@app/components/sessions/chats/ChatListCard.vue'
import { formatTime } from '@/utils/dates'

export default defineComponent({
	name: 'ChatList',
	components: { ChatListCard },
	props: {
		userId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { chats, listener, fetchOlderChats, hasMore, error, loading } = useChats(props.userId)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		const chatProps = { smooth: true, notSmoothOnInit: true, always: false, scrollonremoved: true }
		return { chats, error, loading, fetchOlderChats, hasMore, formatTime, chatProps }
	}
})
</script>

<style lang="scss" scoped>
	.info {
		width: fit-content;
		padding: 4px 12px;
		border-radius: 4px;
		font-size: 0.9em;
		text-transform: uppercase;
	}

	.chat-box {
		@extend .hide-scrollbar;

		display: flex;
		flex-direction: column;
		flex: 1 1 0;
		overflow: auto;
	}
</style>
