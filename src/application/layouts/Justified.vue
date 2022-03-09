<template>
	<IonPage>
		<InnerTopBar v-if="!hideTop" />
		<IonContent>
			<div class="layout-page !px-0">
				<div class="layout-body !w-full">
					<slot />
				</div>
			</div>
			<Fab v-if="!hideFab" />
		</IonContent>
		<BottomNav v-if="!hideBottom" class="mt-auto" />
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
		hideTop: {
			required: false,
			default: false
		},
		hideFab: {
			required: false,
			default: false
		},
		hideBottom: {
			required: false,
			default: false
		}
	},
	components: { InnerTopBar, IonPage, IonContent, BottomNav, Fab }
})
</script>
