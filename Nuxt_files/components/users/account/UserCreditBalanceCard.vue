<template>
	<div class="flex flex-col gap-1 gap-md-2 align-items-center justify-content-center">
		<h4 class="headertext mb-0">
			Available Balance
		</h4>
		<div
			class="px-0-5 px-sm-1 py-3 p-md-3 boxStyle shadow flex col-12 col-md-10 gap-1 align-content-center justify-content-center"
		>
			<div class="flex col-6 gap-2 align-items-center justify-content-center ">
				<Coins :size="45" />
				<DynamicText class="largeText">
					{{ formatNumber(user.account.coins.bronze) }}
				</DynamicText>
			</div>
			<div class="border border-line" />
			<div class="flex col-6 gap-2 align-items-center justify-content-center">
				<DynamicText class="largeText">
					{{ formatNumber(user.account.coins.gold) }}
				</DynamicText>
				<Coins :gold="true" :size="45" />
			</div>
		</div>

		<div>
			<button class="sidebar-btn btn" @click="openWithdrawCoins">
				<span>Withdraw</span>
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { UserEntity } from '@/modules/users'
import { formatNumber } from '@/utils/commons'
import { useAccountModal } from '@/application/hooks/core/modals'

export default defineComponent({
	name: 'UserCreditBalanceCard',
	props: {
		user: {
			required: true,
			type: Object as PropType<UserEntity>
		}
	},
	setup () {
		return { formatNumber, openBuyCoins: useAccountModal().openBuyCoins, openWithdrawCoins: useAccountModal().openWithdrawCoins }
	}
})
</script>
<style lang="scss" scoped>
	.btn {
		min-width: 11.25rem;
	}

	.boxStyle {
		border-radius: 6px;
	}

	.largeText {
		font-weight: bold;
		color: $color-dark;
		font-size: 29px;
	}

	.headertext {
		font-weight: bold;
		color: $color-dark;
	}
</style>
