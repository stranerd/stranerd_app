<template>
	<div>
		<div class="bg-primary w-full flex flex-col justify-between items-center">
			<ion-text class="heading lg:text-2xl font-bold text-white text-center mt-16">
				Explore thousands of study materials
			</ion-text>
			<ion-searchbar class="max-w-[1054px] lg:w-7/12 !h-16"
				placeholder="Search by subjects, topics and related keywords"
				show-cancel-button="never" />
			<div
				class="flex justify-center md:text-sm lg:text-base text-faded_gray font-bold  whitespace-normal overflow-x-auto mt-8 md:mt-16 gap-1">
				<router-link :to="`/study/sets/${set.id}/`"
					class="py-2 mr-3 cursor-pointer"
					exact-active-class="border-b-4 text-white border-white">
					All
				</router-link>
				<router-link :to="`/study/sets/${set.id}/preps`"
					class="py-2 mr-3 cursor-pointer"
					exact-active-class="border-b-4 text-white border-white">
					TestPreps
				</router-link>
				<router-link :to="`/study/sets/${set.id}/flashCards`"
					class="py-2 mr-3 cursor-pointer"
					exact-active-class="border-b-4 text-white border-white">
					FlashCards
				</router-link>
				<router-link :to="`/study/sets/${set.id}/notes`"
					class="py-2 mr-3 cursor-pointer"
					exact-active-class="border-b-4 text-white border-white">
					Notes
				</router-link>
				<router-link :to="`/study/sets/${set.id}/videos`"
					class="py-2 mr-3 cursor-pointer"
					exact-active-class="border-b-4 text-white border-white">
					Videos
				</router-link>
			</div>
		</div>
		<div class="p-4 md:w-8/12 w-full mx-auto">
			<slot :flashCards="flashCards" :notes="notes" :set="set" :testPreps="testPreps" :videos="videos" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { SetEntity } from '@modules/study'
import { useSet } from '@app/composable/study/sets'

export default defineComponent({
	name: 'SetWrapper',
	props: {
		set: {
			type: SetEntity,
			required: true
		}
	},
	setup (props) {
		const { notes, flashCards, testPreps, videos, listener } = useSet(props.set)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { notes, flashCards, testPreps, videos }
	}
})
</script>

<style scoped>
	ion-select {
		--background: #F7F7FC;
		background: #F7F7FC;
		--padding-start: 1rem;
		--padding-end: 1rem;
	}

	ion-segment {
		--background: #F7F7FC;
		color: #8B9EB1;
		font-weight: bold;
	}

	ion-segment-button {
		--background-checked: #4D5C6F;
		--background-focused: #4D5C6F;
		--indicator-color: #4D5C6F;
		--indicator-box-shadow: none;
		--padding-top: 0.5rem;
		--padding-bottom: 0.5rem;
		color: #8B9EB1;
		font-weight: bold;
	}
</style>
