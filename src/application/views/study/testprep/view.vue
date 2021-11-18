<template>
	<Justified>
		<!-- TODO: Break into sections -->
		<div class="bg-primary w-full min-h-[150px] flex flex-col justify-center items-center pt-0 pb-1">
			<ion-text class="heading lg:text-2xl font-bold text-white text-center my-2">
				JAMB
			</ion-text>
			<div class="flex items-center ">

				<ion-text class="text-faded_gray font-semibold text-center">
					Gateway exams for tertiary level instituitions in Nigeria.
				</ion-text>

			</div>
		</div>

		<div class="flex items-center justify-center flex-col lg:w-8/12 w-full px-4 mx-auto mt-8 mb-16 bg-white ">
			<div
				class="flex items-center text-center justify-center  custom-shadow  text-3xl md:p-16 w-full lg:w-auto  mx-auto">
				<div class="flex w-full px-4 gap-6 flex-col items-center">
					<ion-segment class="lg:w-96" mode="ios" value="testYourself">
						<ion-segment-button value="testYourself">
							<ion-label>Test yourself</ion-label>
						</ion-segment-button>
						<ion-segment-button value="solutions">
							<ion-label>Study solutions</ion-label>
						</ion-segment-button>
					</ion-segment>

					<ion-select
						class=" lg:w-96 w-full text-xs md:text-sm  placeholder-[#8B9EB1] font-bold rounded-md !text-left"
						interface="action-sheet"
						placeholder="Select the Subject" value="notifications">
						<ion-select-option value="maths">Select the Subject</ion-select-option>
						<ion-select-option value="physics">English</ion-select-option>
						<ion-select-option value="bio">Math</ion-select-option>
					</ion-select>

					<ion-select
						class=" lg:w-96 w-full text-xs md:text-sm  placeholder-[#8B9EB1] font-bold rounded-md !text-left"
						interface="action-sheet"
						placeholder="Select the Year" value="notifications">
						<ion-select-option value="maths">Select the Year</ion-select-option>
						<ion-select-option value="physics">2021</ion-select-option>
						<ion-select-option value="bio">2020</ion-select-option>
					</ion-select>
				</div>
			</div>


		</div>


	</Justified>
</template>

<script lang="ts">
import Justified from '@app/layouts/Justified.vue'
import { IonSegment, IonSegmentButton, IonSelect, IonSelectOption } from '@ionic/vue'

export default {
	name: 'view testprep',
	displayName: 'Flashcard Set',
	components: {
		Justified,
		IonSegment, IonSegmentButton, IonSelect, IonSelectOption

	},
	setup () {
		return {}
	}
}
</script>


<style lang="scss" scoped>
	.segment-button-checked {
		color: white !important
	}

	ion-select {
		--background: #F7F7FC;
		background: #F7F7FC;
		--padding-start: 1rem;
		--padding-end: 1rem;
		--padding-top: 0.8rem;
		--padding-bottom: 0.8rem;
	}

	ion-segment {
		--background: #F7F7FC;
		color: #8B9EB1;
		font-weight: bold;
	}

	ion-segment-button {
		--background-checked: #8B9EB1;
		--background-focused: #8B9EB1;
		--indicator-color: #8B9EB1;
		--indicator-box-shadow: none;
		--padding-top: 0.8rem;
		--padding-bottom: 0.8rem;
		color: #8B9EB1;
		font-weight: bold;
	}

	.custom-shadow {
		box-shadow: 0px 0px 50px rgba(77, 92, 111, 0.1);
		border-radius: 24px;
		@media (max-width: 770px) {
			box-shadow: none;
			border-radius: 0;
		}
	}

	.ion-iten-transparent {
		--background: transparent;
	}

	ion-searchbar {
		--box-shadow: 'none';
		--border-radius: 0.5rem;
	}

	.searchbar-input.sc-ion-searchbar-md {
		padding-top: 12px;
		padding-bottom: 12px;
	}
</style>
