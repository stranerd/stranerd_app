<template>
	<div>
		<div class="w-full flex justify-between">
			<span class="heading font-bold text-dark_gray">
				Recent transactions
			</span>

			<router-link v-if="transactions.length && isLoggedIn"
				class="text-primary normalText flex items-center font-bold "
				to="/dashboard/wallet">
				<span>view all</span>
				<ion-icon :icon="chevronForwardOutline" class="text-xs md:text-xl"></ion-icon>
			</router-link>
		</div>

		<template v-if="isLoggedIn">
			<Swiper v-if="transactions.length"
				:freeMode="true"
				:items="transactions"
				:slides="3"
				class="flex flex-row w-full items-center mt-2 mb-8"
				slideClass="!w-2/5 !max-w-[18rem] !min-w-[15rem] !pr-3"
			>
				<template v-slot:default="{ item: transaction, index }">
					<TransactionCard :colorClass="0 === index ? 'bg-light_orange' : 'bg-light_gray'"
						:transaction="transaction" />
				</template>
			</Swiper>
			<empty-state v-else btnText="go to Wallet"
				class="my-3"
				info="You don't have any transaction yet"
				route="/dashboard/wallet"
			/>
		</template>
		<template v-else>
			<empty-state
				btnText="Sign In"
				class="my-3"
				info="You need to sign in to view Transaction details"
				route="/auth/Signin"
			/>
		</template>
	</div>
</template>

<script lang="ts">
import { IonIcon } from '@ionic/vue'
import { chevronBackOutline, chevronForwardOutline, ellipse } from 'ionicons/icons'
import Swiper from '@app/components/core/Swiper.vue'
import TransactionCard from '../users/wallet/TransactionCard.vue'
import { useTransactionList } from '@app/composable/payment/transactions'
import { useAuth } from '@app/composable/auth/auth'
import EmptyState from '@app/components/core/EmptyState.vue'
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'RecentTransactions',
	components: { IonIcon, Swiper, TransactionCard, EmptyState },
	setup () {
		const { id, isLoggedIn } = useAuth()
		const { loading, error, transactions: allTransactions } = useTransactionList(id.value)
		const transactions = computed({
			get: () => allTransactions.value.slice(0, 6),
			set: () => {
			}
		})

		return { chevronForwardOutline, chevronBackOutline, ellipse, transactions, isLoggedIn }
	}
})
</script>

<style>

</style>
