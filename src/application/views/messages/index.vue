<template>
	<DefaultLayout>
		<ChatMetasList />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ChatMetasList from '@app/components/messaging/chatMetas/ChatMetasList.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'Messages',
	components: { ChatMetasList },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Discussions', {})
	}
})
</script>
