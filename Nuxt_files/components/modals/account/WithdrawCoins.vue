<template>
	<Modal :modal="$attrs.modal" :hide-separator="true">
		<template slot="title">
			<span class="text-center w-100 d-block">Withdraw money</span>
		</template>

		<div class="flex flex-col">
			<div class="flex w-100">
				<div class="coin_tab">
					Withdraw Bronze Coins
				</div>
				<div class="coin_tab active">
					Withdraw Gold Coins
				</div>
			</div>

			<span class="spec w-100 text-center my-2">
				Enter withdrawal amount
			</span>

			<div class="flex w-100 items-center gap-1">
				<div class="convert_box">
					<div class="flex items-center gap-1">
						<Coins :gold="true" :size="48" />
						<span>
							7500
						</span>
					</div>
				</div>

				<Icon
					class-name="text-dark"
					size="m"
					icon-name="equal-to"
				/>
				<div class="convert_box ">
					N 75,000
				</div>
			</div>

			<div class="flex w-100 justify-content-end  mt-1">
				<div class="flex flex-col text-right gap-0-5 align-items-end">
					<span>Stranerd Service Fee (20%) :   N 15,000</span>
					<span class="text-right">You will receive:   N 60,000</span>
				</div>
			</div>

			<span class="spec w-100 text-center my-2">
				Enter your bank account details
			</span>

			<div class="flex w-100 items-center gap-1">
				<form action="" class="w-100">
					<div class="form-group flex w-100 gap-1">
						<input
							class="form-control w-50"
							placeholder="Account Number"
							type="text"
						>
						<input
							class="form-control w-50"
							placeholder="Account Name"
							type="text"
						>
					</div>
					<div class="form-group flex w-100 gap-1 mt-1">
						<input
							class="form-control w-50"
							placeholder="Bank"
							type="text"
						>
						<input
							class="form-control w-50"
							placeholder="Authorization (Your Stranerd Password)"
							type="text"
						>
					</div>

					<div class="form-group flex w-100 gap-1 mt-1">
						<button class="sidebar-btn btn">
							<span>Make Withdrawal</span>
						</button>
					</div>
				</form>
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
import { analytics } from '@/modules/core'

export default defineComponent({
	name: 'AccountBuyCoins',
	setup () {
		const { user, getLocalAmount, getLocalCurrencySymbol } = useAuth()
		const { loading, error, buyCoins, BRONZE_PRICES, GOLD_PRICES } = useBuyCoins()
		onMounted(() => {
			analytics.logEvent('Withdraw_coins')
		})
		return {
			user, getLocalAmount, getLocalCurrencySymbol, formatNumber,
			loading, error, buyCoins, BRONZE_PRICES, GOLD_PRICES
		}
	}
})
</script>

<style lang="scss" scoped>
	input {
		padding: 0.6rem 0.75rem !important;
	}

	.convert_box {
		height: 6.75rem;
		width: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.6rem;
		border-radius: 12px;
		font-size: 2.25rem;
		background: $color-primaryDark;
		color: $color-white;
	}

	.spec {
		color: $color-dark;
		font-weight: 700;
		font-size: 1.125rem;
	}

	.coin_tab {
		border: 1px solid $color-line;
		width: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.6rem;
		border-radius: 6px;
		font-weight: 700;
		font-size: 1.125rem;

		&:hover {
			background: $color-primary;
			color: $color-white;
		}
	}

	.active {
		background: $color-primary;
		color: $color-white;
	}

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
