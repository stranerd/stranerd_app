<template>
	<div>
		<div
			class="bg-primary w-full h-auto flex flex-col justify-between items-center md:pt-12 pt-4 pb-1 md:rounded-none rounded-b-xl">
			<ion-text class="heading lg:text-2xl font-bold text-white text-center mt-5 mb-6 hidden md:block">
				{{ title }}
			</ion-text>
			<ion-input v-model="factory.title"
				class="max-w-[1054px] !h-14 lg:w-7/12 w-10/12 rounded-md flex items-center px-4 mb-4"
				mode="md"
				placeholder="Name your playlist"
				show-cancel-button="never"
			></ion-input>
			<DisplayError :error="factory.errors.title" />
		
			<div class="flex items-center w-full md:max-w-[25rem] max-w-[22rem] justify-center">
				<ion-radio-group v-model="factory.isPublic" class="flex w-full justify-center" mode="md">
					<ion-list-header>
						<ion-label class="text-white font-bold text-xs md:text-base !m-0">
							Set privacy:
						</ion-label>
					</ion-list-header>

					<ion-item class="w-full ion-item-transparent">
						<ion-radio :value="true" class=" ion-white" mode="md"></ion-radio>
						<ion-label class="text-white font-bold text-xs md:text-base ml-3 ion-white">Public</ion-label>
					</ion-item>

					<ion-item class="w-full ion-item-transparent">
						<ion-radio :value="false" class=" ion-white" mode="md"></ion-radio>
						<ion-label class="text-white font-bold text-xs md:text-base ml-3 ion-white">Private</ion-label>
					</ion-item>
				</ion-radio-group>
			</div>
			<DisplayError :error="factory.errors.isPublic" />
		</div>


		<div class="lg:w-8/12 w-full px-4 mx-auto mt-8">
			<div class="mx-auto w-full flex justify-center mb-3">
				<ion-text class="heading font-bold text-main_dark text-center ">
					Add Videos
				</ion-text>
			</div>
	
			<div class="bg-white w-full rounded-md flex items-center px-4 mb-4">
				<ion-text class="text-primary font-bold w-12">
					1
				</ion-text>
				<div class="border h-14 border-new_gray"/>
				<ion-input v-model="factory.title"
					class="max-w-[1054px] !h-14 "
					mode="md"
					placeholder="Enter title"
					show-cancel-button="never"
				></ion-input>
				<div class="border h-14 border-new_gray"/>
				<ion-input v-model="factory.title"
					class="max-w-[1054px] !h-14  "
					mode="md"
					placeholder="Enter Youtube link to video"
					show-cancel-button="never"
				></ion-input>
			</div>

			<div
				class="w-full flex bg-white items-center px-8 py-5 rounded-xl text-lg text-gray justify-center font-bold my-4 cursor-pointer"
				@click="factory.addQuestion"
			>
				<ion-icon
					:icon="add"
					class="text-2xl"
				/>
				<ion-text>
					ADD 
				</ion-text>
			</div>

			<div class="w-full flex justify-end mb-8">
				<ion-button  class="btn-secondary btn-lg !pr-0 w-full mr-3 ">
					Draft
				</ion-button>
				<ion-button :disabled="loading || !factory.valid" class="btn-primary btn-lg !pr-0 w-full" @click="submit()">
					<slot name="buttonTitle">Submit</slot>
				</ion-button>
			</div>
		</div>

		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
	IonItem,
	IonLabel,
	IonListHeader,
	IonRadio,
	IonRadioGroup,

} from '@ionic/vue'
import { add, close, trash } from 'ionicons/icons'
import { useTags } from '@app/composable/core/forms'
import { FlashCardFactory } from '@modules/study'

export default defineComponent({
	name: 'VideoForm',
	props: {
		factory: {
			type: FlashCardFactory,
			required: true
		},
		submit: {
			type: Function,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		},
		error: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: true
		}
	},
	components: {
		IonItem, IonLabel,
		IonListHeader, IonRadio, IonRadioGroup,
	},
	setup (props) {
		const { tag, removeTag } = useTags(
			(tag: string) => props.factory.addTag(tag),
			(tag: string) => props.factory.removeTag(tag)
		)
		const editCard = (value: number) => props.factory.index = value
		return {
			tag, removeTag, close,
			editCard, trash, add
		}
	}
})
</script>

<style lang="scss" scoped>
	.ion-item-transparent {
		--background: transparent;
      
	}

    ion-input{
        --background: white !important;
          --padding-top:1.2rem !important;
        --padding-bottom:1.2rem !important;
        --border-radius: 1rem !important
    }

	ion-label {
		@media (max-width: 640px) {
			font-size: 12px !important;
		}
	}
</style>
