<template>
	<div class="grid grid-col-6 px-3 ">
		<div class="col-span-6 pt-2 pb-1 mt-1 text-center leading-none flex flex-col justify-center items-center">
			<span class="text-gray-600 text-xs " >Need answers to a Question?</span>
			<span class="text-gray-600 text-xs ">Ask it now and get answers immediately from other students</span>
		</div>
	</div>

	<div class="grid grid-col-6 px-3 mt-1 ">
		<div class="col-span-6 py-3 px-3 mt-1 bg-white customShadow rounded">
			<ion-textarea rows="6" 
				class="bg-white border-0 text-xs focus:outline-none  w-full"  
				placeholder="Write your question here and make sure it is explained in full detail."></ion-textarea>
		</div>
	</div>

	<div class="grid grid-col-6 px-3 mt-4 ">
		<div class="py-1 px-2 text-sm bg-tags rounded-xl flex flex-row">
			<ion-select value="notifications" class="w-full text-xs font-medium" placeholder="Select the subject" interface="action-sheet">
				<ion-select-option value="maths" class="text-sm">Mathematics</ion-select-option>
				<ion-select-option value="physics" class="text-sm">Physics</ion-select-option>
				<ion-select-option value="bio" class="text-sm">Biology</ion-select-option>
				<ion-select-option value="geo" class="text-sm" >Geography</ion-select-option>
				<ion-select-option value="business" class="text-sm">Business</ion-select-option>
				<ion-select-option value="civil" class="text-sm">Civil Right</ion-select-option>
			</ion-select>
		</div>
		
	</div>

	<div class="grid grid-col-6 px-3 mt-2 ">
		<div class="py-1 px-2 text-sm bg-tags rounded-xl flex flex-row">
			<ion-select value="notifications" class="w-full text-xs font-medium" placeholder="Set a reward for Best Answers" interface="action-sheet">
				<ion-select-option value="maths" class="text-sm">20 Bronze Coins</ion-select-option>
				<ion-select-option value="physics" class="text-sm">40 Bronze Coins</ion-select-option>
				<ion-select-option value="bio" class="text-sm">10 Gold Coins</ion-select-option>
			</ion-select>
		</div>
	</div>

	<div class="grid grid-col-6 px-3 mt-2 ">
		<div class="py-3 px-3 text-xs bg-tags rounded-xl relative flex flex-col justify-center items-center">
			<h3 class="text-xs text-[#4D5C6F] mb-2">Upload Images (<i>optional</i>)</h3>
			<ion-icon :icon="imagesOutline"></ion-icon>
			<input
				type="file" id="images"
				name="images"
				class="cursor-pointer w-full h-full absolute"
				style="opacity:0; overflow:hidden; position:absolute;"
				accept="image/x-png,image/jpeg,image/jpg"/>
		</div>
	</div>

	<div class="grid grid-col-6 px-3 mt-2 ">
		<div class="py-1 pl-6 pr-3 text-xs bg-tags rounded-xl flex flex-row">
			<ion-input value="" class="w-full text-xs font-medium" placeholder="Add related tags">
			</ion-input>
		</div>
	</div>

	<div class="flex flex-row px-3 mt-5 ">
		<div class="w-1/2 flex flex-row justify-center items-center">
			<button class="text-sm px-4 py-2 relative ion-activatable rounded-lg bg-gray-100 text-gray-500">
				Discard
				<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
			</button>
		</div>
		<div class="w-1/2 flex flex-row justify-center items-center">
			<button class="text-sm px-4 relative ion-activatable py-2 rounded-lg bg-primary text-white">
				Post
				<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
			</button>
		</div>
	</div>

</template>
<script lang="ts">
import { defineComponent } from 'vue'

import { IonSelect, IonSelectOption, IonTextarea, IonInput, IonRippleEffect, IonIcon } from '@ionic/vue'
import { imagesOutline} from 'ionicons/icons'

export default defineComponent({
	setup() {
		return {
			imagesOutline
		}
	},
	components: {IonSelect, IonSelectOption, IonTextarea, IonInput, IonRippleEffect, IonIcon }
})
</script>
<style scoped>
.customShadow {
	 box-shadow: 0 2px 6px rgb(0 0 0 / 0.2);
}

ion-select {
 
  /* Set a different placeholder color */
  --placeholder-color: #4D5C6F;

  /* Set full opacity on the placeholder */
  --placeholder-opacity: 1;
}

ion-input {
 
  /* Set a different placeholder color */
  --placeholder-color: #4D5C6F;

  /* Set full opacity on the placeholder */
  --placeholder-opacity: 1;
}

ion-icon {
  font-size: 22px;
}
</style>