<template>
	<div class="w-full flex flex-col text-xs mg:text-sm">
		<h2 class="text-sm md:text-base text-dark_gray font-bold">
			Give your answer
		</h2>

		<div class="mt-3 py-3 px-4 flex flex-row items-center bg-light_gray rounded-lg">
			<span class="text-dark_gray font-bold">Main answer - </span>
			<ion-input value="" class="w-full px-2 ml-1 font-medium" placeholder="Keep it short!">
			</ion-input>
		</div>
		
		<div class="mt-3 border border-faded_gray rounded-lg py-5 flex-col px-3">
			<span class="text-dark_gray font-bold">Explanation - </span>
			<ion-textarea rows="9" 
				class="bg-white border-0 focus:outline-none  w-full"  
				placeholder="Write out the detailed explanation of the answer you gave above. (Optional)"></ion-textarea>
		</div>

		<div class="mt-3  rounded-lg py-5 px-3 text-icon_inactive relative bg-light_gray flex flex-col justify-center items-center">
			<ion-icon :icon="image" class="text-[32px]"></ion-icon>
			<input
				type="file" id="images"
				name="images"
				class="cursor-pointer w-full h-full absolute"
				style="opacity:0; overflow:hidden; position:absolute;"
				accept="image/x-png,image/jpeg,image/jpg"/>
			<p class="mt-3">
				Add images to help with your question <b>(Optional)</b>
			</p>
		</div>

		<div class="flex flex-row px-3 my-7 md:gap-5 text-white">
			<div class="w-1/2 flex flex-row justify-center items-center">
				<button class=" md:w-full px-6 py-3 relative ion-activatable rounded-lg  font-bold bg-dark_gray ">
					Cancel
					<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
				</button>
			</div>
			<div class="w-1/2 flex flex-row justify-center items-center">
				<button class="md:w-full px-6 relative ion-activatable font-bold py-3 rounded-lg bg-primary">
					Post answer
					<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
				</button>
			</div>
		</div>

	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import { IonIcon, IonInput, IonTextarea, IonRippleEffect } from '@ionic/vue'

import { image } from 'ionicons/icons'

export default defineComponent({
	setup() {
		return {
			image
		}
	},
	components: {
		IonIcon,
		IonInput,
		IonTextarea,
		IonRippleEffect
	}
})
</script>
<style scoped>

ion-select {
 
  /* Set a different placeholder color */
  --placeholder-color: #8B9EB1;

  /* Set full opacity on the placeholder */
  --placeholder-opacity: 1;
}

ion-input {
 
  /* Set a different placeholder color */
  --placeholder-color: #8B9EB1;

  /* Set full opacity on the placeholder */
  --placeholder-opacity: 1;
}

ion-icon {
  font-size: 24px;
}

ion-input {
	--placeholder-color: #8B9EB1;
}
</style>