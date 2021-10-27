<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="layout-page">
				<div class="layout-body">
					<!-- page contents goes here -->
					<div class="col-span-12 px-3">
						<span class="font-bold text-dark_gray headings mb-3">
							Available balance
						</span>
						<BalanceCard :user="user"/>
						<TranscractionHistory :user-id="id"/>
					</div>
				
				</div>
				<div class="layout-side-right">
					<side-profile-nav></side-profile-nav>
				</div>
			</div>		
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent,  defineAsyncComponent } from 'vue'
import { useAuth } from '@/application/composable/auth/auth'
import { IonPage, IonContent } from '@ionic/vue'
import BalanceCard from '@/application/components/wallet/BalanceCard.vue'
import TranscractionHistory from '@/application/components/wallet/TranscractionHistory.vue'
const SideProfileNav = defineAsyncComponent(() => import('@/application/components/layout/sidebars/SideProfileNav.vue'))

export default defineComponent(  {
	name: 'wallet',
	layout: 'Dashboard',
	components: { IonPage, IonContent, SideProfileNav,  BalanceCard, TranscractionHistory,  },
	setup(){
		const { id, user } = useAuth()
		return { id, user }

	},
	
})
	

</script>
