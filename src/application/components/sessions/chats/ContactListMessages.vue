<template>
	<div class="flex-grow-1 d-flex flex-column">
		<PageLoading v-if="loading" />
		<div v-else-if="user" class="flex-grow-1 d-flex flex-column">
			<ChatHead :key="hash" :user="user" class="px-1 px-md-2" />
			<ChatList :user-id="userId" class="flex-grow-1 px-1 px-md-2" />
			<TutorSessionOption v-if="requestedSession" :session="requestedSession" class="px-0" />
			<StudentWaitingSession v-if="requestingSession" :session="requestingSession" class="px-1" />
			<ChatForm v-if="sessionId" :session-id="sessionId" :user-id="userId" class="px-1 px-md-2" />
		</div>
		<DisplayError v-else error="No such user exists!" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import ChatHead from '@app/components/sessions/chats/ChatHead.vue'
import ChatList from '@app/components/sessions/chats/ChatList.vue'
import ChatForm from '@app/components/sessions/chats/ChatForm.vue'
import TutorSessionOption from '@app/components/sessions/chats/TutorSessionOption.vue'
import StudentWaitingSession from '@app/components/sessions/chats/StudentWaitingSession.vue'
import { useUser } from '@/application/hooks/users/user'
import { useAuth } from '@/application/hooks/auth/auth'
import { hasRequestedSessionWith, isRequestingSessionWith, useCurrentSession } from '@/application/hooks/sessions/session'

export default defineComponent({
	name: 'ContactListMessages',
	components: { ChatHead, ChatList, ChatForm, TutorSessionOption, StudentWaitingSession },
	props: {
		userId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { currentSessionId, user: authUser } = useAuth()
		const { user, loading, error, listener } = useUser(props.userId)
		const { currentSession } = useCurrentSession()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		const sessionId = computed({
			get: () => currentSessionId.value && user.value?.currentSession === currentSessionId.value
				? currentSessionId.value
				: '',
			// eslint-disable-next-line @typescript-eslint/no-empty-function
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
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			set: () => {
			}
		})
		const requestedSession = hasRequestedSessionWith(props.userId)
		const requestingSession = isRequestingSessionWith(props.userId)
		return { user, loading, error, sessionId, hash, requestedSession, requestingSession }
	}
})
</script>
