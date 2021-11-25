<template>
	<Justified>
		<!-- TODO: Break into sections -->
		<div class="bg-primary w-full  h-auto flex flex-col justify-between items-center pt-12 pb-1">
			<ion-text class="heading lg:text-2xl font-bold text-white text-center mt-5 mb-6">
				Create a Flashcard set
			</ion-text>
			<div class="input-holder bg-white  lg:w-7/12 w-10/12 rounded-md flex items-center px-4 mb-4">
				<ion-text class="text-primary font-bold w-12">
					TITLE
				</ion-text>
				<ion-input class="max-w-[1054px]  !h-14 " placeholder="Enter a title with the format; “[subject] - [sub-topics covered] or [exam/test studying for]”"
					show-cancel-button="never"></ion-input>
			</div>
			<div class="input-holder bg-white  lg:w-7/12 w-10/12 rounded-md flex items-center px-4 mb-4">
				<ion-text class="text-primary font-bold w-12">
					TAGS
				</ion-text>
				<ion-input class="max-w-[1054px]  !h-14 " placeholder="Subjects, topics, school and related keywords (Comma-seperated for multiple tags)"
					show-cancel-button="never"></ion-input>
			</div>
			<div class="input-holder bg-white  lg:w-7/12 w-10/12 rounded-md flex items-center px-4 mb-4">
				<ion-text class="text-primary font-bold w-12">
					PRICE
				</ion-text>
				<ion-input class="max-w-[1054px]  !h-14 " placeholder="Make it free or attach a price to it."
					show-cancel-button="never"></ion-input>
			</div>

			<div class="flex items-center w-full max-w-[25rem] justify-center">
				<ion-radio-group class="flex w-full">
					<ion-list-header>
						<ion-label class="text-white font-bold text-base ">
							Set privacy:
						</ion-label>
					</ion-list-header>

					<ion-item class="w-full ion-iten-transparent">
						<ion-radio class=" ion-white" value="public"></ion-radio>
						<ion-label class="text-white font-bold text-base ml-3 ion-white">Public</ion-label>
					</ion-item>

					<ion-item class="w-full ion-iten-transparent">
						<ion-radio class=" ion-white" value="private"></ion-radio>
						<ion-label class="text-white font-bold text-base ml-3 ion-white">Private</ion-label>
					</ion-item>
				</ion-radio-group>
			</div>


		</div>

		<div class="lg:w-8/12 w-full px-4 mx-auto mt-8">
			<ion-reorder-group disabled="true">

				<ion-reorder v-for="n in 5" :key="n" class="flex flex-col bg-light_gray p-4 rounded-xl mb-4">
					<div class="flex w-full items-center justify-between">
						<ion-text class="text-main_dark font-bold">Card {{ n }}</ion-text>
						<div class="flex">
							<ion-icon
								:icon='trash'
								class="text-main_dark"
							/>
						</div>
					</div>

					<div class="flex w-full md:flex-row flex-col gap-4 h-80 md:h-auto">
						<ion-textarea class="ion-bg-white ion-rounded-xl rounded-xl h-40 md:w-1/2 md:mr-4 w-full"
							placeholder="Front ( Questions or Words) " />
						<ion-textarea class="ion-bg-white ion-rounded-xl rounded-xl h-40 md:w-1/2 w-full"
							placeholder="Back ( Answers or Definitions or Translations )" />
					</div>

				</ion-reorder>

			</ion-reorder-group>

			<div
				class="w-full flex bg-light_gray items-center p-8 rounded-xl text-lg text-icon_inactive justify-center font-bold my-4 cursor-pointer">
				<ion-icon
					:icon="add"
					class="text-2xl"
				/>
				<ion-text>
					ADD CARD
				</ion-text>
			</div>

			<div class="w-full flex justify-end mb-8">
				<ion-button class="btn-primary btn-lg !pr-0 ">
					Create
				</ion-button>
			</div>
		</div>


	</Justified>
</template>

<script lang="ts">
import {
	IonItem,
	IonLabel,
	IonListHeader,
	IonRadio,
	IonRadioGroup,
	IonReorder,
	IonReorderGroup,
	IonTextarea
} from '@ionic/vue'
import Justified from '@app/layouts/Justified.vue'
import { add, trash } from 'ionicons/icons'

export default {
	name: 'Create Flashcard',
	displayName: 'Create Flashcard',
	components: {
		Justified,
		IonItem,
		IonLabel,
		IonListHeader,
		IonRadio,
		IonRadioGroup,
		IonTextarea,
		IonReorderGroup,
		IonReorder
	},
	setup () {
		return {
			trash, add
		}
	}
}
</script>

<style lang="scss" scoped>
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
