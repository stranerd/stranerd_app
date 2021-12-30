<template>
	<IonPage>
		<InnerTopBar />
		<IonContent>
			<div class="!w-full h-full layout-body">
				<slot />
			</div>
			<Fab v-if="!hideFab" />
		</IonContent>
		<BottomNav class="mt-auto" />
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'
import InnerTopBar from '@app/components/layout/topNavigations/InnerTopBar.vue'
import BottomNav from '@app/components/layout/bottomNavigations/BottomNav.vue'
import Fab from '@app/components/layout/Fab.vue'

export default defineComponent({
	name: 'JustifiedLayout',
	props: {
		hideFab: {
			required: false,
			default: false
		}
	},
	components: { InnerTopBar, IonPage, IonContent, BottomNav, Fab }
})
</script>
