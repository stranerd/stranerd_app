<template>
	<div class="flex flex-col lg:gap-4">
		<div class="border-bottom-line px-4 py-6 lg:p-0">
			<div class="flex items-center justify-between card-sm gap-4 p-6 bg-primaryBg text-primaryText">
				<div class="flex flex-col">
					<IonText class="text-xl">
						<span v-html="formatCurrency('NGN')" />
						{{ wallet.balance.amount }}
					</IonText>
					<IonText>Available balance</IonText>
				</div>
			</div>
		</div>
		<div class="flex flex-col card-padding lg:p-0 text-secondaryText border-bottom-line">
			<router-link v-for="{ label, route, icon } in [
				{ label: 'Account details', route: '/account/wallet/details', icon: businessOutline },
				{ label: 'Subscription', route: '/settings/subscription', icon: cardOutline },
				{ label: 'Transaction history', route: '/account/wallet/transactions', icon: fileTrayFullOutline },
			]" :key="route" :to="route" class="flex gap-4 py-3 items-center">
				<IonIcon :icon="icon" />
				<span>{{ label }}</span>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UserEntity } from '@modules/users'
import { WalletEntity } from '@modules/payment'
import { businessOutline, cardOutline, fileTrayFullOutline } from 'ionicons/icons'
import { formatCurrency } from '@utils/commons'

export default defineComponent({
	name: 'UserWallet',
	props: {
		user: {
			type: UserEntity,
			required: true
		},
		wallet: {
			type: WalletEntity,
			required: true
		}
	},
	setup () {
		return { formatCurrency, businessOutline, cardOutline, fileTrayFullOutline }
	}
})
</script>
