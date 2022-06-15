<template>
	<IonPage>
		<Topbar v-if="!hideTop" />
		<IonContent>
			<div class="layout-page !px-0">
				<div class="layout-body !w-full">
					<slot />
				</div>
			</div>
		</IonContent>
		<Fab />
		<BottomNav v-if="!hideBottom" class="mt-auto" />
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Topbar from '@app/components/layout/topNavigations/Topbar.vue'
import BottomNav from '@app/components/layout/bottomNavigations/BottomNav.vue'
import Fab from '@app/components/layout/Fab.vue'

export default defineComponent({
	name: 'DefaultLayout',
	props: {
		hideTop: {
			required: false,
			default: false
		},
		hideBottom: {
			required: false,
			default: false
		}
	},
	components: { Topbar, BottomNav, Fab }
})
</script>
