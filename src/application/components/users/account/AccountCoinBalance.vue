<template>
	<span class="w-100 mx-auto d-flex justify-content-center gap-2" style="max-width: 300px;">
		<span class="balance">
			<Coins :size="30" />
			<span class="amount">
				<DynamicText :no-wrap="true">{{ formatNumber(user.account.coins.bronze) }}</DynamicText>
			</span>
		</span>
		<span class="balance">
			<Coins :gold="true" :size="30" />
			<span class="amount">
				<DynamicText :no-wrap="true">{{ formatNumber(user.account.coins.gold) }}</DynamicText>
			</span>
		</span>
	</span>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { formatNumber } from '@/utils/commons'
import { UserEntity } from '@/modules/users'

export default defineComponent({
	name: 'AccountCoinBalance',
	props: {
		user: {
			required: true,
			type: Object as PropType<UserEntity>
		}
	},
	setup () {
		return { formatNumber }
	}
})
</script>

<style lang="scss" scoped>
	.balance {
		display: flex;
		align-items: center;

		img {
			position: relative;
			z-index: 1;
		}

		.amount {
			display: inline-block;
			width: fit-content;
			margin-left: -2rem;
			padding: 0.2rem 1rem 0.2rem 2.25rem;
			border-radius: 10rem;
			color: $color-dark;
			background: $color-tags;
			border: 1px solid $color-line;
		}
	}
</style>
