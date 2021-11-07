<template>
	<IonPage>
		<IonContent>
			<div class="col-span-12 px-3">
						<span class="font-bold text-dark_gray headings mb-3">
							Available balance
						</span>
				<BalanceCard :user="user" />
				<TransactionHistory :user-id="id" />
			</div>
		</IonContent>
	</IonPage>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { IonContent, IonPage } from '@ionic/vue'
import BalanceCard from '@app/components/wallet/BalanceCard.vue'
import TransactionHistory from '@app/components/wallet/TranscractionHistory.vue'

const SideProfileNav = defineAsyncComponent(() => import('@app/components/layout/sidebars/RightSidebar.vue'))

export default defineComponent({
	name: 'DashboardWalletPage',
	layout: 'dashboard',
	middlewares: ['isAuthenticated'],
	components: { IonPage, IonContent, SideProfileNav, BalanceCard, TransactionHistory },
	setup () {
		const { id, user } = useAuth()
		return { id, user }

	}

})


</script>
