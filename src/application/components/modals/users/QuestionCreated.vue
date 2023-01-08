<template>
	<Modal :close="close" :hideHeader="true" class="h-screen md:h-auto">
		<div class="flex flex-col flex-grow gap-2 items-center">
			<img alt="" class="w-24 my-2" src="@app/assets/images/questionCreated.svg">
			<IonText class="font-bold text-lg">Question asked successfully</IonText>
			<IonText class="text-secondaryText text-center mb-2">
				An expert tutor will answer this question soon.<br />
				Students can also answer this question.
			</IonText>
			<span v-if="wallet" class="card-sm p-4 bg-highlight text-center w-full mb-4">
				You have <span class="font-bold">{{
					wallet.subscription.data.questions
				}} questions</span> left
			</span>
			<SuggestedActions />
			<IonButton class="w-full btn-primary mt-auto" @click="close">
				Got It
			</IonButton>
		</div>
	</Modal>
</template>

<script lang="ts" setup>
import { useAuth } from '@app/composable/auth/auth'

defineProps({
	close: {
		type: Function,
		required: true
	}
})

const { wallet } = useAuth()
</script>

