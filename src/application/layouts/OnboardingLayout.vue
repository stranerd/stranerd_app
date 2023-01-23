<template>
	<IonPage>
		<IonContent :scrollY="false">
			<div class="layout">
				<Topbar :hideContent="true" />
				<div class="layout-page">
					<slot />
				</div>
				<BottomNav :hideContent="true" />
			</div>
		</IonContent>
	</IonPage>
</template>

<script lang="ts" setup>
import Topbar from '@app/components/layout/topNavigations/Topbar.vue'
import BottomNav from '@app/components/layout/bottomNavigations/BottomNav.vue'
</script>
