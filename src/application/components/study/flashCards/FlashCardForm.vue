<template>
	<div>
		<div class="bg-primary w-full  h-auto flex flex-col justify-between items-center md:pt-12 pt-4 pb-1 md:rounded-none rounded-b-xl">
			<ion-text class="heading lg:text-2xl font-bold text-white text-center mt-5 mb-6 hidden md:block">
				{{ title }}
			</ion-text>
			<div class="bg-white  lg:w-7/12 w-10/12 rounded-md flex items-center px-4 mb-4">
				<ion-text class="text-primary font-bold w-12">
					TITLE
				</ion-text>
				<ion-input v-model="factory.title"
					mode="md"
					class="max-w-[1054px]  !h-14 "
					placeholder="Enter a title with the format; “[subject] - [sub-topics covered] or [exam/test studying for]”"
					show-cancel-button="never"
				></ion-input>
			</div>
			<ion-text v-if="factory.errors.title"
				class="text-xl text-delete_red font-bold text-center mb-8 grid place-items-center mx-auto">
				{{ factory.errors.title }}
			</ion-text>
			<div class="bg-white lg:w-7/12 w-10/12 rounded-md flex items-center px-4 mb-4">
				<ion-text class="text-primary font-bold w-12">
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
				<ion-input v-model="tag"
					class="max-w-[1054px]  !h-14 "
					placeholder="Subjects, topics, school and related keywords (Comma-seperated for multiple tags)"
					show-cancel-button="never"></ion-input>
			</div>
			<ion-text v-if="factory.errors.tags"
				class="text-xl text-delete_red font-bold text-center mb-8 grid place-items-center mx-auto">
				{{ factory.errors.tags }}
			</ion-text>


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
			<ion-text v-if="factory.errors.isPublic"
				class="text-xl text-delete_red font-bold text-center mb-8 grid place-items-center mx-auto">
				{{ factory.errors.isPublic }}
			</ion-text>


		</div>

		<div class="lg:w-8/12 w-full px-4 mx-auto mt-8">
			<ion-reorder-group disabled="true">
				<ion-reorder v-for="(card, index) in factory.questions" :key="index"
					class="flex flex-col bg-white p-4 rounded-xl mb-4">
					<div class="flex w-full items-center justify-between">
						<ion-text class="text-main_dark font-bold">Card {{ index + 1 }}</ion-text>
						<div class="flex" @click="factory.removeQuestion(index)">
							<ion-icon
								:icon='trash'
								class="text-main_dark"
							/>
						</div>
					</div>

					<div class="flex w-full md:flex-row flex-col gap-4 h-80 md:h-auto" @click="editCard(index)">
						<ion-textarea v-model="card.question"
							class="ion-bg-white border border-faded_gray ion-rounded-xl rounded-xl h-40 md:w-1/2 md:mr-4 w-full"
							placeholder="Front ( Questions or Words) " />
						<ion-textarea v-model="card.answer"
							class="ion-bg-white border border-faded_gray ion-rounded-xl rounded-xl h-40 md:w-1/2 w-full"
							placeholder="Back ( Answers or Definitions or Translations )" />
					</div>
				</ion-reorder>
			</ion-reorder-group>

			<ion-text v-if="factory.errors.set"
				class="text-xl text-delete_red font-bold text-center mb-8 grid place-items-center mx-auto">
				{{ factory.errors.set }}
			</ion-text>

			<div
				class="w-full flex bg-white items-center p-8 rounded-xl text-lg text-icon_inactive justify-center font-bold my-4 cursor-pointer"
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
				<ion-button class="btn-primary btn-lg !pr-0 " @click="submit()">
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
	IonReorder,
	IonReorderGroup,
	IonTextarea
} from '@ionic/vue'
import { add, close, trash } from 'ionicons/icons'
import { useTags } from '@app/composable/core/forms'
import { FlashCardFactory } from '@modules/study'

export default defineComponent({
	name: 'FlashcardForm',
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
		IonTextarea, IonReorderGroup, IonReorder
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

	ion-searchbar {
		--box-shadow: 'none';
		--border-radius: 0.5rem;
	}
	
	ion-label{
		@media (max-width: 640px){
		font-size: 12px !important;
		}
	}

	.searchbar-input.sc-ion-searchbar-md {
		padding-top: 12px;
		padding-bottom: 12px;
	}
</style>
