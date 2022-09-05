<template>
	<Popover :close="close">
		<div class="flex flex-col gap-2 items-center">
			<div class="text-danger text-3xl leading-none">
				<IonIcon :icon="alertCircleOutline" />
			</div>
			<IonText class="font-bold text-lg">You're not subscribed</IonText>
			<IonText class="text-secondaryText text-sm">Subscribe to continue</IonText>
			<IonButton class="w-full mt-2 btn-outline" @click="navigate">Subscribe</IonButton>
			<IonButton class="w-full btn-primary mt-2" @click="close">
				Got It
			</IonButton>
		</div>
	</Popover>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { alertCircleOutline } from 'ionicons/icons'
import { useRouter } from 'vue-router'
import { useWallet } from '@app/composable/payment/wallets'

export default defineComponent({
	name: 'NeedsSubscription',
	props: {
		close: {
			type: Function,
			required: true
		}
	},
	setup () {
		const { saveRouteForAfterSub } = useWallet()
		const router = useRouter()
		const navigate = async () => {
			await saveRouteForAfterSub()
			await router.push('/account/subscription/plans')
		}
		return { alertCircleOutline, navigate }
	}
})
</script>
