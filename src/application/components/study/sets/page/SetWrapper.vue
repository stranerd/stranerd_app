<template>
	<div>
		<div class="!mb-0 blueTop flex-col py-5 md:py-12">
			<div class="flex gap-2 md:gap-4 w-full lg:w-8/12 mx-auto px-4 text-white items-center">
				<IonIcon :icon="folderOpenSharp" class="text-6xl md:text-8xl" />
				<div class="flex flex-col">
					<ion-text class="heading lg:text-2xl font-semibold capitalize">{{ set.name }}</ion-text>
					<ion-text class="text-sm">{{ set.allSaved.length }}
						{{ pluralize(set.allSaved.length, 'item', 'items') }}
					</ion-text>
				</div>
			</div>
			<div v-if="false"
				class="mb-0.5 mt-8 md:mt-12 justify-center md:text-sm lg:text-base lg:items-center flex flex-row lg:w-7/12 w-full lg:px-3 text-xs mx-auto text-faded_gray font-bold whitespace-normal overflow-x-auto">
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
				<router-link v-if="false" :to="`/study/sets/${set.id}/videos`"
					class="py-2 mr-3 cursor-pointer"
					exact-active-class="border-b-4 text-white border-white">
					Videos
				</router-link>
			</div>
		</div>
		<div class="p-4 lg:w-8/12 w-full mx-auto">
			<slot :flashCards="flashCards" :notes="notes" :set="set" :sets="sets" :testPreps="testPreps"
				:videos="videos" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SetEntity } from '@modules/study'
import { useSet } from '@app/composable/study/sets'
import { pluralize } from '@utils/commons'
import { folderOpenSharp } from 'ionicons/icons'

export default defineComponent({
	name: 'SetWrapper',
	props: {
		set: {
			type: SetEntity,
			required: true
		}
	},
	setup (props) {
		const { notes, flashCards, testPreps, videos, sets } = useSet(props.set)
		return { folderOpenSharp, notes, flashCards, testPreps, videos, pluralize, sets }
	}
})
</script>
