<template>
	<div
		class="rounded-xl bg-white md:py-6 md:px-6 py-4 px-3 md:text-sm text-xs flex flex-col lg:col-start-5 lg:col-end-9 md:col-start-3 md:col-end-11 col-span-12">

		<div class="flex flex-col gap-1 text-center justify-center items-center ">
			<h3 class="text-xl font-semibold text-dark_gray">Create a schedule opening for students</h3>
			<span
				class="text-icon_inactive px-10 mt-1 md:px-12">Let students know when you’re available to tutor them.</span>
		</div>

		<div class="mt-5 py-1 px-2 bg-light_gray rounded-lg items-center flex flex-row justify-between">
			<ion-input class="w-full font-medium ml-3" placeholder="Pick a date" value="">
			</ion-input>
			<ion-icon :icon="chevronDown" class="text-[20px] ml-2 text-icon_inactive"></ion-icon>
		</div>

		<div class="mt-3 py-2 px-2 flex md:flex-row flex-col md:items-center">
			<span class="mr-2 font-semibold text-dark_gray">Availability:</span>
			<div class="flex flex-row items-center gap-3 mt-2 md:mt-0">
				<div class="flex flex-row items-center ">
					<ion-icon :icon="ellipse" class="text-lg mr-1 text-primary"></ion-icon>
					<span class="font-bold text-icon_inactive">All day </span>
				</div>
				<div class="flex flex-row items-center ">
					<ion-icon :icon="ellipseOutline" class="text-lg mr-1 text-primary"></ion-icon>
					<span class="font-bold text-icon_inactive">Time range </span>
				</div>
			</div>
		</div>


		<div class="flex flex-row  mt-5  text-white gap-4">
			<div class="w-1/2 flex flex-row justify-center items-center">
				<button class=" px-6 py-3 relative ion-activatable rounded-lg w-full font-bold bg-dark_gray "
					@click="showModal = false">
					Cancel
					<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
				</button>
			</div>
			<div class="w-1/2 flex flex-row justify-center items-center">
				<button class=" px-6 relative ion-activatable font-bold w-full py-3 rounded-lg bg-primary">
					Create
					<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
				</button>
			</div>
		</div>

	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import { IonIcon, IonInput, IonRippleEffect, } from '@ionic/vue'
import { chevronDown, ellipse, ellipseOutline } from 'ionicons/icons'
import { showModal } from '@app/composable/core/Modal'

export default defineComponent({
	setup () {

		return {
			chevronDown,
			showModal,
			ellipse,
			ellipseOutline
		}
	},
	components: {
		IonIcon, IonInput, IonRippleEffect
	}
})
</script>
<style scoped>
	ion-input {

		/* Set a different placeholder color */
		--placeholder-color: #8B9EB1;

		/* Set full opacity on the placeholder */
		--placeholder-opacity: 1;
	}

</style>
