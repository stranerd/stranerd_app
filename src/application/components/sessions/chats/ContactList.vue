<template>
	<div class="d-flex flex-column bg-white">
		<div class="head d-none d-sm-inline">
			<NuxtLink to="/sessions">
				<Heading variant="1">
					Inbox
				</Heading>
			</NuxtLink>
		</div>
		<span v-if="meta.length === 0" class="text-center align-self-center my-auto">
			No chats found. Go message a nerd
		</span>
		<UserChatCard v-for="chat in meta" :key="chat.id" :meta="chat" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import UserChatCard from '@app/components/sessions/chats/UserChatCard.vue'
import { useChatsList } from '@app/hooks/sessions/chats-list'

export default defineComponent({
	name: 'ContactList',
	components: { UserChatCard },
	setup () {
		const { meta, listener } = useChatsList()
		onMounted(() => {
			if (!listener.isRunning.value) listener.startListener()
		})
		return { meta }
	}
})
</script>

<style lang="scss" scoped>
	.head {
		display: flex;
		align-items: center;
		background: $color-primary;
		color: $color-white;
		padding: 0.75rem 1rem;
		@media (min-width: $lg) {
			padding: 0.75rem 2rem;
		}
	}
</style>
