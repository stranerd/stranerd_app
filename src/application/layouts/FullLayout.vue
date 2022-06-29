<template>
	<IonPage class="layout">
		<IonContent>
			<div class="layout-page">
				<div class="layout-page-left">
					<LeftSidebar class="h-full py-8" />
				</div>
				<div class="layout-page-main">
					<Topbar v-if="!hideTop" class="lg:hidden fixed" />
					<div class=" layout-page-content">
						<slot />
					</div>
					<Fab v-if="!hideFab" class="lg:hidden" />
					<BottomNav v-if="!hideBottom" class="mt-auto lg:hidden fixed bottom-0" />
				</div>
				<div class="layout-page-right">
					<RightSidebar class="h-full" />
				</div>
			</div>
		</IonContent>
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Topbar from '@app/components/layout/topNavigations/Topbar.vue'
import BottomNav from '@app/components/layout/bottomNavigations/BottomNav.vue'
import Fab from '@app/components/layout/Fab.vue'
import LeftSidebar from '@app/components/layout/sidebars/LeftSidebar.vue'
import RightSidebar from '@app/components/layout/sidebars/RightSidebar.vue'

export default defineComponent({
	name: 'FullLayout',
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
	components: { Topbar, BottomNav, Fab, LeftSidebar, RightSidebar }
})
</script>
