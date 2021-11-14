<template>
	<DashboardLayout>
		<div>
			<span class="font-bold text-dark_gray headings mb-3">
				Available balance
			</span>
			<BalanceCard :user="user" />
			<TransactionHistory :user-id="id" />
		</div>
	</DashboardLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import BalanceCard from '@app/components/users/wallet/BalanceCard.vue'
import TransactionHistory from '@app/components/users/wallet/TranscractionHistory.vue'

export default defineComponent({
	name: 'Wallet',
	middlewares: ['isAuthenticated'],
	components: { DashboardLayout, BalanceCard, TransactionHistory },
	setup () {
		const { id, user } = useAuth()
		return { id, user }
	}
})
</script>
