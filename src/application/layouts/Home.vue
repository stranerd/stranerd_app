<template>
	<IonPage>
		<HomeTopNavigation />
		<IonContent>
			<div class="layout-page !px-0">
				<div class="layout-body !w-full">
					<slot />
				</div>
			</div>
		</IonContent>
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomeTopNavigation from '../components/layout/topNavigations/HomeTopNavigation.vue'

export default defineComponent({
	name: 'JustifiedLayout',
	components: { HomeTopNavigation }
})
</script>
