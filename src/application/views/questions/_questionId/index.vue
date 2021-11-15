<template>
	<IonPage>
		<IonContent>
			<div class="px-3">
				<div
					class="col-span-12 pb-3 px-1 flex-row items-center text-dark_gray font-bold hidden lg:flex cursor-pointer"
					@click="$router.go(-1)">
					<IonIcon :icon="arrowBackOutline" class="text-[25px] mr-2" />
					<span>Back</span>
				</div>
				<div class="md:px-2 mb-4 text-xs md:text-sm">
					<template v-if="question">
						<QuestionPageCard :question="question" />
						<AnswersList :question="question" class="mt-6" />
					</template>
					<p v-else>Question Not Found</p>
				</div>
			</div>
		</IonContent>
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent, IonIcon, IonPage } from '@ionic/vue'
import { arrowBackOutline } from 'ionicons/icons'
import { useRoute } from 'vue-router'
import { useQuestion } from '@app/composable/questions/questions'
import QuestionPageCard from '@app/components/questions/QuestionPageCard.vue'
import AnswersList from '@app/components/questions/answers/AnswersList.vue'

export default defineComponent({
	name: 'QuestionIdPage',
	displayName: 'Answers',
	layout: 'question',
	components: {
		IonPage,
		IonContent,
		IonIcon,
		QuestionPageCard,
		AnswersList
	},
	setup () {
		const { questionId } = useRoute().params
		const { error, loading, question } = useQuestion(questionId as string)

		return { arrowBackOutline, error, loading, question }
	}
})
</script>
