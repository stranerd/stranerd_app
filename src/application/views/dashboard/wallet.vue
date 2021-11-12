<template>
	<IonPage>
		<IonContent>
			<div class="col-span-12">
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
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { IonContent, IonPage } from '@ionic/vue'
import BalanceCard from '@app/components/users/wallet/BalanceCard.vue'
import TransactionHistory from '@app/components/users/wallet/TranscractionHistory.vue'

export default defineComponent({
	name: 'DashboardWalletPage',
	layout: 'dashboard',
	middlewares: ['isAuthenticated'],
	components: { IonPage, IonContent, BalanceCard, TransactionHistory },
	setup () {
		const { id, user } = useAuth()
		return { id, user }
	}
})


</script>
