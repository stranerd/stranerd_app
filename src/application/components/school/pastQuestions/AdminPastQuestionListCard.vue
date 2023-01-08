<template>
	<div
		class="flex flex-col lg:flex-row items-end justify-between gap-4 font-bold text-sm p-4">
		<div class="w-full flex flex-col gap-4">
			<div>
				<IonText class="text-secondaryText mb-2 w-full">
					Question:
					<DisplayHtml :html="pastQuestion.question" />
				</IonText>
				<Gallery :media="pastQuestion.questionMedia" :path="pastQuestion.saveFilePath" />
			</div>
			<template v-if="pastQuestion.isObj(pastQuestion)">
				<div class="flex flex-col gap-4">
					<div v-for="(option, index) in pastQuestion.data.options" :key="index"
						class="flex gap-4 justify-between">
						<IonText class="text-secondaryText w-full">
							Option {{ getAlphabet(index).toUpperCase() }}:
							<DisplayHtml :html="option" />
						</IonText>
						<IonIcon :icon="pastQuestion.data.correctIndex === index ? checkmarkDoneOutline : null"
							class="text-success" />
					</div>
				</div>
				<div>
					<IonText class="text-secondaryText mb-2 w-full">
						Explanation:
						<DisplayHtml :html="pastQuestion.data.explanation" />
					</IonText>
					<Gallery :media="pastQuestion.data.explanationMedia" :path="pastQuestion.saveFilePath" />
				</div>
			</template>
			<template v-else-if="pastQuestion.isNotObj(pastQuestion)">
				<div>
					<IonText class="text-secondaryText mb-2 w-full">
						Answer:
						<DisplayHtml :html="pastQuestion.data.answer" />
					</IonText>
					<Gallery :media="pastQuestion.data.answerMedia" :path="pastQuestion.saveFilePath" />
				</div>
			</template>
		</div>
		<div class="w-full font-bold text-right cursor-pointer">
			<a class="text-warning mr-4" @click.prevent="openPastQuestionEditModal(pastQuestion)">Edit</a>
			<a class="text-danger" @click.prevent="deletePastQuestion">Delete</a>
		</div>
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts" setup>
import { PastQuestionEntity } from '@modules/school'
import { openPastQuestionEditModal, useDeletePastQuestion } from '@app/composable/school/pastQuestions'
import { getAlphabet } from '@stranerd/validate'
import { checkmarkDoneOutline } from 'ionicons/icons'

const props = defineProps({
	pastQuestion: {
		type: PastQuestionEntity,
		required: true
	}
})

const { loading, error, deletePastQuestion } = useDeletePastQuestion(props.pastQuestion)
</script>
