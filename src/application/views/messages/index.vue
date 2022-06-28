<template>
	<DefaultLayout>
		<MessagesList />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MessagesList from '@app/components/messaging/MessagesList.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'Messages',
	components: { MessagesList },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Discussions', {})
	}
})
</script>
