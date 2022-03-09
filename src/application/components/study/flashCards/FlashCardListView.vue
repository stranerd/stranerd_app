<template>
	<div id="screen" class="lg:w-8/12 w-full md:px-4 mx-auto mt-8 mb-16">
		<ion-text class="text-main text-main_dark font-bold heading px-4">
			All cards info <span class="text-gray">({{ formatNumber(flashCard.set.length) }})</span>
		</ion-text>

		<div v-for="(card, index) in flashCard.set" :key="index"
			class="flex justify-between w-full md:mt-4  text-body">
			<div class="bg-white md:py-3 md:px-6 rounded-xl w-full flex">
				<DisplayHtml :html="card.question" class="w-1/2 md:p-0 p-2 border-t md:border-0 border-faded_gray" />

				<div class="h-auto bg-faded_gray w-[1px] md:-my-3 "/>

				<DisplayHtml :html="card.answer" class="w-1/2 md:pl-4 p-2  border-t md:border-0 border-faded_gray "/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { FlashCardEntity } from '@modules/study'
import { formatNumber } from '@utils/commons'

export default defineComponent({
	name: 'FlashCardScreen',
	props: {
		flashCard: {
			type: FlashCardEntity,
			required: true
		}
	},
	setup () {
		return { formatNumber }
	}
})
</script>
