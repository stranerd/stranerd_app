<template>
	<IonPage>
		<IonContent :scrollY="false">
			<div class="layout">
				<IonHeader>
					<IonToolbar class="h-0" />
				</IonHeader>
				<Topbar :hideContent="true" />
				<div class="layout-page">
					<div class="w-full">
						<slot />
						<BottomNav :hideContent="true" />
					</div>
				</div>
			</div>
		</IonContent>
	</IonPage>
</template>

<script lang="ts" setup>
import Topbar from '@app/components/layout/topNavigations/Topbar.vue'
import BottomNav from '@app/components/layout/bottomNavigations/BottomNav.vue'
</script>
