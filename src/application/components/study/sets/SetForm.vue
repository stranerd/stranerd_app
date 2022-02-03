<template>
	<form class="flex flex-col gap-4 text-center justify-center items-center" @submit.prevent="submit">
		<div class="bg-light_gray w-full rounded-md flex items-center px-4">
			<ion-text class="text-primary font-bold w-12">
				TITLE
			</ion-text>
			<ion-input v-model="factory.name"
				class="max-w-[1054px] !h-14 text-left"
				placeholder="Enter a title with the format; “[subject] - [sub-topics covered] or [exam/test studying for]”"
				show-cancel-button="never"
			></ion-input>
		</div>
		<div class="bg-light_gray w-full rounded-md flex items-center px-4 hidden">
			<ion-text class="text-primary font-bold w-12 text-center">
				TAGS
			</ion-text>
			<div v-if="factory.tags.length > 0" class="py-2 flex flex-row flex-wrap gap-x-2">
				<span v-for="tag in factory.tags" :key="tag">
					<span
						class="py-1 px-2 font-bold text-white bg-faded_gray rounded-xl flex flex-row items-center">
						{{ tag }} <ion-icon :icon="close" class="ml-1 cursor-pointer text-white"
							@click="removeTag(tag)" />
					</span>
				</span>
			</div>
			<ion-input v-model="tag"
				class="max-w-[1054px] !h-14 text-left"
				placeholder="Subjects, topics, school and related keywords (Comma-seperated for multiple tags)"
				show-cancel-button="never"></ion-input>
		</div>
		<div class="flex items-center w-full max-w-[25rem] justify-center">
			<ion-radio-group v-model="factory.isPublic" class="flex w-full" mode="md">
				<ion-list-header>
					<ion-label class="text-icon_inactive font-bold text-base">
						Set privacy:
					</ion-label>
				</ion-list-header>

				<ion-item class="w-full ion-item-transparent">
					<ion-radio :value="true" class="ion-white"></ion-radio>
					<ion-label class="text-icon_inactive font-bold text-base ml-3 ion-white">Public</ion-label>
				</ion-item>

				<ion-item class="w-full ion-item-transparent">
					<ion-radio :value="false" class="ion-white"></ion-radio>
					<ion-label class="text-icon_inactive font-bold text-base ml-3 ion-white">Private</ion-label>
				</ion-item>
			</ion-radio-group>
		</div>

		<div class="flex gap-4 w-full">
			<ion-button class="btn-secondary flex-grow w-full" @click="closeModal">
				Cancel
				<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
			</ion-button>
			<ion-button :disabled="loading || !factory.valid" class="btn-primary w-full flex-grow" type="submit">
				<slot name="buttonText">Save Set</slot>
				<ion-ripple-effect class="rounded-lg" />
			</ion-button>
		</div>
		<PageLoading v-if="loading" />
	</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { close } from 'ionicons/icons'
import { useTags } from '@app/composable/core/forms'
import { SetFactory } from '@modules/study'
import { IonItem, IonLabel, IonListHeader, IonRadio, IonRadioGroup, IonRippleEffect } from '@ionic/vue'
import { useStudyModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'SetForm',
	components: { IonRippleEffect, IonListHeader, IonRadio, IonItem, IonRadioGroup, IonLabel },
	props: {
		factory: {
			type: SetFactory,
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
		}
	},
	setup (props) {
		const closeModal = () => {
			useStudyModal().closeAll()
		}
		const { tag, removeTag } = useTags(
			(tag: string) => props.factory.addTag(tag),
			(tag: string) => props.factory.removeTag(tag)
		)

		return {
			close, tag, removeTag, closeModal
		}
	}
})
</script>

<style lang="scss" scoped>
	ion-radio {
		--color: #8B9EB1 !important;
		--color-checked: #546DD3 !important;
	}

	ion-label {
		--color: #8B9EB1 !important;
	}

	ion-label {
		@media (max-width: 640px) {
			font-size: 12px !important;
		}
	}
</style>

