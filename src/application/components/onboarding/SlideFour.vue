<template>
	<div class="w-full h-full bg-primary flex flex-col justify-between">
		<div class="bg-white h-[40%] rounded-b-[35%] flex flex-col justify-center items-center gap-4 ">
			<ion-icon :icon="chatboxEllipses" class=" text-5xl text-cyan" />
			<ion-text class="text-xl text-main_dark font-bold">
				Expert Answers
			</ion-text>
			<ion-text class="text-base text-main_dark max-w-[80vw] text-center">
				Ask questions & get expert answers and detailed explanations to help with your homework and studying.
			</ion-text>
		</div>

		<router-link class="w-full mx-auto flex" to="/auth/signin">
			<ion-button class="btn-white text-main_dark font-bold w-full mx-auto max-w-[280px] mb-10">
				Get Started
			</ion-button>
		</router-link>
	</div>
</template>

<script lang="ts">
import { chatboxEllipses } from 'ionicons/icons'

export default {
	name: 'SlideFour',
	setup () {
		return {
			chatboxEllipses
		}
	}
}
</script>

