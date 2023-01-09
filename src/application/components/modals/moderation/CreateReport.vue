<template>
	<Modal :close="close">
		<template v-slot:title>
			Report {{ factory.title }}
		</template>
		<template v-slot:subtext>
			What is wrong with this {{ factory.title.toLowerCase() }}
		</template>

		<form class="flex flex-col gap-4" @submit.prevent="createReport">
			<div class="flex flex-col gap-4">
				<span v-for="(message, idx) in messages" :key="message" class="flex gap-2 items-center font-semibold">
					<input :id="`report-${idx}`" v-model="factory.message" :value="message" name="message" type="radio">
					<label :for="`report-${idx}`" class="font-light">{{ message }}</label>
				</span>
			</div>

			<IonButton :disabled="loading || !factory.valid" class="btn-primary font-bold" type="submit">
				<SpinLoading v-if="loading" class="mr-4" />
				<span>Report</span>
			</IonButton>
		</form>
	</Modal>
</template>

<script lang="ts" setup>
import { ReportType } from '@modules/moderation'
import { useCreateReport } from '@app/composable/moderation/reports'
import { computed, PropType } from 'vue'

defineProps({
	close: {
		type: Function as PropType<() => void>,
		required: true
	}
})

const QuestionMessages = [
	'It is incorrect or improper',
	'It is suspicious or spam',
	'It displays insensitive information',
	'It is abusive or offensive',
	'It contains advertisement links',
	'It display personal information',
	'It is being used for malpractice'
]

const AnswerMessages = [
	...QuestionMessages,
	'It is a duplicate'
]

const PastQuestionMessages = [
	...QuestionMessages
]

const UserMessages = [
	'They display insensitive information on their profile'
]

const FlashcardMessages = [
	...QuestionMessages
]

const { factory, loading, error, message, createReport } = useCreateReport()
const messages = computed(() => {
	if (factory.value.type === ReportType.questions) return QuestionMessages
	if (factory.value.type === ReportType.answers) return AnswerMessages
	if (factory.value.type === ReportType.users) return UserMessages
	if (factory.value.type === ReportType.pastQuestions) return PastQuestionMessages
	if (factory.value.type === ReportType.flashCards) return FlashcardMessages
	return []
})
</script>
