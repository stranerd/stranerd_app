<template>
	<IonPage>
		<Topbar />
		<div class="flex h-full">
			<div class="layout">
				<IonContent>
					<div class="layout-page">
						<div class="layout-side-left">
							<Sidebar />
						</div>
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
import RightSidebar from '@app/components/layout/sidebars/RightSidebar.vue'
import Topbar from '@app/components/layout/topNavigations/Topbar.vue'
import Sidebar from '@app/components/layout/sidebars/DefaultSidebar.vue'
import BottomNav from '@app/components/layout/bottomNavigations/BottomNav.vue'

export default defineComponent({
	name: 'DashboardWithToolbarLayout',
	components: {
		IonPage,
		IonContent,
		RightSidebar,
		Topbar,
		Sidebar,
		BottomNav
	}
})
</script>
