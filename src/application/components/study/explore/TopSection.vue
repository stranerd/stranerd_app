<template>
	<div class="bg-primary w-full min-h-[264px] flex flex-col justify-between items-center pt-12">
		<ion-text class="heading lg:text-2xl font-bold text-white text-center mt-5">
			Explore thousands of study materials
		</ion-text>
		<ion-searchbar show-cancel-button="never" class="max-w-[1054px] lg:w-7/12 !h-16 " placeholder="Search by subjects, topics and related keywords"></ion-searchbar>

		<div
			class="mb-0.5  lg:justify-between justify-center md:text-sm lg:text-base lg:items-center flex flex-row lg:w-7/12 w-full  lg:px-3 text-xs mx-auto gap-5 text-faded_gray font-bold  whitespace-normal overflow-x-auto">

			<div class="hidden flex-col gap-4 mb-3 lg:flex">

				<div class="flex items-center" @click="setOpen(true, $event)">
					<ion-text class="text-white mr-1">
						Create
					</ion-text>
					<ion-icon
						:icon=' isOpenRef ? chevronDown : chevronUp'
						class="text-white mr-3 text-xl"
					/>
				</div>
			
				<!-- <ion-icon/> -->
				<ion-popover
					:is-open="isOpenRef"
					css-class="mt-4 rounded-xl"
					:event="event"
					:translucent="true"
					@didDismiss="setOpen(false)"
				>
					<!-- <Popover></Popover> -->
					<div class="flex flex-col  p-6 !w-52">
						<router-link to="/study/flashcard/create" class="flex items-center justify-start w-auto mb-4 cursor-pointer">
							<ion-icon :icon="flash"  alt="" class=" text-2xl text-main_dark"/>
							<ion-text class="font-bold ml-4 text-lg text-main_dark">
								Flashcard
							</ion-text>
						</router-link>
						<router-link to="/study/set/create" class="flex items-center justify-start w-auto cursor-pointer">
							<ion-icon :icon="folder"  alt="" class=" text-2xl text-main_dark"/>
							<ion-text class="font-bold ml-4 text-lg text-main_dark">
								Study set
							</ion-text>
						</router-link>
					</div>

				</ion-popover>
			</div>
			<div class="mb-3">
				<router-link :to="`/study/testprep/explore`" class="pb-2 pr-3 cursor-pointer"
					exact-active-class="border-b-4 text-white border-white">
					Test Prep
				</router-link>
				<router-link :to="`/study/flashcard/explore`" class="pb-2 pr-3 cursor-pointer"
					exact-active-class="border-b-4 text-white border-white">
					Flashcards
				</router-link>
				<router-link :to="`/study/note/explore`"
					class="pb-2 pr-3 cursor-pointer"
					exact-active-class="border-b-4 text-white border-white">
					Notes
				</router-link>
				<router-link :to="`/study/video/explore`"
					class="pb-2 pr-3 cursor-pointer"
					exact-active-class="border-b-4 text-white border-white">
					Videos
				</router-link>
				<router-link :to="`/study/explore/Study-sets`"
					class="pb-2 pr-3 cursor-pointer"
					exact-active-class="border-b-4 text-white border-white">
					Study sets
				</router-link>
			</div>

			<div class="hidden flex-col gap-4 mb-3 lg:flex">

				<div class="flex items-center">
					<ion-text class="text-white mr-1">
						edit
					</ion-text>
					<ion-icon
						:icon='pencil'
						class="text-white mr-3 text-xl"
					/>
				</div>
			
	
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { IonSearchbar, IonPopover  } from '@ionic/vue'
import { defineComponent, ref } from 'vue'
import { chevronDown, chevronUp, flash, folder,pencil } from 'ionicons/icons'

export default defineComponent({
	name:'StudyExploreTopSection',
	components: {  IonSearchbar , IonPopover},

	setup() {
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
ion-searchbar{
    --box-shadow:'none';
    --border-radius:0.75rem;
	--padding-top: 12rem !important;
}

ion-popover::part(content){
	width:auto !important;
}

</style>