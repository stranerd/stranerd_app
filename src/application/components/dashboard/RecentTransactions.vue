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
			<div v-if="transactions.length" class="flex md:gap-6 gap-3 mt-2 mb-8">
				<swiper
					:freeMode="true"
					:slidesPerView="3"
					class="flex flex-row w-full items-center" direction="horizontal"
				>
					<swiper-slide
						v-for="(transaction,index) in shortenTransactionList"
						:key="index" class="!w-2/5 !max-w-[18rem] !min-w-[15rem] !pr-3">
						<TransactionCard :colorClass="0 === index ? 'bg-light_orange' : 'bg-light_gray'"
							:transaction="transaction" />
					</swiper-slide>

				</swiper>
			</div>
			<div v-else class="py-3">
				<empty-state
					btnText="go to Wallet"
					info="You haven't made any transaction yet"
					route="/dashboard/wallet"
				></empty-state>
			</div>
		</template>
		<template v-else>
			<div class="py-3">
				<empty-state
					btnText="Sign In"
					info="You need to sign in to view Transaction details"
					route="/auth/Signin"
				></empty-state>
			</div>
		</template>

	</div>
</template>


<script lang="ts">
import { IonIcon } from '@ionic/vue'
import { chevronBackOutline, chevronForwardOutline, ellipse } from 'ionicons/icons'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.min.css'
import TransactionCard from '../users/wallet/TransactionCard.vue'
import { useTransactionList } from '@app/composable/payment/transactions'
import { useAuth } from '@app/composable/auth/auth'
import EmptyState from '@app/components/core/EmptyState.vue'
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'RecentTransactions',
	components: { IonIcon, Swiper, SwiperSlide, TransactionCard, EmptyState },
	setup () {
		const { id, isLoggedIn } = useAuth()
		const { loading, error, transactions } = useTransactionList(id.value)
		const shortenTransactionList = computed({
			get: () => {
				return transactions.value.slice(0, 6)
			},
			set: () => {
			}
		})

		return { chevronForwardOutline, chevronBackOutline, ellipse, transactions, isLoggedIn, shortenTransactionList }
	}
})
</script>

<style>

</style>
