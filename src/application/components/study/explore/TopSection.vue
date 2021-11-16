<template>
	<div class="bg-primary w-full min-h-[264px] flex flex-col justify-between items-center pt-12">
		<ion-text class="heading lg:text-2xl font-bold text-white text-center mt-5">
			Explore thousands of study materials
		</ion-text>
		<ion-searchbar show-cancel-button="never" class="max-w-[1054px] lg:w-7/12 !h-16 " placeholder="Search by subjects, topics and related keywords"></ion-searchbar>

		<div
			class="col-span-12 mb-0.5 sm:place-content-center md:col-start-2 md:col-end-12 lg:col-start-3 lg:col-end-11 lg:justify-center lg:items-center flex flex-row  px-3 headings gap-5 text-faded_gray font-bold  whitespace-normal overflow-x-auto">
			<router-link :to="`/study/explore`" class="pb-2 pr-3 cursor-pointer"
				exact-active-class="border-b-4 text-white border-white">
				Test Prep
			</router-link>
			<router-link :to="`/study/explore/flashcard`" class="pb-2 pr-3 cursor-pointer"
				exact-active-class="border-b-4 text-white border-white">
				Flashcards
			</router-link>
			<router-link :to="`/study/explore/Notes`"
				class="pb-2 pr-3 cursor-pointer"
				exact-active-class="border-b-4 text-white border-white">
				Notes
			</router-link>
			<router-link :to="`/study/explore/videos`"
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
	</div>
</template>

<script lang="ts">
import { IonSearchbar } from '@ionic/vue'
export default {
	name:'StudyExploreTopSection',
	components: {  IonSearchbar },
}
</script>

<style lang="scss" scoped>
ion-searchbar{
    --box-shadow:'none';
    --border-radius:0.5rem;
}
.searchbar-input.sc-ion-searchbar-md{
	padding-top: 12px;
    padding-bottom: 12px;
}
</style>