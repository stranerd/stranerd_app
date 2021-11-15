<template>
	<div>
		<div class="w-full flex justify-between">
			<span class="heading font-bold text-dark_gray">
				Recent transactions
			</span>

			<router-link v-if="transactions.length && isLoggedIn"
				class="text-primary normalText flex items-center font-bold "
<<<<<<< HEAD
				to="/dashboard/wallet">
=======
				to="/wallet">
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
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
<<<<<<< HEAD
				route="/dashboard/wallet"
=======
				route="/wallet"
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
			/>
		</template>
		<template v-else>
			<empty-state
				btnText="Sign In"
				class="my-3"
				info="You need to sign in to view Transaction details"
<<<<<<< HEAD
				route="/auth/Signin"
=======
				route="/auth/signin"
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
			/>
		</template>
	</div>
</template>

<script lang="ts">
<<<<<<< HEAD
=======
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
import { IonIcon } from '@ionic/vue'
import { chevronBackOutline, chevronForwardOutline, ellipse } from 'ionicons/icons'
import Swiper from '@app/components/core/Swiper.vue'
import TransactionCard from '../users/wallet/TransactionCard.vue'
import { useTransactionList } from '@app/composable/payment/transactions'
import { useAuth } from '@app/composable/auth/auth'
import EmptyState from '@app/components/core/EmptyState.vue'
<<<<<<< HEAD
import { computed, defineComponent } from 'vue'
=======
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c

export default defineComponent({
	name: 'RecentTransactions',
	components: { IonIcon, Swiper, TransactionCard, EmptyState },
	setup () {
		const { id, isLoggedIn } = useAuth()
<<<<<<< HEAD
		const { loading, error, transactions: allTransactions } = useTransactionList(id.value)
=======
		const { loading, error, listener, transactions: allTransactions } = useTransactionList(id.value)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
		const transactions = computed({
			get: () => allTransactions.value.slice(0, 6),
			set: () => {
			}
		})

<<<<<<< HEAD
		return { chevronForwardOutline, chevronBackOutline, ellipse, transactions, isLoggedIn }
=======
		return {
			chevronForwardOutline, chevronBackOutline, ellipse,
			transactions, isLoggedIn, loading, error
		}
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
	}
})
</script>

<style>

</style>
