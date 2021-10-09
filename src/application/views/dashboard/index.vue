<template>

	
	<ion-page class="layout-page">
		<top-bar></top-bar>
		<div class="layout-body mb-4">
			
			<section class="layout-side-left z-50">
				<Sidebar/>
			</section>
			<main class="layout-main">
				<IonRouterOutlet class="w-[94%] lg:w-[60%] lg:mr-auto lg:ml-[18.5%] mx-auto mt-16 pb-5"/>
			</main>
			<section class="layout-side-right z-50">
				<SideProfileNav />
			</section>
			
			<bottom-nav></bottom-nav>
		</div>
	</ion-page>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue'

const BottomNav = defineAsyncComponent(() => import('@/application/components/layout/bottomNavigations/BottomNav.vue'))
const TopBar = defineAsyncComponent(() => import('@/application/components/layout/topNavigations/Topbar.vue'))
const Sidebar = defineAsyncComponent(() => import('@/application/components/layout/sideNavigations/SideTabbar.vue'))
const SideProfileNav = defineAsyncComponent(() => import('@/application/components/layout/sideNavigations/SideProfileNav.vue'))
import { IonPage,  IonRouterOutlet } from '@ionic/vue'

export default {
	name: 'dashboard',
	components: { BottomNav, IonPage, IonRouterOutlet, TopBar, Sidebar, SideProfileNav },
	setup() {
		return {
			
		}
	}
}
</script>
