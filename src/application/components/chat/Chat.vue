<template>
	<div class=" flex flex-col relative h-full w-full  border-r-[1px] border-faded_gray overflow-y-hidden">
		<chat-top :key="hash" :user="user ? user : undefined"></chat-top>
		<chat-content :user-id="userId"></chat-content>
		<chat-bottom :session-id="sessionId" :user-id="userId"></chat-bottom>
	</div>
</template>

<script lang="ts">

import { computed, defineAsyncComponent, onBeforeUnmount, onMounted } from 'vue'

const ChatTop = defineAsyncComponent(() => import('@app/components/chat/ChatTop.vue'))
const ChatBottom = defineAsyncComponent(() => import('@app/components/chat/ChatBottom.vue'))
const ChatContent = defineAsyncComponent(() => import('@app/components/chat/ChatContent.vue'))

import { ellipsisVertical, search } from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'
import { useUser } from '@app/composable/users/user'
import { hasRequestedSessionWith, isRequestingSessionWith, useCurrentSession } from '@app/composable/sessions/session'

export default {
	components: { ChatTop, ChatBottom, ChatContent },
	props: {
		userId: {
			type: String,
			required: true
		}
	},
	setup (props: any) {

		const { currentSessionId, user: authUser } = useAuth()
		const { user, loading, error, listener } = useUser(props.userId)
		const { currentSession } = useCurrentSession()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		const sessionId = computed({
			get: () => currentSessionId.value && user.value?.currentSession === currentSessionId.value
				? currentSessionId.value
				: '',
			set: () => {
			}
		})
		const hash = computed({
			get: () => [
				authUser.value?.hash ?? 'auth',
				user.value?.hash ?? 'user',
				sessionId.value,
				currentSession.value?.hash ?? ''
			].join('--'),
			set: () => {
			}
		})
		const requestedSession = hasRequestedSessionWith(props.userId)
		const requestingSession = isRequestingSessionWith(props.userId)

		return { ellipsisVertical, search, user, loading, error, sessionId, hash, requestedSession, requestingSession }
	}
}
</script>
