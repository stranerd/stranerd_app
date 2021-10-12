<template>
	<Modal :modal="$attrs.modal">
		<template slot="title">
			<div class="flex gap-2">
				<span>Buy Coins</span>
				<span class="ms-auto" style="font-size: 1rem;">
					<AccountCoinBalance :user="user" />
				</span>
			</div>
		</template>
		<div class="flex flex-col flex-md-row items-center">
			<div class="flex flex-col gap-1 flex-grow-1 w-100 border-lg p-1">
				<h5 class="headertext">
					Bronze
				</h5>
				<div
					v-for="option in BRONZE_PRICES"
					:key="option.amount"
					class="flex items-center gap-1"
					style="font-size: 1.5rem;"
				>
					<img :src="option.src" alt="" width="48">
					<DynamicText>{{ option.amount }}</DynamicText>
					<button
						:class="option.suggested ? 'btn-dark' : 'btn-primary'"
						class="btn ms-auto customStyle"
						@click="buyCoins(option, false)"
					>
						{{ getLocalCurrencySymbol() }}{{ getLocalAmount(option.price) }}
					</button>
				</div>
			</div>
			<div class="flex flex-col gap-1 flex-grow-1 w-100 p-1">
				<h5 class="headertext">
					Gold
				</h5>
				<div
					v-for="option in GOLD_PRICES"
					:key="option.amount"
					class="flex items-center gap-1"
					style="font-size: 1.5rem;"
				>
					<img :src="option.src" alt="" width="48">
					<DynamicText>{{ option.amount }}</DynamicText>
					<button
						:class="option.suggested ? 'btn-dark' : 'btn-primary'"
						class="btn ms-auto customStyle"
						@click="buyCoins(option, true)"
					>
						{{ getLocalCurrencySymbol() }}{{ getLocalAmount(option.price) }}
					</button>
				</div>
			</div>
		</div>
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useAuth } from '@/application/hooks/auth/auth'
import { formatNumber } from '@/utils/commons'
import { useBuyCoins } from '@/application/hooks/users/account'
import AccountCoinBalance from '@app/components/users/account/AccountCoinBalance.vue'
import { analytics } from '@/modules/core'

export default defineComponent({
	name: 'AccountBuyCoins',
	components: { AccountCoinBalance },
	setup () {
		const { user, getLocalAmount, getLocalCurrencySymbol } = useAuth()
		const { loading, error, buyCoins, BRONZE_PRICES, GOLD_PRICES } = useBuyCoins()
		onMounted(() => {
			analytics.logEvent('buy_coins_start')
		})
		return {
			user, getLocalAmount, getLocalCurrencySymbol, formatNumber,
			loading, error, buyCoins, BRONZE_PRICES, GOLD_PRICES
		}
	}
})
</script>

<style lang="scss" scoped>
	.headertext {
		margin: 0;
		font-weight: bold;
		font-size: 1.25rem;
	}

	.customStyle {
		border-radius: 10rem;
		font-size: 18px;
	}

	.border-lg {
		border: 0;
		@media (min-width: $lg) {
			border-right: 1px solid $color-line;
		}
	}
</style>
