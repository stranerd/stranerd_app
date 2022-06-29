<template>
	<DefaultLayout :hideBottom="true" :hideFab="true" :hideTop="true">
		<Chats :to="userId" :type="ChatType.personal" />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Chats from '@app/components/messaging/chats/Chats.vue'
import { useRoute } from 'vue-router'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import { ChatType } from '@modules/messaging'

export default defineComponent({
	name: 'MessagesPersonalUserId',
	components: { Chats },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Chat', { back: true })
		const route = useRoute()
		const { userId } = route.params
		return { userId: userId as string, ChatType }
	}
})
</script>
