<template>
	<IonPage>
		<IonContent :scrollY="false">
			<div class="layout">
				<HomeTopNavigation />
				<div class="layout-page">
					<div class="w-full">
						<div class="min-h-[95vh]">
							<slot />
						</div>
						<LandingFooter />
						<BottomNav :hideContent="true" />
					</div>
				</div>
			</div>
		</IonContent>
	</IonPage>
</template>

<script lang="ts" setup>
import HomeTopNavigation from '../components/layout/topNavigations/HomeTopNavigation.vue'
import LandingFooter from '@app/components/landing/LandingFooter.vue'
import BottomNav from '@app/components/layout/bottomNavigations/BottomNav.vue'
</script>
