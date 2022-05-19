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
			max-width: 90vw !important;
			background: $color-lightGray;
		}

		:deep(ion-button) {
			--border-radius: .5rem;
			--padding-top: 1.4rem !important;
			--padding-bottom: 1.4rem !important;
			height: 36px;
			font-weight: 400;
			max-width: 90vw !important;
		}
	}
</style>

