<template>
<<<<<<< HEAD
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
=======
	<DashboardLayout>
		<div>
			<span class="font-bold text-dark_gray headings mb-3">
				Available balance
			</span>
			<BalanceCard :user="user" />
			<TransactionHistory :user-id="id" />
		</div>
	</DashboardLayout>
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
<<<<<<< HEAD
import { IonContent, IonPage } from '@ionic/vue'
=======
import DashboardLayout from '@app/layouts/Dashboard.vue'
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
import BalanceCard from '@app/components/users/wallet/BalanceCard.vue'
import TransactionHistory from '@app/components/users/wallet/TranscractionHistory.vue'

export default defineComponent({
	name: 'Wallet',
<<<<<<< HEAD
	layout: 'dashboard',
	middlewares: ['isAuthenticated'],
	components: { IonPage, IonContent, BalanceCard, TransactionHistory },
=======
	middlewares: ['isAuthenticated'],
	components: { DashboardLayout, BalanceCard, TransactionHistory },
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
	setup () {
		const { id, user } = useAuth()
		return { id, user }
	}
})
</script>
