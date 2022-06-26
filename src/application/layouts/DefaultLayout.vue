<template>
	<IonPage class="layout">
		<IonContent>
			<div class="layout-page">
				<div class="hidden lg:block w-[80px] h-screen overflow-y-aut0">
					<LeftSidebar class="h-full py-8" />
				</div>
				<div class="hidden lg:block w-[20%] py-8 h-screen overflow-y-auto">
					<slot name="panel">
						<DashboardPanel />
					</slot>
				</div>
				<div
					class="w-full lg:w-[calc(55%-80px)] flex flex-col h-screen overflow-y-auto lg:border-l-2 lg:border-r-2 lg:border-l-itemBg lg:border-r-itemBg lg:py-8">
					<div class="hidden lg:flex block-padding !py-0 gap-4 justify-between items-center">
						<IonText class="font-bold text-2xl">{{ $route.meta.routeName ?? 'Stranerd' }}</IonText>
						<div>
							<slot name="content-top-left" />
						</div>
					</div>
					<Topbar v-if="!hideTop" class="lg:hidden" />
					<div class="flex flex-col flex-grow">
						<slot />
					</div>
					<Fab v-if="!hideFab" class="lg:hidden" />
					<BottomNav v-if="!hideBottom" class="mt-auto lg:hidden" />
				</div>
				<div class="hidden lg:block w-[25%] py-8 h-screen overflow-y-auto">
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
import DashboardPanel from '@app/components/layout/panels/DashboardPanel.vue'

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
	components: { Topbar, BottomNav, Fab, LeftSidebar, RightSidebar, DashboardPanel }
})
</script>
