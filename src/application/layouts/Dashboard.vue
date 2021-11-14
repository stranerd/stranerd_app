<template>
	<IonPage>
		<div class="flex h-full">
			<Sidebar />
			<div class="layout">
				<TopBar />
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
				<BottomNav class="mt-auto" />
			</div>
		</div>
	</IonPage>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'
import BottomNav from '@app/components/layout/bottomNavigations/BottomNav.vue'
import Sidebar from '@app/components/layout/sidebars/DefaultSidebar.vue'
import RightSidebar from '@app/components/layout/sidebars/RightSidebar.vue'
import TopBar from '@app/components/layout/topNavigations/Topbar.vue'

export default defineComponent({
	name: 'DashboardLayout',
	components: {
		IonPage,
		IonContent,
		BottomNav,
		Sidebar,
		TopBar,
		RightSidebar
	}
})
</script>
