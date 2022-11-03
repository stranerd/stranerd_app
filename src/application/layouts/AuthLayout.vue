<template>
	<IonPage>
		<IonContent :scrollY="false">
			<div class="layout">
				<IonHeader>
					<IonToolbar class="h-0" />
				</IonHeader>
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

export default defineComponent({
	name: 'AuthLayout'
})
</script>
