<template>
	<div class="showcase-flex">
		<div class="flex gap-4 justify-between items-center text-lg">
			<IonIcon :icon="closeOutline" @click="close" />
			<span class="font-bold">
				{{ flashCard.set.length }} {{ pluralize(flashCard.set.length, 'term', 'terms') }}
			</span>
			<span />
		</div>
		<div v-for="(set, idx) in flashCard.set" :key="idx" class="flex flex-col card-sm card-padding">
			<span class="font-bold text-lg">{{ set.question }}</span>
			<span>{{ set.answer }}</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { FlashCardEntity } from '@modules/study'
import { closeOutline } from 'ionicons/icons'
import { pluralize } from '@utils/commons'
import { PropType } from 'vue'

const props = defineProps({
	flashCard: {
		type: FlashCardEntity,
		required: true
	},
	close: {
		type: Function as PropType<() => void>,
		required: true
	}
})
</script>
