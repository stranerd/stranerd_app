<template>
	<IonPage>
		<TopBar />
		<div class="flex h-full">
			<Sidebar />
			<div class="layout">
				<IonContent>
					<div class="layout-page ">
						<div class="layout-body">
							<slot />
						</div>
						<div class="layout-side-right">
							<RightSidebar />
						</div>
					</div>
					<!-- fab placed to the bottom start -->
					<Fab />
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
import Fab from '@app/components/layout/Fab.vue'

export default defineComponent({
	name: 'DashboardLayout',
	components: {
		IonContent, IonPage,
		BottomNav,
		Sidebar,
		TopBar,
		RightSidebar,
		Fab
	}

})
</script>
