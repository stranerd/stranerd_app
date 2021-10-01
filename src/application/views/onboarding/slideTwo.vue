<template>
	<div class="flex container flex-col bg-dark h-screen w-screen justify-center items-center">
		<img src="../../assets/images/onboarding/answerAQuestion.svg" alt="ask a question" class="object-fit">

		<h1 class="text-xl text-white font-extrabold  mt-6">Answer a Question</h1>
		<p class="text-center text-white w-64 text-xs mt-2">
			Answer questions in subjects you are very good at and get rewarded if your answer is chosen as one of the best answers
		</p>

		<div class="mt-32 w-10/12">
			<ion-button  class="w-full font-bold mb-3">Get Started</ion-button>
			<ion-button  class="w-full font-bold">Login</ion-button>
		</div>
	

		<img src="../../assets/images/icons/logo-xs.svg" alt="ask a question" class="object-fit fixed bottom-5">
	</div>
</template>

<script>
import { IonButton } from '@ionic/vue'
import { defineComponent } from 'vue'

export default defineComponent({
	components: { IonButton }
})
</script>

