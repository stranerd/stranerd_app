<template>
	<IonApp class="text-body">
		<IonRouterOutlet :key="$route.fullPath" />
	</IonApp>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'App',
	components: { IonApp, IonRouterOutlet }
})
</script>
