<template>
	<Popover :close="close">
		<div class="flex flex-col gap-2 items-center">
			<div class="text-danger text-3xl leading-none">
				<IonIcon :icon="alertCircleOutline" />
			</div>
			<IonText class="font-bold text-lg">You're not subscribed</IonText>
			<IonText class="text-secondaryText text-sm">Subscribe to continue</IonText>
			<router-link class="w-full mt-2" to="/account/subscription/plans">
				<IonButton class="w-full btn-outline">Subscribe</IonButton>
			</router-link>
			<IonButton class="w-full btn-primary mt-2" @click="close">
				Got It
			</IonButton>
		</div>
	</Popover>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { alertCircleOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'NeedsSubscription',
	props: {
		close: {
			type: Function,
			required: true
		}
	},
	setup () {
		return { alertCircleOutline }
	}
})
</script>
