<template>
	<DefaultLayout :ignorePagePadding="true">
		<div class="h-full flex flex-col">
			<div class="nav-scroll">
				<a v-for="{ label, route, count } in [
						{ label: 'Received', route: 'received', count: receivedConnects.length },
						{ label: 'Sent', route: 'sent', count: sentConnects.length }
					]" :key="route" :class="{'active': tab === route}"
					@click="tab = route">
					<IonText>{{ label }} ({{ count }})</IonText>
				</a>
			</div>
			<div class="flex-grow flex-col flex">
				<ConnectListCard v-for="connect in (tab === 'received' ? receivedConnects : sentConnects)"
					:key="connect.hash" :connect="connect" />
			</div>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import { generateMiddlewares } from '@app/middlewares'
import { useConnects } from '@app/composable/users/connects'
import { formatTime } from '@utils/dates'
import ConnectListCard from '@app/components/users/connects/ConnectListCard.vue'

export default defineComponent({
	name: 'UsersConnectRequests',
	components: { ConnectListCard },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Connection requests', { back: true })
		const tab = ref('received')
		const { receivedConnects, sentConnects, loading, error } = useConnects()
		return { tab, receivedConnects, sentConnects, loading, error, formatTime }
	}
})
</script>
