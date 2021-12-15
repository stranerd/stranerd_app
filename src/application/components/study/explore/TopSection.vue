<template>
	<div class="bg-primary w-full min-h-[264px] flex flex-col justify-between items-center pt-12">
		<ion-text class="heading lg:text-2xl font-bold text-white text-center mt-5">
			Explore thousands of study materials
		</ion-text>
		<ion-searchbar class="max-w-[1054px] lg:w-7/12 !h-16 "
			placeholder="Search by subjects, topics and related keywords"
			show-cancel-button="never" />
		<div
			class="mb-0.5  lg:justify-between justify-center md:text-sm lg:text-base lg:items-center flex flex-row lg:w-7/12 w-full  lg:px-3 text-xs mx-auto gap-5 text-faded_gray font-bold  whitespace-normal overflow-x-auto">

			<div class="hidden flex-col gap-4 mb-3 lg:flex">
				<div class="flex items-center cursor-pointer" @click="openCreateStudy">
					<ion-text class="text-white mr-1">
						Create
					</ion-text>
					<ion-icon :icon='chevronDown' class="text-white mr-3 text-xl" />
				</div>
			</div>
			<div class="mb-3">
				<router-link :to="`/study/preps/explore`" class="pb-2 mr-3 cursor-pointer"
					exact-active-class="border-b-4 text-white border-white">
					TestPreps
				</router-link>
				<router-link :to="`/study/flashCards/explore`" class="pb-2 mr-3 cursor-pointer"
					exact-active-class="border-b-4 text-white border-white">
					FlashCards
				</router-link>
				<router-link :to="`/study/notes/explore`"
					class="pb-2 mr-3 cursor-pointer"
					exact-active-class="border-b-4 text-white border-white">
					Notes
				</router-link>
				<router-link :to="`/study/videos/explore`"
					class="pb-2 mr-3 cursor-pointer"
					exact-active-class="border-b-4 text-white border-white">
					Videos
				</router-link>
				<router-link :to="`/study/sets/explore`"
					class="pb-2 mr-3 cursor-pointer"
					exact-active-class="border-b-4 text-white border-white">
					Study Sets
				</router-link>
			</div>
			<div />
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
	props: {
		name: {
			type: String,
			required: true
		}
	},
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
