<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="layout-page">
				<div class="layout-body">
					<div class="col-span-12 px-3 lg:p-0">
						<template v-if="false">
							<div class="w-full flex justify-between">
								<div></div>
								<div
									class="bg-light_gray p-2 flex items-center justify-center text-2xl text-icon_inactive gap-4 content-center self-center rounded-xl">
									<ion-icon :icon="chevronBackOutline" class="text-2xl"></ion-icon>
									<span class="font-bold">October 2021</span>
									<ion-icon :icon="chevronForwardOutline" class="text-2xl"></ion-icon>
								</div>
								<div
									class="py-2 px-5 relative right-0 rounded-md bg-light_gray flex flex-row items-center justify-center">
									<ion-icon :icon="calendarClear" class="text-2xl text-icon_inactive"></ion-icon>
								</div>
							</div>
							<Calendar />
						</template>
						<template v-else>
						</template>
					</div>
				</div>
				<div class="layout-side-right">
					<side-profile-nav></side-profile-nav>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">

import { IonPage, IonContent } from '@ionic/vue'
import { chevronForwardOutline, chevronBackOutline, calendarClear } from 'ionicons/icons'
import { defineAsyncComponent } from 'vue'
import Calendar from '@app/components/schedule/Calendar.vue'

const SideProfileNav = defineAsyncComponent(() => import('@app/components/layout/sidebars/SideProfileNav.vue'))

export default {
	name: 'schedule',
	layout: 'Dashboard',
	components: { IonPage, IonContent, SideProfileNav, Calendar },
	setup () {
		return {
			chevronForwardOutline, chevronBackOutline, calendarClear
		}
	}
}
</script>
<style scoped>
	ion-toolbar {
		--background: #ffffff;
	}
</style>
