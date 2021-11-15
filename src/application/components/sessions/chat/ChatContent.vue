<template>
	<div class="flex flex-col px-3 py-7 gap-5 text-icon_inactive normalText  flex-grow overflow-y-auto">
		<template v-if="chats.length === 0">
			<div class="w-full flex flex-row justify-center bg">
				<span class="px-4 py-2 bg-light_gray rounded-xl">No messages found. Send a message now</span>
			</div>
		</template>

		<template v-else>
			<div v-for="session in chats" :key="session.hash" class="w-full flex flex-col gap-4">
				<chat-message v-for="chat in session.chats" :key="chat.hash" :chat="chat" :user-id="userId" />
			</div>
		</template>

	</div>

</template>
<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { checkmarkDoneOutline } from 'ionicons/icons'
import { useChats } from '@app/composable/sessions/chats'
import { formatTime } from '@utils/dates'
import ChatMessage from '@app/components/sessions/chat/ChatMessage.vue'

export default defineComponent({
	props: {
		userId: {
			type: String,
			required: true
		}
	},
	setup (props: any) {

		const { chats, listener, fetchOlderChats, hasMore, error, loading } = useChats(props.userId)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		const chatProps = { smooth: true, notSmoothOnInit: true, always: false, scrollonremoved: true }
		return { chats, checkmarkDoneOutline, error, loading, fetchOlderChats, hasMore, formatTime, chatProps }

	},
	components: {
		ChatMessage
	}
})
</script>
