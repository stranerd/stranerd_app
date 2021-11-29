<template>
	<div
		class="rounded-xl bg-white md:py-6 md:px-6 py-4 px-3 md:text-sm text-xs flex flex-col lg:col-start-5 lg:col-end-9 md:col-start-3 md:col-end-11 col-span-12">

		<div class="flex flex-col gap-1 text-center justify-center items-center ">
			<h3 class="text-xl font-semibold text-main_dark">Are you sure you want to submit?</h3>
		
		</div>




		<div class="flex flex-row  mt-5  text-white gap-4">
			<div class="w-1/2 flex flex-row justify-center items-center">
				<button class=" px-6 py-3 relative ion-activatable rounded-lg w-full font-bold bg-dark_gray "
					@click="closeRateFlashcard">
					No
					<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
				</button>
			</div>
			<div class="w-1/2 flex flex-row justify-center items-center">
				<button class=" px-6 relative ion-activatable font-bold w-full py-3 rounded-lg bg-primary">
					Yes
					<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
				</button>
			</div>
		</div>

	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import {  IonRippleEffect } from '@ionic/vue'
import { chevronDown, ellipse, ellipseOutline } from 'ionicons/icons'
import { useStudyModal } from '@app/composable/core/modals'

export default defineComponent({
	setup () {
		const closeRateFlashcard = () => {
			useStudyModal().closeRateFlashcard()
		}
		return {
			closeRateFlashcard,
			chevronDown,
			ellipse,
			ellipseOutline
		}
	},
	components: {
		 IonRippleEffect
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
