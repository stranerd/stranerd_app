<template>
	<IonPage>
		<HomeTopNavigation />
		<div class="layout">
			<IonContent class="auth">
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
			margin-bottom: 0;
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

