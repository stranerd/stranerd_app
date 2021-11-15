<template>
<<<<<<< HEAD
	<IonPage>
		<IonContent>
=======
	<DashboardWithToolbarLayout>
		<div>
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
			<div class="col-span-12 md:col-start-3 md:col-end-11 px-3 ">
				<div class="bg-light_gray rounded-md flex flex-row items-center">
					<router-link active-class="activeSlideTab"
						class="w-1/2 text-center inactiveSlideTab"
<<<<<<< HEAD
						to="/questions/">
=======
						to="/questions">
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
						All Questions
					</router-link>
					<router-link active-class="activeSlideTab"
						class="w-1/2 text-center inactiveSlideTab"
						to="/questions/create">
						Ask your question
					</router-link>
				</div>
			</div>
			<div class="text-xs md:text-sm py-6">
				<h3 class="text-center font-bold text-dark_gray">
					Ask questions to help with your homework and studies.
				</h3>
				<QuestionForm
					:coins="coins"
					:disabled="{ coins: true }"
					:error="error"
					:factory="factory"
					:loading="loading"
					:submit="editQuestion"
				>
					<template v-slot:buttonText>
						Post Question
					</template>
				</QuestionForm>
			</div>
<<<<<<< HEAD
		</IonContent>
	</IonPage>
=======
		</div>
	</DashboardWithToolbarLayout>
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
</template>

<script lang="ts">
import { defineComponent } from 'vue'
<<<<<<< HEAD
import QuestionForm from '@app/components/questions/questions/QuestionForm.vue'
import { IonContent, IonPage } from '@ionic/vue'
=======
import DashboardWithToolbarLayout from '@app/layouts/DashboardWithToolbar.vue'
import QuestionForm from '@app/components/questions/questions/QuestionForm.vue'
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
import { getEditingQuestion, useEditQuestion } from '@app/composable/questions/questions'
import { useRoute } from 'vue-router'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'QuestionIdEdit',
	displayName: 'Edit Question',
<<<<<<< HEAD
	components: { IonPage, IonContent, QuestionForm },
=======
	components: { DashboardWithToolbarLayout, QuestionForm },
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
	middlewares: ['isAuthenticated', async ({ to }) => {
		const { id } = useAuth()
		const { questionId = '' } = to.params
		const question = getEditingQuestion()
		if (!question || question.id !== questionId) return `/questions/${questionId}`
		const canEdit = question.userId === id.value && question.canBeEdited
		if (!canEdit) return `/questions/${question.id}`
	}],
<<<<<<< HEAD
	layout: 'question',
=======
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
	setup () {
		const { questionId } = useRoute().params
		const { factory, error, loading, coins, editQuestion } = useEditQuestion(questionId as string)
		return { factory, error, loading, coins, editQuestion }
	}
})
</script>
