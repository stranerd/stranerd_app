<template>
	<Modal :close="close" :hideHeader="true" class="h-screen md:h-auto">
		<div class="flex flex-col flex-grow gap-2 items-center">
			<img alt="" class="w-24 my-2" src="@app/assets/images/questionCreated.png">
			<IonText class="font-bold text-lg">Question asked successfully</IonText>
			<IonText class="text-secondaryText text-center mb-2">
				An expert tutor will answer this question soon.<br />
				Students can also answer this question.
			</IonText>
			<span v-if="wallet" class="card p-4 bg-highlight text-center w-full mb-4">
				You have <span class="font-bold">{{
					wallet.subscription.data.questions
				}} questions</span> left
			</span>
			<IonText class="font-bold text-lg mb-2">Suggested actions</IonText>
			<div class="flex flex-col gap-4 w-full text-secondaryText">
				<router-link v-for="{ title, route, icon } in [
					{ title: 'Ask a question', route: '/questions/create', icon: helpCircleOutline },
					{ title: 'Create a flashcard', route: '/study/flashCards/create', icon: copyOutline },
					{ title: 'Practice for tests and exams', route: '/study/', icon: bookOutline },
				]" :key="route" :to="route" class="card-sm card-padding !gap-4 items-center flex">
					<IonIcon :icon="icon" />
					<IonText>{{ title }}</IonText>
					<IonIcon :icon="arrowForwardOutline" class="ml-auto" />
				</router-link>
			</div>
			<IonButton class="w-full btn-primary mt-auto" @click="close">
				Got It
			</IonButton>
		</div>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { arrowForwardOutline, bookOutline, copyOutline, helpCircleOutline } from 'ionicons/icons'

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
		return { wallet, arrowForwardOutline, helpCircleOutline, copyOutline, bookOutline }
	}
})
</script>

