<template>
	<ion-page>
		<ion-content
			class="flex flex-col bg-dark h-screen w-screen items-start justify-center py-3 px-5 bg-primary"
		>
			<HomeTopNavigation/>
			<slot />
		</ion-content>
	</ion-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent, IonPage} from '@ionic/vue'
import HomeTopNavigation from '../components/layout/topNavigations/HomeTopNavigation.vue'

export default defineComponent({
	components: { IonContent,IonPage, HomeTopNavigation, },
	setup() {
		return {

		}
	},
})
</script>

