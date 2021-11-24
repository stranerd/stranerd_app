<template>
	<IonPage>
		<HomeTopNavigation/>
		<IonContent>
			<div class="!w-full layout-body">
				<slot />
			</div>
		</IonContent>
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'
import HomeTopNavigation from '../components/layout/topNavigations/HomeTopNavigation.vue'




export default defineComponent({
	name: 'JustifiedLayout',
	components: {  IonPage, IonContent, HomeTopNavigation }
})
</script>
