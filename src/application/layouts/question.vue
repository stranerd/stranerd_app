<template>
	<IonContent :fullscreen="true">
		<div class="flex h-full">
			<Sidebar />
			<div class="layout">
				<TopBar class="hidden lg:block" />
				<IonHeader class="block lg:hidden" mode="ios">
					<IonToolbar class="px-2">
						<IonButtons slot="start">
							<IonBackButton color="dark" default-href="/questions" text="" />
						</IonButtons>
						<IonTitle>{{ $route.meta.displayName ?? '' }}</IonTitle>
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
	</IonContent>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/vue'
import RightSidebar from '@app/components/layout/sidebars/RightSidebar.vue'
import TopBar from '@app/components/layout/topNavigations/Topbar.vue'
import Sidebar from '@app/components/layout/sidebars/DefaultSidebar.vue'

export default defineComponent({
	name: 'QuestionLayout',
	components: {
		IonContent,
		IonBackButton,
		RightSidebar,
		IonTitle,
		IonButtons,
		IonHeader,
		IonToolbar,
		TopBar,
		Sidebar
	}
})
</script>

<style scoped>
	ion-toolbar {
		--background: #F7F7FC;
	}
</style>
