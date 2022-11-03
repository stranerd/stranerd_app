<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<div v-if="showHelp" class="showcase-flex h-full page-padding">
			<div class="card-sm bg-highlight card-padding flex flex-col gap-3">
				<IonText class="font-bold text-lg">Post a new question</IonText>
				<IonText>Get an expert answer within hours.</IonText>
			</div>
			<div class="card-sm flex flex-col card-padding w-full">
				<span class="font-bold text-lg">How it works</span>
				<ul class="text-secondaryText list-disc pl-4">
					<li>Submit ONE QUESTION per post</li>
					<li>GET NOTIFIED when your question is answered</li>
					<li>
						Use the answers to LEARN and check your work.&nbsp;
						<router-link class="text-primaryBg" to="/legal/honor-code">Our Honor Code</router-link>
					</li>
				</ul>
			</div>
			<div class="card-sm flex flex-col card-padding w-full">
				<span class="font-bold text-lg">Steps to take</span>
				<ul class="text-secondaryText list-disc pl-4">
					<li>Enter the subject</li>
					<li>Enter your question</li>
					<li>Add images if necessary</li>
					<li>Post question with the "Ask" button</li>
				</ul>
			</div>
			<div class="mt-auto flex items-center gap-4">
				<IonButton class="btn-outline w-full" @click="dontShowAgain">Don't show again</IonButton>
				<IonButton class="btn-primary w-full" @click="showAskQuestion">Continue</IonButton>
			</div>
		</div>
		<div v-else class="flex flex-col gap-4 page-padding h-full lg:h-auto">
			<span class="card-sm p-4 bg-highlight text-center block">
				You have <span class="font-bold">{{
					wallet?.subscription.data.questions
				}} questions</span> to ask
			</span>
			<QuestionForm
				:error="error"
				:factory="factory"
				:loading="loading"
				:submit="createQuestion"
				class="flex-grow"
			>
				<template v-slot:buttonText>
					Post Question
				</template>
			</QuestionForm>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import QuestionForm from '@app/components/questions/questions/QuestionForm.vue'
import { useCreateQuestion } from '@app/composable/questions/questions'
import { useRouteMeta } from '@app/composable/core/states'
import { useAuth } from '@app/composable/auth/auth'
import { useReactionModal } from '@app/composable/core/modals'
import { storage } from '@utils/storage'

export default defineComponent({
	name: 'QuestionsCreate',
	components: { QuestionForm },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', 'isSubscribed', async ({ goBackToNonAuth }) => {
		const { wallet } = useAuth()
		if (!wallet.value?.subscription.data.questions) {
			useReactionModal().openNoMoreQuestions()
			return goBackToNonAuth()
		}
	}]),
	setup () {
		useRouteMeta('Ask a Question', { back: true })
		const { wallet } = useAuth()
		const { factory, error, loading, createQuestion } = useCreateQuestion()
		const HELP_KEY = 'HIDE_QUESTION_HELP'
		const showHelp = ref(true)
		onMounted(async () => {
			showHelp.value = !(await storage.get(HELP_KEY))
		})
		const showAskQuestion = async () => {
			showHelp.value = false
		}
		const dontShowAgain = async () => {
			await storage.set(HELP_KEY, true)
			await showAskQuestion()
		}
		return {
			factory, error, loading, createQuestion, wallet,
			showHelp, showAskQuestion, dontShowAgain
		}
	}
})
</script>
