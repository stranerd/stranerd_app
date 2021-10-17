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
						<BalanceCard/>
						<TranscractionHistory/>
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

import { IonPage, IonContent } from '@ionic/vue'
import { defineAsyncComponent } from 'vue'
import BalanceCard from '@/application/components/wallet/BalanceCard.vue'
import TranscractionHistory from '@/application/components/wallet/TranscractionHistory.vue'
const SideProfileNav = defineAsyncComponent(() => import('@/application/components/layout/sidebars/SideProfileNav.vue'))

export default  {
	name: 'wallet',
	components: { IonPage, IonContent, SideProfileNav,  BalanceCard, TranscractionHistory,  }
}
</script>
