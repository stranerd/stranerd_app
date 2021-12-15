<template>
	<div class="bg-primary w-full  flex flex-col items-center pt-12">
		<div class="flex flex-col w-full justify-center items-center px-4">
			<ion-text class="heading lg:text-2xl font-bold text-white text-center  mb-3">
				Explore thousands of study materials
			</ion-text>
			<ion-searchbar class="max-w-[1054px] lg:w-7/12 !h-16 " mode="md"
				placeholder="Search by subjects, topics and related keywords"
				show-cancel-button="never" />
		</div>


		<div
			class="mb-0.5 mt-12   justify-center md:text-sm lg:text-base lg:items-center flex flex-row lg:w-7/12 w-full  lg:px-3 text-xs mx-auto text-faded_gray font-bold  whitespace-normal overflow-x-auto">
			<!-- 
			<div class="hidden flex-col gap-4 mb-3 lg:flex">

				<div class="flex items-center cursor-pointer" @click="setOpen(true, $event)">
					<ion-text class="text-white mr-1">
						Create
					</ion-text>
					<ion-icon :icon='isOpenRef ? chevronDown : chevronUp' class="text-white mr-3 text-xl" />
				</div>

				<ion-popover
					:event="event"
					:is-open="isOpenRef"
					:translucent="true"
					@didDismiss="setOpen(false)"
				>
					<div class="flex flex-col  p-6 !w-52">
						<router-link class="flex items-center justify-start w-auto mb-4 cursor-pointer"
							to="/study/flashCards/create">
							<ion-icon :icon="flash" alt="" class=" text-2xl text-main_dark" />
							<ion-text class="font-bold ml-4 text-lg text-main_dark">
								Flashcard
							</ion-text>
						</router-link>
						<router-link class="flex items-center justify-start w-auto cursor-pointer"
							to="/study/sets/create">
							<ion-icon :icon="folder" alt="" class=" text-2xl text-main_dark" />
							<ion-text class="font-bold ml-4 text-lg text-main_dark">
								Study set
							</ion-text>
						</router-link>
					</div>

				</ion-popover>
			</div> -->
			<div class=" flex gap-12 ">
				<!-- <router-link to="/#" class="pb-1 mr-3 cursor-pointer"
					exact-active-class="border-b-4 rounded-full text-white border-white">
					All
				</router-link> -->
				<router-link :to="`/study/preps/explore`" class="pb-1 mr-3 cursor-pointer"
					exact-active-class="border-b-4 text-white border-white">
					TestPreps
				</router-link>
				<router-link :to="`/study/notes/explore`"
					class="pb-1 mr-3 cursor-pointer"
					exact-active-class="border-b-4 text-white border-white">
					Notes
				</router-link>
				<router-link :to="`/study/flashCards/explore`" class="pb-1 mr-3 cursor-pointer"
					exact-active-class="border-b-4 text-white border-white">
					FlashCards
				</router-link>
		
				<!-- <router-link :to="`/study/videos/explore`"
					class="pb-2 mr-3 cursor-pointer"
					exact-active-class="border-b-4 text-white border-white">
					Videos
				</router-link>
				<router-link :to="`/study/sets/explore`"
					class="pb-2 mr-3 cursor-pointer"
					exact-active-class="border-b-4 text-white border-white">
					Study Sets
				</router-link> -->
			</div>

			<div />
		</div>
	</div>
</template>

<script lang="ts">
import {  IonSearchbar } from '@ionic/vue'
import { defineComponent, ref } from 'vue'
import { chevronDown, chevronUp, flash, folder, pencil } from 'ionicons/icons'

export default defineComponent({
	name: 'StudyExploreTopSection',
	components: { IonSearchbar },
	props: {
		name: {
			type: String,
			required: true
		}
	},
	setup () {
		const isOpenRef = ref(false)
		const event = ref()
		const setOpen = (state: boolean, ev?: Event) => {
			event.value = ev
			isOpenRef.value = state
		}
		return { isOpenRef, setOpen, event, chevronDown, chevronUp, flash, folder, pencil }
	}
})

</script>

<style lang="scss" scoped>
	ion-searchbar {
		--box-shadow: 'none';
		--border-radius: 0.75rem;
		--padding-top: 12rem !important;
	}

	ion-popover::part(content) {
		width: auto !important;
	}

</style>
