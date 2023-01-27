<template>
	<IonPage class="layout">
		<IonContent :scrollY="false">
			<div class="layout">
				<Topbar :hideContent="hideTop" class="lg:hidden" />
				<div class="layout-page">
					<div class="layout-page-left">
						<LeftSidebar class="h-full py-8" />
					</div>
					<div class="layout-page-main">
						<slot name="content-top">
							<div class="hidden lg:flex gap-8 justify-between items-center mb-8 page-side-padding">
								<div class="flex gap-8 items-center">
									<IonBackButton v-if="$route.meta.back" :icon="arrowBackOutline"
										class="text-base" defaultHref="/dashboard" mode="ios" text="" />
									<IonText class="font-bold text-2xl truncate max-w-[400px] capitalize">
										{{ $route.meta.routeName ?? '' }}
									</IonText>
								</div>
								<div>
									<slot name="content-top-left">
										<DesktopTopbar />
									</slot>
								</div>
							</div>
						</slot>
						<div :class="{'page-side-padding': !ignorePagePadding}" class="layout-page-content">
							<slot />
						</div>
						<div :class="{'page-side-padding': !ignorePagePadding}" class="mt-auto">
							<Fab v-if="!hideFab" class="lg:hidden" />
							<BottomNav :hideContent="hideBottom" class="lg:hidden" />
							<slot name="content-bottom" />
						</div>
					</div>
					<div class="layout-page-right">
						<RightSidebar class="h-full" />
					</div>
				</div>
			</div>
		</IonContent>
	</IonPage>
</template>

<script lang="ts" setup>
import Topbar from '@app/components/layout/topNavigations/Topbar.vue'
import BottomNav from '@app/components/layout/bottomNavigations/BottomNav.vue'
import Fab from '@app/components/layout/Fab.vue'
import LeftSidebar from '@app/components/layout/sidebars/LeftSidebar.vue'
import RightSidebar from '@app/components/layout/sidebars/RightSidebar.vue'
import { arrowBackOutline } from 'ionicons/icons'
import DesktopTopbar from '@app/components/layout/topNavigations/DesktopTopbar.vue'

defineProps({
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
})
</script>
