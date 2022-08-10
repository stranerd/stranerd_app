<template>
	<DefaultLayout>
		<template v-slot:panel>
			<ProfilePanel />
		</template>
		<template v-slot:content-top-left>
			<div class="flex items-center">
				<IonInput v-model="from" class="max-w-[150px]" placeholder="From" required
					type="date" />
				<IonInput v-model="to" :min="from" class="max-w-[150px]" placeholder="To" required
					type="date" />
			</div>
		</template>
		<TransactionsList />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TransactionsList from '@app/components/payment/transactions/TransactionsList.vue'
import { useRouteMeta } from '@app/composable/core/states'
import ProfilePanel from '@app/components/layout/panels/ProfilePanel.vue'
import { useTransactionsList } from '@app/composable/payment/transactions'

export default defineComponent({
	name: 'AccountWalletTransactions',
	components: { TransactionsList, ProfilePanel },
	setup () {
		const { from, to } = useTransactionsList()
		useRouteMeta('Transaction history', {})
		return { from, to }
	}
})
</script>
