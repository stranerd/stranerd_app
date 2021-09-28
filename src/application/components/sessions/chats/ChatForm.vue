<template>
	<form class="d-flex align-items-center py-1 gap-1 gap-md-2 bg-primary text-white" @submit.prevent="createTextChat">
		<input v-model="factory.content" class="form-control bg-white p-0-5" placeholder="Type a message here...">
		<a class="fas fa-paperclip" @click.prevent="() => { $refs.mediaInput.value= ''; $refs.mediaInput.click() }" />
		<a class="fas fa-paper-plane" @click.prevent="() => { factory.content && createTextChat() }" />
		<PageLoading v-if="loading" />
		<input ref="mediaInput" class="d-none" multiple type="file" @change.prevent="catchMultipleFiles">
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useCreateChat } from '@/application/hooks/sessions/chats'
import { useMultipleFileInputs } from '@/application/hooks/core/forms'

export default defineComponent({
	name: 'ChatForm',
	props: {
		userId: {
			type: String,
			required: true
		},
		sessionId: {
			type: String as PropType<string | undefined>,
			required: true
		}
	},
	setup (props) {
		const {
			createMediaChat,
			createTextChat,
			error,
			loading,
			factory
		} = useCreateChat(props.userId, props.sessionId)
		const { catchMultipleFiles } = useMultipleFileInputs(createMediaChat)
		return { factory, error, loading, createTextChat, catchMultipleFiles }
	}
})
</script>

<style lang="scss" scoped>
	a {
		border-radius: 10rem;
		font-size: 1.25rem;
	}

	input.form-control {
		font-size: 1em;
		border: none;
		box-shadow: none;
		border-radius: 12px;
	}
</style>
