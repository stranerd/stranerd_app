<template>
	<DefaultLayout>
		<Requests />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import { generateMiddlewares } from '@app/middlewares'
import Requests from '@app/components/users/connects/ConnectRequests.vue'

export default defineComponent({
	name: 'ConnectRequests',
	components: { Requests },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Connection requests', { back: true })
	}
})
</script>
