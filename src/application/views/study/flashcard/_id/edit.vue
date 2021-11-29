<template>
	<Justified>
		<!-- TODO: Break into sections -->
		<div class="bg-primary w-full  h-auto flex flex-col justify-between items-center pt-12 pb-1">
			<ion-text class="heading lg:text-2xl font-bold text-white text-center mt-5 mb-6">
				Edit a Flashcard set
			</ion-text>
			<div class="input-holder bg-white  lg:w-7/12 w-10/12 rounded-md flex items-center px-4 mb-4">
				<ion-text class="text-primary font-bold w-12">
					TITLE
				</ion-text>
				<ion-input class="max-w-[1054px]  !h-14 " placeholder="Enter a title with the format; “[subject] - [sub-topics covered] or [exam/test studying for]”"
					show-cancel-button="never"></ion-input>
			</div>
			<div class="input-holder bg-white  lg:w-7/12 w-10/12 rounded-md flex items-center px-4 mb-4">
				<ion-text class="text-primary font-bold w-12" >
					TAGS
				</ion-text>
				<div v-if="factory.tags.length > 0" class="py-2 flex flex-row flex-wrap gap-x-2">
					<span v-for="tag in factory.tags" :key="tag">
						<span
							class="py-1 px-2 font-bold text-white bg-faded_gray rounded-xl flex flex-row items-center">
							{{ tag }}  <ion-icon :icon="close" class="ml-1 cursor-pointer" @click="removeTag(tag)" />
						</span>
					</span>
				</div>
				<ion-input class="max-w-[1054px]  !h-14 " placeholder="Subjects, topics, school and related keywords (Comma-seperated for multiple tags)"
					show-cancel-button="never" v-model="tag"></ion-input>

			
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
			<div class="mb-8 w-full mx-auto" v-if="factory.errors">
				<ion-text class="text-xl text-delete_red font-bold text-center mb-8 grid place-items-center mx-auto">
					{{factory.errors}}
				</ion-text>
			</div>
	
			<ion-reorder-group disabled="true">

				<ion-reorder v-for="(card, index) in factory.questions" :key="index" class="flex flex-col bg-light_gray p-4 rounded-xl mb-4">
					<div class="flex w-full items-center justify-between">
						<ion-text class="text-main_dark font-bold">Card {{ index + 1 }}</ion-text>
						<div class="flex">
							<ion-icon
								:icon='trash'
								class="text-main_dark"
							/>
						</div>
					</div>

					<div class="flex w-full md:flex-row flex-col gap-4 h-80 md:h-auto" @click="editCard(index)">
						<ion-textarea class="ion-bg-white ion-rounded-xl rounded-xl h-40 md:w-1/2 md:mr-4 w-full"
							placeholder="Front ( Questions or Words) " v-model="card.question"/>
						<ion-textarea class="ion-bg-white ion-rounded-xl rounded-xl h-40 md:w-1/2 w-full"
							placeholder="Back ( Answers or Definitions or Translations )" v-model="card.answer"/>
					</div>

				</ion-reorder>

			</ion-reorder-group>

			<div
				class="w-full flex bg-light_gray items-center p-8 rounded-xl text-lg text-icon_inactive justify-center font-bold my-4 cursor-pointer"
				@click="factory.addQuestion"
			>
				<ion-icon
					:icon="add"
					class="text-2xl"
				/>
				<ion-text>
					ADD CARD
				</ion-text>
			</div>

			<div class="w-full flex justify-end mb-8">
				<ion-button class="btn-primary btn-lg !pr-0 " @click="editFlashCard()">
					Create
				</ion-button>
			</div>
		</div>


	</Justified>

	<PageLoading v-if="loading"/>
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
import { add, trash , close} from 'ionicons/icons'
import {  useTags } from '@app/composable/core/forms'
import { useFlashCard, useEditFlashCard } from '@root/application/composable/study/flashCards'
import { useRoute } from 'vue-router'

export default {
	name: 'Edit Flashcard',
	displayName: 'Create Flashcard',
	components: {
		Justified, IonItem, IonLabel,
		IonListHeader, IonRadio, IonRadioGroup,
		IonTextarea, IonReorderGroup, IonReorder
	},
	setup () {
		const { id } = useRoute().params
		console.log(id)
		const {editFlashCard, factory, error,loading} = useEditFlashCard(id as string)
		const {flashCard, listener,error:flashCardError, loading:flashCardLoading} = useFlashCard(id as string)

		console.log(flashCard)

		const { tag, removeTag } = useTags(
			(tag: string) => factory.value.addTag(tag),
			(tag: string) => factory.value.removeTag(tag)
		)
		const editCard = (value: number)=>{
			factory.value.index = value

		}
		return {
			flashCardLoading,loading,error, 
			tag,removeTag, close,
			editCard,
			editFlashCard, factory,
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
