<template>
	<IonPage class="layout">
		<Topbar v-if="!hideTop" class="lg:hidden" />
		<IonContent>
			<div class="layout-page">
				<div class="hidden lg:block w-[80px]">
					<LeftSidebar class="h-screen overflow-y-auto" />
				</div>
				<div class="hidden lg:block w-[20.8333%]">
					<SubSidebar class="h-screen overflow-y-auto" />
				</div>
				<div
					class="w-full lg:w-[calc(54.167%-80px)] h-screen overflow-y-auto border-left-line border-right-line">
					<slot />
				</div>
				<div class="hidden lg:block w-[25%]">
					<RightSidebar class="h-screen overflow-y-auto" />
				</div>
			</div>
		</IonContent>
		<Fab v-if="!hideFab" class="lg:hidden" />
		<BottomNav v-if="!hideBottom" class="mt-auto lg:hidden" />
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Topbar from '@app/components/layout/topNavigations/Topbar.vue'
import BottomNav from '@app/components/layout/bottomNavigations/BottomNav.vue'
import Fab from '@app/components/layout/Fab.vue'
import LeftSidebar from '@app/components/layout/sidebars/LeftSidebar.vue'
import RightSidebar from '@app/components/layout/sidebars/RightSidebar.vue'
import SubSidebar from '@app/components/layout/sidebars/SubSidebar.vue'

export default defineComponent({
	name: 'DefaultLayout',
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
	components: { Topbar, BottomNav, Fab, LeftSidebar, RightSidebar, SubSidebar }
})
</script>
