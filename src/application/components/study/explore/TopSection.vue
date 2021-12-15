<template>
	<div class="bg-primary w-full min-h-[264px] flex flex-col justify-between items-center pt-12">
		<ion-text class="heading lg:text-2xl font-bold text-white text-center mt-5">
			Explore thousands of study materials
		</ion-text>
		<ion-searchbar class="max-w-[1054px] lg:w-7/12 !h-16"
			placeholder="Search by subjects, topics and related keywords" show-cancel-button="never" />
		<div
			class="flex justify-center md:text-sm lg:text-base text-faded_gray font-bold  whitespace-normal overflow-x-auto">
			<router-link class="pb-2 mr-3 cursor-pointer" exact-active-class="border-b-4 text-white border-white"
				to="/study/explore/all">
				All
			</router-link>
			<router-link class="pb-2 mr-3 cursor-pointer" exact-active-class="border-b-4 text-white border-white"
				to="/study/explore/preps">
				TestPreps
			</router-link>
			<router-link class="pb-2 mr-3 cursor-pointer" exact-active-class="border-b-4 text-white border-white"
				to="/study/explore/flashCards">
				FlashCards
			</router-link>
			<router-link class="pb-2 mr-3 cursor-pointer" exact-active-class="border-b-4 text-white border-white"
				to="/study/explore/notes">
				Notes
			</router-link>
			<router-link class="pb-2 mr-3 cursor-pointer" exact-active-class="border-b-4 text-white border-white"
				to="/study/explore/videos">
				Videos
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { IonSearchbar } from '@ionic/vue'
import { defineComponent } from 'vue'
import { chevronDown, pencil } from 'ionicons/icons'
import { useStudyPopover } from '@app/composable/core/modals'

export default defineComponent({
	name: 'StudyExploreTopSection',
	components: { IonSearchbar },
	setup () {
		const openCreateStudy = useStudyPopover().openCreateStudy
		return { chevronDown, pencil, openCreateStudy }
	}
})

</script>

<style lang="scss" scoped>
	ion-searchbar {
		--box-shadow: 'none';
		--border-radius: 0.75rem;
		--padding-top: 12rem !important;
	}
</style>
