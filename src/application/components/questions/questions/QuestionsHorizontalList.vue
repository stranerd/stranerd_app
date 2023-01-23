<template>
	<div class="flex flex-col gap-4">
		<span class="flex justify-between gap-4">
			<IonText class="font-bold">{{ title }}</IonText>
			<router-link :to="route" class="text-info">view all</router-link>
		</span>
		<div class="showcase-flex !p-0 !flex-row overflow-x-auto hide-scrollbar items-start">
			<div v-if="empty" class="flex flex-col card-sm min-w-full card-padding">
				<slot name="empty">
					<span>{{ empty }}</span>
				</slot>
			</div>
			<QuestionListCard v-for="question in slice" :key="question.hash" :question="question"
				class="min-w-[85%] lg:min-w-[40%]" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import QuestionListCard from '@app/components/questions/questions/QuestionListCard.vue'
import { QuestionEntity } from '@modules/questions'

const props = defineProps({
	title: {
		type: String,
		required: true
	},
	route: {
		type: String,
		required: true
	},
	questions: {
		type: Array as PropType<QuestionEntity[]>,
		required: true
	},
	empty: {
		type: String,
		required: false,
		default: ''
	}
})

const slice = computed(() => props.questions.slice(0, 10))
</script>
