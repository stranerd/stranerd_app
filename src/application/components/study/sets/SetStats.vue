<template>
	<div class="grid grid-cols-2 lg:grid-cols-4 items-center justify-between gap-3 lg:gap-8">

		<div class="bg-purple w-full lg:h-24 h-[5.25rem] rounded-3xl grid place-items-center">
			<div class="flex">
				<img alt="" class="w-6 mr-4" src="@app/assets/images/New/flashCard.png" />
				<ion-text class="text-white text-2xl">
					{{ set.saved.flashCards.length }}
				</ion-text>
			</div>
		</div>

		<div class="bg-pink w-full lg:h-24 h-[5.25rem] rounded-3xl grid place-items-center">
			<div class="flex items-center gap-4">
				<ion-icon :icon="reader" class="text-white text-2xl" />
				<ion-text class="text-white text-2xl">
					{{ set.saved.notes.length }}
				</ion-text>
			</div>
		</div>

		<div class="bg-green w-full lg:h-24 h-[5.25rem] rounded-3xl grid place-items-center">
			<div class="flex">
				<img alt="" class="w-6 mr-4" src="@app/assets/images/New/testPrep.svg" />
				<ion-text class="text-white text-2xl">
					{{ set.saved.testPreps.length }}
				</ion-text>
			</div>
		</div>


		<div class="bg-orange w-full lg:h-24 h-[5.25rem] rounded-3xl grid place-items-center">
			<div class="flex items-center gap-4">
				<ion-icon :icon="folder" class="text-white text-2xl" />
				<ion-text class="text-white text-2xl">
					{{ sets.length }}
				</ion-text>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { folder, reader, videocam } from 'ionicons/icons'
import { defineComponent } from 'vue'
import { SetEntity } from '@modules/study'
import { useMySets } from '@app/composable/study/sets'

export default defineComponent({
	name: 'SetStats',
	props: {
		set: {
			type: SetEntity,
			required: true
		}
	},
	setup () {
		const { normalSets: sets } = useMySets()
		return { reader, videocam, folder, sets }
	}

})
</script>

<style scoped>
	ion-popover::part(content) {
		width: auto !important;
	}
</style>
