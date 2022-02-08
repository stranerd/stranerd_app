<template>
	<div
		class="flex flex-col lg:flex-row items-end justify-between gap-4 bg-white rounded-xl font-bold lg:text-base text-xs text-main_dark p-4">
		<div class="w-full flex flex-col gap-4">
			<div>
				<IonText class="text-main_dark mb-2 w-full">
					Question:
					<DisplayHtml :html="pastQuestion.question" />
				</IonText>
				<PhotoList :photos="pastQuestion.questionMedia" />
			</div>
			<template v-if="pastQuestion.isObjective">
				<div class="flex flex-col gap-4">
					<div v-for="(option, index) in pastQuestion.data.options" :key="index"
						class="flex gap-4 justify-between">
						<IonText class="text-main_dark w-full">
							Option {{ getAlphabet(index + 1).toUpperCase() }}:
							<DisplayHtml :html="option" />
						</IonText>
						<IonIcon :icon="pastQuestion.data.correctIndex === index ? checkmarkDone : null"
							class="text-xl text-green" />
					</div>
				</div>
				<div>
					<IonText class="text-main_dark mb-2 w-full">
						Explanation:
						<DisplayHtml :html="pastQuestion.data.explanation" />
					</IonText>
					<PhotoList :photos="pastQuestion.data.explanationMedia" />
				</div>
			</template>
			<template v-else>
				<div>
					<IonText class="text-main_dark mb-2 w-full">
						Answer:
						<DisplayHtml :html="pastQuestion.data.answer" />
					</IonText>
					<PhotoList :photos="pastQuestion.data.answerMedia" />
				</div>
			</template>
		</div>
		<div class="w-full font-bold text-right cursor-pointer">
			<a class="text-orange mr-4" @click.prevent="openPastQuestionEditModal(pastQuestion)">Edit</a>
			<a class="text-red" @click.prevent="deletePastQuestion">Delete</a>
		</div>
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PastQuestionEntity } from '@modules/study'
import { openPastQuestionEditModal, useDeletePastQuestion } from '@app/composable/study/pastQuestions'
import { getAlphabet } from '@utils/commons'
import { checkmarkDone } from 'ionicons/icons'

export default defineComponent({
	name: 'AdminPastQuestionListCard',
	props: {
		pastQuestion: {
			type: PastQuestionEntity,
			required: true
		}
	},
	setup (props) {
		const { loading, error, deletePastQuestion } = useDeletePastQuestion(props.pastQuestion)
		return { loading, error, deletePastQuestion, openPastQuestionEditModal, getAlphabet, checkmarkDone }
	}
})
</script>
