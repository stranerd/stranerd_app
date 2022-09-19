<template>
	<IonPage class="layout">
		<IonContent :scrollY="false">
			<div class="layout">
				<Topbar :class="[hideTop? 'hidden lg:block':'' ]" />
				<div class="layout-page">
					<div class="layout-page-left">
						<LeftSidebar class="h-full py-8" />
					</div>
					<div :class="{'lg:px-8': !ignorePagePadding}" class="layout-page-main">
						<slot name="content-top">
							<div :class="{'lg:px-8': ignorePagePadding}"
								class="hidden lg:flex gap-8 justify-between items-center mb-4">
								<div class="flex gap-8 items-center">
									<IonBackButton v-if="$route.meta.back" :icon="arrowBackOutline"
										class="text-base" defaultHref="/dashboard" mode="ios" text="" />
									<IonText class="font-bold text-2xl truncate max-w-[400px] capitalize">
										{{ $route.meta.routeName ?? '' }}
									</IonText>
								</div>
								<div>
									<slot name="content-top-left" />
								</div>
							</div>
						</slot>
						<div class="layout-page-content">
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
import { arrowBackOutline } from 'ionicons/icons'

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
	components: { Topbar, BottomNav, Fab, LeftSidebar, RightSidebar },
	setup () {
		return { arrowBackOutline }
	}
})
</script>
