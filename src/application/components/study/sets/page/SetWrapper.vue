<template>
	<div>
		<div class="!mb-0 blueTop flex-col py-5 md:py-12">
			<div class="flex gap-2 md:gap-4 w-full lg:w-8/12 mx-auto px-4 text-white items-center">
				<IonIcon :icon="folderOpenOutline" class="text-6xl md:text-8xl" />
				<div class="flex flex-col">
					<ion-text class="heading lg:text-2xl font-semibold capitalize">{{ set.name }}</ion-text>
					<ion-text class="text-sm">{{ set.allSaved.length }}
						{{ pluralize(set.allSaved.length, 'item', 'items') }}
					</ion-text>
				</div>
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
import { folderOpenOutline } from 'ionicons/icons'

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
		return { folderOpenOutline, notes, flashCards, testPreps, videos, pluralize, sets }
	}
})
</script>
