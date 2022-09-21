<template>
	<DefaultLayout>
		<template v-slot:content-top>
			<div />
		</template>
		<ChatMetasList class="lg:hidden pt-4" />
		<div class="h-full w-full hidden lg:flex flex-col justify-center items-center gap-4">
			<img src="@app/assets/images/emptyStates/contacts.png" style="min-width: 150px;">
			<p class="text-2xl font-bold">Start sending messages</p>
			<span class="text-center max-w-xl">Join a class to participate in group discussions and Connect with your classmates or students in other classes to send direct messages.</span>
		</div>
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
