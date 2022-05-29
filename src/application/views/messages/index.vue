<template>
	<Justified>
		<MessagesList />
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import MessagesList from '@app/components/messages/MessagesList.vue'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'Messages',
	displayName: 'Discussions',
	components: { Justified, MessagesList },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated'])
})
</script>
