<template>
	<div class="w-full h-full bg-primary flex flex-col justify-between">
		<div class="bg-white h-[40%] rounded-b-[35%] flex flex-col justify-center items-center gap-4 ">
			<ion-icon :icon="reader" class=" text-5xl text-pink" />
			<ion-text class="text-xl text-main_dark font-bold">
				Notes
			</ion-text>
			<ion-text class="text-base text-main_dark max-w-[80vw] text-center">
				Read beautiful and concise notes that cover every important aspects in topics under different subjects.
			</ion-text>
		</div>

		<router-link class="mx-auto w-full flex" to="/dashboard">
			<ion-button class="btn-outline text-white w-full mx-auto max-w-[280px] mb-10">
				Skip
			</ion-button>
		</router-link>
	</div>
</template>

<script lang="ts">
import { reader } from 'ionicons/icons'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'SlideThree',
	setup () {
		return {
			reader
		}
	}
})
</script>
