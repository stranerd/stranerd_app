<template>
	<div id="screen" class="md:px-4">
		<IonText class="text-secondaryText font-bold text-heading px-4 md:px-0 hidden md:block">
			All cards info <span class="text-gray">({{ formatNumber(flashCard.set.length) }})</span>
		</IonText>

		<div v-for="(card, index) in flashCard.set" :key="index"
			class="flex justify-between w-full md:mt-4">
			<div class="bg-white md:py-3 md:px-6 rounded-xl w-full flex border-top-line">
				<DisplayHtml :html="card.question" class="w-1/2 md:p-0 p-4  border-bottom-line" />

				<div class="h-auto bg-line w-[1px] md:-my-3 " />

				<DisplayHtml :html="card.answer" class="w-1/2 md:pl-4 p-4  border-bottom-line " />
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
