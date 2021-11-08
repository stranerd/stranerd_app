<template>
	<IonContent :fullscreen="true">
		<div class="flex h-full">
			<Sidebar />
			<div class="layout">
				<TopBar />
				<div class="layout-page">
					<div class="layout-body">
						<slot />
					</div>
					<div class="layout-side-right">
						<RightSidebar />
					</div>
				</div>
				<BottomNav class="mt-auto" />
			</div>
		</div>
	</IonContent>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent } from '@ionic/vue'
import BottomNav from '@app/components/layout/bottomNavigations/BottomNav.vue'
import Sidebar from '@app/components/layout/sidebars/DefaultSidebar.vue'
import RightSidebar from '@app/components/layout/sidebars/RightSidebar.vue'
import TopBar from '@app/components/layout/topNavigations/Topbar.vue'

export default defineComponent({
	name: 'dashboard',
	components: {
		BottomNav,
		Sidebar,
		IonContent,
		TopBar,
		RightSidebar
	}
})
</script>
