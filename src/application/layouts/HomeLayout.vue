<template>
	<IonPage>
		<IonContent :scrollY="false">
			<div class="layout">
				<HomeTopNavigation />
				<div class="layout-page">
					<div class="w-full z-0">
						<slot />
					</div>
				</div>
			</div>
		</IonContent>
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomeTopNavigation from '../components/layout/topNavigations/HomeTopNavigation.vue'

export default defineComponent({
	name: 'HomeLayout',
	components: { HomeTopNavigation }
})
</script>
