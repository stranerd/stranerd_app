<template>
	<DefaultLayout>
		<template v-slot:panel>
			<MessagingPanel />
		</template>
		<template v-slot:content-top>
			<div />
		</template>
		<MessagingView class="lg:hidden pt-4" />
		<div class="h-full w-full hidden lg:flex flex-col justify-center items-center gap-4">
			<img src="@app/assets/images/emptyStates/contact.svg" style="min-width: 150px;">
			<p class="text-2xl font-bold">Start sending messages</p>
			<span class="text-center max-w-xl">Join a class to participate in group discussions and Connect with your classmates or students in other classes to send direct messages.</span>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MessagingView from '@app/components/messaging/MessagingView.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import MessagingPanel from '@app/components/layout/panels/MessagingPanel.vue'

export default defineComponent({
	name: 'Messages',
	components: { MessagingView, MessagingPanel },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Discussions', {})
	}
})
</script>
