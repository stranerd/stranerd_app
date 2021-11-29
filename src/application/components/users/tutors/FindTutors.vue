<template>
	<div class="grid grid-col-12 px-3 text-xs md:text-sm mt-6 col-span-12 md:flex md:flex-row md:justify-center">

		<div class="col-span-12 flex flex-col md:w-4/5  md:border md:border-faded_gray md:rounded-lg md:py-6 md:px-6">
			<h3 class="text-center font-bold text-main_dark mb-2s">
				Get requests from tutors to help with your homework and studies.
			</h3>

			<div class="mt-3 border border-faded_gray rounded-lg py-5 px-3">
				<ion-textarea class="bg-white border-0 focus:outline-none  w-full"
					placeholder="Explain exactly what you need help with."
					rows="9"></ion-textarea>
			</div>

			<div
				class="mt-3  rounded-lg py-5 px-3 text-icon_inactive relative bg-light_gray flex flex-col justify-center items-center">
				<ion-icon :icon="image" class="text-[32px]"></ion-icon>
				<input
					id="images" accept="image/x-png,image/jpeg,image/jpg"
					class="cursor-pointer w-full h-full absolute"
					name="images"
					style="opacity:0; overflow:hidden; position:absolute;"
					type="file" />
				<p class="mt-3">
					Add images or documents <b>(Optional)</b>
				</p>
			</div>

			<div class="mt-3 py-1  rounded-lg flex flex-row gap-6">
				<ion-select class="w-1/2  font-medium" interface="action-sheet" placeholder="Select the subject"
					value="notifications">
					<ion-select-option value="maths">Mathematics</ion-select-option>
					<ion-select-option value="physics">Physics</ion-select-option>
					<ion-select-option value="bio">Biology</ion-select-option>
					<ion-select-option value="geo">Geography</ion-select-option>
					<ion-select-option value="business">Business</ion-select-option>
					<ion-select-option value="civil">Civil Right</ion-select-option>
				</ion-select>
				<ion-select class="w-1/2  font-medium" interface="action-sheet" placeholder="Select the Level"
					value="notifications">
					<ion-select-option value="100">100</ion-select-option>
					<ion-select-option value="200">200</ion-select-option>
					<ion-select-option value="300">300</ion-select-option>
					<ion-select-option value="400">400</ion-select-option>
					<ion-select-option value="500">500</ion-select-option>
				</ion-select>
			</div>

			<div class="flex items-center">
				<span class="font-bold normalText  text-icon_inactive">Start: </span>

				<ion-radio-group v-model="radioValue" class="flex text-light_gray font-bold" value="now">
					<ion-item>
						<ion-label class=" font-bold">Now</ion-label>
						<ion-radio slot="start" value="now"></ion-radio>
					</ion-item>
					<ion-item>
						<ion-label class="font-bold">Later</ion-label>
						<ion-radio slot="start" value="later"></ion-radio>
					</ion-item>
				</ion-radio-group>
			</div>

			<div v-if="radioValue === 'later'" class="w-full">
				<div class="mt-3 py-1  rounded-lg flex flex-row gap-6">
					<ion-input class="w-1/2  font-normal" placeholder="Date" type="date" value="">
					</ion-input>
					<ion-input class="w-1/2  font-normal" placeholder="Time" type="time" value="">
					</ion-input>

				</div>
				<div class="mt-3 py-1 flex flex-row gap-6">
					<ion-input class="w-1/2  font-normal lg:min-w-[222.8px]" placeholder="Duration" type="text"
						value="">
					</ion-input>
					<ion-select class="w-1/2  font-normal" interface="action-sheet" placeholder="Set a budget"
						value="notifications">
						<ion-select-option value="maths">20 Bronze Coins</ion-select-option>
						<ion-select-option value="physics">40 Bronze Coins</ion-select-option>
						<ion-select-option value="bio">10 Gold Coins</ion-select-option>
					</ion-select>
				</div>
			</div>

			<div v-if="radioValue === 'now'" class="w-full">

				<div class="mt-3 py-1 flex flex-row gap-6">
					<ion-input class="w-1/2  font-normal lg:min-w-[222.8px]" placeholder="Duration" type="text"
						value="">
					</ion-input>
					<ion-select class="w-1/2  font-normal" interface="action-sheet" placeholder="Set a budget"
						value="notifications">
						<ion-select-option value="maths">20 Bronze Coins</ion-select-option>
						<ion-select-option value="physics">40 Bronze Coins</ion-select-option>
						<ion-select-option value="bio">10 Gold Coins</ion-select-option>
					</ion-select>
				</div>
			</div>


			<div class="flex flex-row mt-7  text-white gap-6">
				<button class="w-1/2 px-5 py-3 relative ion-activatable rounded-lg  font-bold bg-dark_gray ">
					Cancel
					<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
				</button>

				<button class="w-1/2 px-5 relative ion-activatable font-bold py-3 rounded-lg bg-primary">
					Post question
					<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
				</button>
			</div>


		</div>

	</div>


</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
	IonIcon,
	IonInput,
	IonItem,
	IonLabel,
	IonRadio,
	IonRadioGroup,
	IonRippleEffect,
	IonSelect,
	IonSelectOption,
	IonTextarea
} from '@ionic/vue'
import { image } from 'ionicons/icons'

export default defineComponent({
	setup () {
		const radioValue = ref('later')
		return {
			image, radioValue
		}
	},
	components: {
		IonTextarea,
		IonIcon,
		IonSelect,
		IonSelectOption,
		IonInput,
		IonRippleEffect,
		IonRadioGroup,
		IonRadio,
		IonLabel,
		IonItem
	}
})
</script>
<style scoped>
	.customShadow {
		box-shadow: 0 2px 6px rgb(0 0 0 / 0.2);
	}

	ion-radio {
		--color-checked: #546DD3;
		margin-right: .5rem;
	}

	ion-select {
		--placeholder-color: #8B9EB1;
		--placeholder-opacity: 1;
		background-color: #F7F7FC;
		--padding-end: 1rem;
		--padding-top: 1.2rem;
		--padding-bottom: 1.2rem;
		border-radius: 12px;

	}

	ion-input {
		--placeholder-color: #8B9EB1;
		--placeholder-opacity: 1;
		--placeholder-color: #8B9EB1;
		--placeholder-opacity: 1;
		background-color: #F7F7FC;
		--padding-start: 1rem;
		--padding-end: 1rem;
		--padding-top: 1.2rem;
		--padding-bottom: 1.2rem;
		border-radius: 12px;
	}

	ion-label {
		--color: #8B9EB1 !important;
		color: #8B9EB1 !important;
	}

	ion-icon {
		font-size: 22px;
	}

	ion-input {
		--placeholder-color: #8B9EB1;
	}
</style>
