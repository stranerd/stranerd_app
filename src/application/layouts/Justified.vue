<template>
	<IonPage>
		<InnerTopBar />
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
import InnerTopBar from '@app/components/layout/topNavigations/InnerTopBar.vue'

export default defineComponent({
	name: 'JustifiedLayout',
	components: { InnerTopBar, IonPage, IonContent }
})
</script>
