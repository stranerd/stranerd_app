<template>
	<Popover :close="close">
		<div class="flex flex-col gap-2 items-center text-center">
			<div class="text-danger text-3xl leading-none">
				<IonIcon :icon="alertCircleOutline" />
			</div>
			<IonText class="font-bold text-lg">You have used up your questions</IonText>
			<IonText class="text-secondaryText text-sm">Wait for your subscription to renew to be able to ask more
				questions
			</IonText>
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
	name: 'NoMoreQuestions',
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
