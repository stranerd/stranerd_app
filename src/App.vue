<template>
	<IonApp>
		<IonRouterOutlet :key="$route.fullPath" />
		<PageLoading v-if="loading" />
	</IonApp>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { defineComponent } from 'vue'
import { useRouteLoading } from '@app/composable/meta/routes'

export default defineComponent({
	name: 'App',
	components: { IonApp, IonRouterOutlet },
	setup () {
		const { loading } = useRouteLoading()
		return { loading }
	}
})
</script>
