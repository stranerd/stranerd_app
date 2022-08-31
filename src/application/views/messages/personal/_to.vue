<template>
	<ChatsWrapper />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import ChatsWrapper from '@app/components/messaging/chats/ChatsWrapper.vue'

export default defineComponent({
	name: 'MessagesPersonalTo',
	components: { ChatsWrapper },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Chat', { back: true })
	}
})
</script>
