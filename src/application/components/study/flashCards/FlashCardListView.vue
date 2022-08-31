<template>
	<div id="screen">
		<div v-for="(card, index) in flashCard.set" :key="index" class="flex border-top-line border-bottom-line">
			<DisplayHtml :html="card.question" class="w-1/2 p-4 border-right-line" />

			<DisplayHtml :html="card.answer" class="w-1/2 p-4 border-left-line" />
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
