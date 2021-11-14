<template>
	<IonPage>
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
				<IonContent>
					<div class="layout-page">
						<div class="layout-body">
							<slot />
						</div>
						<div class="layout-side-right">
							<RightSidebar />
						</div>
					</div>
				</IonContent>
			</div>
		</div>
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
import RightSidebar from '@app/components/layout/sidebars/RightSidebar.vue'
import TopBar from '@app/components/layout/topNavigations/Topbar.vue'
import Sidebar from '@app/components/layout/sidebars/DefaultSidebar.vue'

export default defineComponent({
	name: 'QuestionLayout',
	components: {
		IonPage,
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
