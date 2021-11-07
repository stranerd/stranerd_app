<template>
	<IonPage>
		<IonContent>
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
				<template v-else />
			</div>
		</IonContent>
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'
import { calendarClear, chevronBackOutline, chevronForwardOutline } from 'ionicons/icons'
import Calendar from '@app/components/schedule/Calendar.vue'

export default defineComponent({
	name: 'DashboardSchedulePage',
	layout: 'dashboard',
	components: { IonPage, IonContent, Calendar },
	setup () {
		return {
			chevronForwardOutline, chevronBackOutline, calendarClear
		}
	}
})
</script>
<style scoped>
	ion-toolbar {
		--background: #ffffff;
	}
</style>
