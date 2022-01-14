<template>
	<div id="screen" class="lg:w-8/12 w-full px-4 mx-auto mt-8 mb-16">
		<ion-text class="text-main text-main_dark font-bold heading">
			All cards info <span class="text-gray">({{ flashCard.set.length }})</span>
		</ion-text>

		<div v-for="(card, index) in flashCard.set" :key="index"
			class="flex justify-between  w-full md:mt-6 mt-3 text-body">
			<div class="bg-white py-3 px-6 rounded-xl w-1/2 md:mr-6 mr-3">
				<DisplayHtml :html="card.question" />
			</div>
			<div class="bg-white py-3 px-6 rounded-xl w-1/2">
				<DisplayHtml :html="card.answer" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { FlashCardEntity } from '@modules/study'

export default defineComponent({
	name: 'FlashCardScreen',
	props: {
		flashCard: {
			type: FlashCardEntity,
			required: true
		}
	}
})
</script>
