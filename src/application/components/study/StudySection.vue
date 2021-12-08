<template>
	<div class="grid grid-cols-2 lg:grid-cols-4 items-center justify-between gap-3 lg:gap-8">
		
		<div class="bg-purple lg:w-[15.5rem] w-full lg:h-32 h-[5.25rem] rounded-3xl grid place-items-center mr-8">
			<div class="flex">
				<img alt="" class="w-6 mr-4" src="@app/assets/images/icons/flashCard.png">
				<ion-text class="text-white text-2xl">
					44
				</ion-text>
			</div>
		</div>
		
		<div class="bg-pink lg:w-[15.5rem] w-full lg:h-32 h-[5.25rem] rounded-3xl grid place-items-center mr-8">
			<div class="flex">
				<img alt="" class="w-6 mr-4" src="@app/assets/images/icons/flashCard.png">
				<ion-text class="text-white text-2xl">
					44
				</ion-text>
			</div>
		</div>

		<div class="bg-green lg:w-[15.5rem] w-full lg:h-32 h-[5.25rem] rounded-3xl grid place-items-center mr-8">
			<div class="flex">
				<img alt="" class="w-6 mr-4" src="@app/assets/images/icons/flashCard.png">
				<ion-text class="text-white text-2xl">
					44
				</ion-text>
			</div>
		</div>

		<div class="bg-orange lg:w-[15.5rem] w-full lg:h-32 h-[5.25rem] rounded-3xl grid place-items-center ">
			<div class="flex">
				<img alt="" class="w-6 mr-4" src="@app/assets/images/icons/flashCard.png">
				<ion-text class="text-white text-2xl">
					44
				</ion-text>
			</div>
		</div>
		
		
	</div>
</template>

<script lang="ts">
import { useAuth } from '@root/application/composable/auth/auth'
import { chevronDown, chevronUp, folder, flash } from 'ionicons/icons'
import { defineComponent, ref } from 'vue'


export default defineComponent({
	name: 'StudySection',
	setup() {
		const {user} = useAuth()
		const isOpenRef = ref(false)
		const event = ref()
		const setOpen = (state: boolean, ev?: Event) => {
			event.value = ev
			isOpenRef.value = state
		}

		return {
			user, chevronDown, chevronUp, isOpenRef, setOpen, event, folder, flash 


		}
	}


})
</script>

<style scoped>
	ion-popover::part(content) {
		width: auto !important;
	}
</style>