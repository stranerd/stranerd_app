<template>
	<DashboardWithToolbarLayout>
		<div class="w-full lg:mt-8 md:p-4 lg:p-0">
			<div
				class="col-span-12 !gap-2 card-padding flex-row items-center text-secondaryText  hidden lg:flex cursor-pointer"
				@click="$router.go(-1)">
				<IonIcon :icon="chevronBackCircleOutline" class="text-[25px] mr-2" />
				<span>Back to all questions</span>
			</div>
			<div class="flex flex-col gap-2 md:gap-6">
				<template v-if="question">
					<QuestionPageCard :question="question" class="border-bottom-line" />
					<AnswersList :question="question" />
				</template>
				<p v-else>Question Not Found</p>
			</div>
		</div>
	</DashboardWithToolbarLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { chevronBackCircleOutline } from 'ionicons/icons'
import { useRoute } from 'vue-router'
import { useQuestion } from '@app/composable/questions/questions'
import DashboardWithToolbarLayout from '@app/layouts/DashboardWithToolbar.vue'
import QuestionPageCard from '@app/components/questions/questions/QuestionPageCard.vue'
import AnswersList from '@app/components/questions/answers/AnswersList.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'QuestionsQuestionId',
	components: {
		DashboardWithToolbarLayout,
		QuestionPageCard,
		AnswersList
	},
	setup () {
		useRouteMeta('Answers')
		const { questionId } = useRoute().params
		const { error, loading, question } = useQuestion(questionId as string)
		return { chevronBackCircleOutline, error, loading, question }
	}
})
</script>
