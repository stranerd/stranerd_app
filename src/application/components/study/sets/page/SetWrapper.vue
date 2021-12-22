<template>
	<div>
		<div class="bg-primary w-full flex flex-col items-center pt-5 md:pt-12 rounded-b-2xl md:rounded-none mb-4">
			<div class="flex w-full md:w-8/12 mx-auto px-4 text-white items-center">
				<IonIcon :icon="folder" class="text-6xl md:text-8xl" />
				<div class="flex flex-col ml-2 md:ml-4">
					<ion-text class="heading lg:text-2xl font-bold capitalize">{{ set.name }}</ion-text>
					<ion-text>{{ set.allSaved.length }} {{ pluralize(set.allSaved.length, 'item', 'items') }}</ion-text>
				</div>
			</div>
			<div
				class="mb-0.5 mt-8 md:mt-12 justify-center md:text-sm lg:text-base lg:items-center flex flex-row lg:w-7/12 w-full  lg:px-3 text-xs mx-auto text-faded_gray font-bold  whitespace-normal overflow-x-auto">
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
					class="py-2 mr-3 cursor-pointer hidden"
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
import { pluralize } from '@utils/commons'
import { folder } from 'ionicons/icons'

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
		return { folder, notes, flashCards, testPreps, videos, pluralize }
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
