<template>
	<DefaultLayout>
		<template v-slot:panel>
			<MessagingPanel />
		</template>
		<template v-slot:content-top>
			<div />
		</template>
		<MessagingView class="lg:hidden" />
		<div class="h-full w-full hidden lg:flex justify-center items-center">
			<p class="text-3xl">Select a contact</p>
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
