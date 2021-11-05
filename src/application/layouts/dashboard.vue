<template>
	<IonPage>
		<TopBar :isNotDashboard="false" />
		<IonContent :fullscreen="true">
			<div class="layout-page">
				<div class="layout-body">
					<slot />
				</div>
				<div class="layout-side-right">
					<SideProfileNav />
				</div>
			</div>
		</IonContent>
		<SideNavBar />
		<BottomNav />
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'
import BottomNav from '@app/components/layout/bottomNavigations/BottomNav.vue'
import SideNavBar from '@app/components/layout/sidebars/DefaultSidebar.vue'
import SideProfileNav from '@app/components/layout/sidebars/SideProfileNav.vue'
import TopBar from '@app/components/layout/topNavigations/Topbar.vue'

export default defineComponent({
	name: 'dashboard',
	components: {
		IonPage,
		BottomNav,
		SideNavBar,
		IonContent,
		TopBar,
		SideProfileNav
	}
})
</script>
