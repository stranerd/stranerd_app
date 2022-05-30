<template>
	<IonPage>
		<HomeTopNavigation />
		<div class="layout">
			<IonContent>
				<div class="layout-page" style="padding: 0 !important;">
					<div class="!w-full layout-body">
						<slot />
					</div>
				</div>
			</IonContent>
		</div>
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomeTopNavigation from '@app/components/layout/topNavigations/HomeTopNavigation.vue'

export default defineComponent({
	name: 'JustifiedLayout',
	components: { HomeTopNavigation }
})
</script>
