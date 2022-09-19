<template>
	<div id="screen" class="flex flex-col gap-4">
		<div
			v-for="(card, index) in flashCard.set.concat(...flashCard.set, ...flashCard.set, ...flashCard.set, ...flashCard.set)"
			:key="index" class="flex card-sm">
			<DisplayHtml :html="card.question" class="w-2/5 px-4 py-3 border-right-line" />

			<DisplayHtml :html="card.answer" class="w-3/5 px-4 py-3" />
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
