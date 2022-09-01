<template>
	<Popover :close="close">
		<div class="flex flex-col gap-2 items-center">
			<div class="text-success text-3xl leading-none">
				<IonIcon :icon="checkmarkCircleOutline" />
			</div>
			<IonText class="font-bold text-lg">Question asked successfully</IonText>
			<IonText class="text-secondaryText text-sm">You will get an answer very soon</IonText>
			<IonText v-if="wallet" class="font-thin">
				You have {{ wallet.subscription.data.questions }} questions left
			</IonText>
			<IonButton class="w-full btn-primary mt-2" @click="close">
				Got It
			</IonButton>
		</div>
	</Popover>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { checkmarkCircleOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'QuestionCreated',
	props: {
		close: {
			type: Function,
			required: true
		}
	},
	setup () {
		const { wallet } = useAuth()
		return { wallet, checkmarkCircleOutline }
	}
})
</script>

