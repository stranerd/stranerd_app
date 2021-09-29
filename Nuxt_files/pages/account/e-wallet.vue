<template>
	<div class="flex flex-col gap-3">
		<UserCreditBalanceCard :user="user" />
		<UserTransactionList :user-id="id" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@/application/hooks/auth/auth'
import UserTransactionList from '@app/components/payment/transactions/UserTransactionList.vue'
import UserCreditBalanceCard from '@app/components/users/account/UserCreditBalanceCard.vue'

export default defineComponent({
	name: 'AccountEWalletPage',
	components: { UserTransactionList, UserCreditBalanceCard },
	layout: 'dashboard',
	middleware: 'isAuthenticated',
	setup () {
		const { id, user } = useAuth()
		return { id, user }
	},
	head: {}
})
</script>
