<template>
	<IonPage>
		<HomeTopNavigation />
		<IonContent class="auth">
			<div class="!w-full h-full layout-body">
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
	components: { IonPage, IonContent, HomeTopNavigation }
})
</script>

<style lang="scss" scoped>
	.auth {
		:deep(ion-input) {
			--background: $color-newGray !important;
			background: $color-newGray !important;
			--padding-top: 1.2rem !important;
			--padding-bottom: 1.2rem !important;
			margin-bottom: 1.25rem;
			width: 420px;
			max-width: 90vw !important;
		}

		:deep(ion-button) {
			--border-radius: .75rem;
			--padding-top: 1.4rem !important;
			--padding-bottom: 1.4rem !important;
			height: 3.5rem;
			font-size: 24px;
			font-weight: 700;
			max-width: 90vw !important;
		}
	}
</style>

