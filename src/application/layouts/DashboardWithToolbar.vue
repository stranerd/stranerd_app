<template>
	<IonPage>
		<InnerTopBar />
		<div class="flex h-full">
			<Sidebar />
			<div class="layout">
				
		
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
import { IonContent,  IonPage,  } from '@ionic/vue'
import RightSidebar from '@app/components/layout/sidebars/RightSidebar.vue'
import InnerTopBar from '@app/components/layout/topNavigations/InnerTopBar.vue'

import Sidebar from '@app/components/layout/sidebars/DefaultSidebar.vue'

export default defineComponent({
	name: 'DashboardWithToolbarLayout',
	components: {
		IonPage,
		IonContent,
		RightSidebar,
	
		InnerTopBar,
		Sidebar
	}
})
</script>
