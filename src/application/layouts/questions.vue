<template>
	<IonPage>
		<TopBar :isNotDashboard="false" />
		<IonContent :fullscreen="true">
			<div class="layout-page">
				<div class="layout-body">
					<div class="col-span-12  md:col-start-3 md:col-end-11 px-3 ">
						<div class="bg-light_gray rounded-md flex flex-row items-center">
							<router-link active-class="activeSlideTab"
								class="w-1/2 text-center inactiveSlideTab"
								to="/questions/">
								All Questions
							</router-link>
							<router-link active-class="activeSlideTab"
								class="w-1/2 text-center inactiveSlideTab"
								to="/questions/create">
								Ask your question
							</router-link>
						</div>
					</div>
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
	name: 'questions',
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
