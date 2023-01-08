<template>
	<Popover :close="close">
		<div class="flex flex-col gap-4 items-center text-center">
			<IonText class="font-bold text-lg">You're not subscribed</IonText>
			<IonText>Get access to solutions to your most difficult homework & past questions</IonText>
			<router-link class="w-full" to="/account/subscription/plans">
				<IonButton class="w-full btn-primary">Subscribe</IonButton>
			</router-link>
			<IonText class="text-secondaryText">
				Stranerd Premium Plan monthly subscription will auto-renew each month until you cancel. You can cancel
				at any time. Stranerd can be accessed on any device.
			</IonText>
		</div>
	</Popover>
</template>

<script lang="ts" setup>
defineProps({
	close: {
		type: Function,
		required: true
	}
})
</script>
