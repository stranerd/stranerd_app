<template>
	<IonPage>
		<IonContent :scrollY="false">
			<div class="layout">
				<HomeTopNavigation />
				<div class="layout-page">
					<div class="w-full">
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
