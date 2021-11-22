<template>
	<DashboardWithToolbarLayout>
		<div class="px-3 w-full mt-8">
			<div
				class="col-span-12 pb-3 px-1 flex-row items-center text-main_dark font-bold hidden lg:flex cursor-pointer"
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
	</DashboardWithToolbarLayout>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { IonIcon } from '@ionic/vue'
import { arrowBackOutline } from 'ionicons/icons'
import { useRoute } from 'vue-router'
import { useQuestion } from '@app/composable/questions/questions'
import DashboardWithToolbarLayout from '@app/layouts/DashboardWithToolbar.vue'
import QuestionPageCard from '@app/components/questions/QuestionPageCard.vue'
import AnswersList from '@app/components/questions/answers/AnswersList.vue'

export default defineComponent({
	name: 'QuestionIdPage',
	displayName: 'Answers',
	components: {
		DashboardWithToolbarLayout,
		IonIcon,
		QuestionPageCard,
		AnswersList
	},
	setup () {
		const { questionId } = useRoute().params
		const { error, loading, question, listener } = useQuestion(questionId as string)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)

		return { arrowBackOutline, error, loading, question }
	}
})
</script>
