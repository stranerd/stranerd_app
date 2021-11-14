<template>
	<div class="flex h-screen">
		<Sidebar />
		<div class="layout">
			<TopBar class="hidden lg:block" />
			<IonHeader class="block lg:hidden" mode="ios">
				<IonToolbar class="px-2">
					<IonButtons slot="start">
						<IonBackButton color="dark" default-href="/dashboard" text="" />
					</IonButtons>
					<IonTitle>Schedule</IonTitle>
					<IonButtons slot="end">
						<IonIcon :icon="calendar" class="text-[24px] text-dark_gray" />
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<div class="layout-page">
				<div class="layout-body">
					<slot />
				</div>
				<div class="layout-side-right">
					<RightSidebar />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonBackButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/vue'
import { calendar } from 'ionicons/icons'
import RightSidebar from '@app/components/layout/sidebars/RightSidebar.vue'
import TopBar from '@app/components/layout/topNavigations/Topbar.vue'
import Sidebar from '@app/components/layout/sidebars/DefaultSidebar.vue'

export default defineComponent({
	name: 'ScheduleLayout',
	components: {
		IonBackButton,
		RightSidebar,
		IonTitle,
		IonButtons,
		IonHeader,
		IonToolbar,
		IonIcon,
		TopBar,
		Sidebar
	},
	setup () {
		return { calendar }
	}
})
</script>
