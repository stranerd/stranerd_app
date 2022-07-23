<template>
	<IonPage class="layout">
		<IonContent :scrollY="false">
			<div class="layout">
				<Topbar v-if="!hideTop" />
				<div class="layout-page">
					<div class="layout-page-left">
						<LeftSidebar class="h-full py-8" />
					</div>
					<div class="layout-page-panel">
						<slot name="panel">
							<DashboardPanel />
						</slot>
					</div>
					<div class="layout-page-main">
						<slot name="content-top">
							<div class="hidden lg:flex gap-4 justify-between items-center px-8 mb-4">
								<IonText class="font-bold text-2xl">{{ $route.meta.routeName ?? 'Stranerd' }}</IonText>
								<div>
									<slot name="content-top-left" />
								</div>
							</div>
						</slot>
						<div :class="{'lg:px-8': !ignorePagePadding}" class="layout-page-content">
							<slot />
						</div>
						<Fab v-if="!hideFab" class="lg:hidden" />
						<BottomNav v-if="!hideBottom" class="mt-auto lg:hidden" />
						<slot name="content-bottom" />
					</div>
					<div class="layout-page-right">
						<RightSidebar class="h-full" />
					</div>
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
		},
		ignorePagePadding: {
			required: false,
			default: false
		}
	},
	components: { Topbar, BottomNav, Fab, LeftSidebar, RightSidebar, DashboardPanel }
})
</script>
