<template>
	<Modal>
		<template v-slot:title>
			Create Study Set
		</template>
		<div
			class="rounded-xl bg-white md:py-6 md:px-6 py-4 px-3 md:text-sm text-xs flex flex-col lg:col-start-5 lg:col-end-9 md:col-start-3 md:col-end-11 col-span-12">

			<div class="flex flex-col gap-1 text-center justify-center items-center">
				<div class="bg-light_gray w-full rounded-md flex items-center px-4 mb-4">
					<ion-text class="text-primary font-bold w-12">
						TITLE
					</ion-text>
					<ion-input v-model="factory.name"
						class="max-w-[1054px]  !h-14 text-left"
						placeholder="Enter a title with the format; “[subject] - [sub-topics covered] or [exam/test studying for]”"
						show-cancel-button="never"
					></ion-input>
				</div>
				<div class="bg-light_gray w-full rounded-md flex items-center px-4 mb-4">
					<ion-text class="text-primary font-bold w-12 text-center">
						TAGS
					</ion-text>
					<div v-if="factory.tags.length > 0" class="py-2 flex flex-row flex-wrap gap-x-2">
						<span v-for="tag in factory.tags" :key="tag">
							<span
								class="py-1 px-2 font-bold text-white bg-faded_gray rounded-xl flex flex-row items-center">
								{{ tag }}  <ion-icon :icon="close" class="ml-1 cursor-pointer text-white"
									@click="removeTag(tag)" />
							</span>
						</span>
					</div>
					<ion-input v-model="tag"
						class="max-w-[1054px]  !h-14 text-left"
						placeholder="Subjects, topics, school and related keywords (Comma-seperated for multiple tags)"
						show-cancel-button="never"></ion-input>
				</div>
				<div class="flex items-center w-full max-w-[25rem] justify-center">
					<ion-radio-group v-model="factory.isPublic" class="flex w-full">
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
			</div>

			<div class="flex flex-row  mt-5  text-white gap-4">
				<div class="w-1/2 flex flex-row justify-center items-center">
					<ion-button class=" btn-secondary w-full"
						@click="closeCreateSet">
						No
						<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
					</ion-button>
				</div>
				<div class="w-1/2 flex flex-row justify-center items-center">
					<ion-button class=" btn-primary w-full" @click="createSet">
						Yes
						<ion-ripple-effect class="rounded-lg" />
					</ion-button>
				</div>
			</div>
		</div>
		<PageLoading v-if="loading" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonItem, IonListHeader, IonRadio, IonRadioGroup, IonRippleEffect } from '@ionic/vue'
import { chevronDown, close, ellipse, ellipseOutline } from 'ionicons/icons'
import { useStudyModal } from '@app/composable/core/modals'
import { useCreateSet } from '@app/composable/study/sets'
import { useTags } from '@app/composable/core/forms'

export default defineComponent({
	components: { IonRippleEffect, IonListHeader, IonRadio, IonItem, IonRadioGroup },
	setup () {
		const closeCreateSet = () => {
			useStudyModal().closeCreateSet()
		}

		const { createSet, factory, error, loading } = useCreateSet()

		const { tag, removeTag } = useTags(
			(tag: string) => factory.value.addTag(tag),
			(tag: string) => factory.value.removeTag(tag)
		)

		return {
			error, loading, tag, removeTag,
			createSet, factory, closeCreateSet,
			chevronDown, ellipse, ellipseOutline, close
		}
	}
})
</script>

<style scoped>
	.ion-item-transparent {
		--background: transparent;
	}

	ion-input {
		--placeholder-color: #8B9EB1;
		--placeholder-opacity: 1;
	}

	ion-radio {
		--color: #8B9EB1 !important;
		--color-checked: #546DD3 !important;
	}

	ion-label {
		--color: #8B9EB1 !important;
	}
</style>
