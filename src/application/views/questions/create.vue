<template>
	<DashboardLayout>
		<div>
			<div class="col-span-12 md:col-start-3 md:col-end-11">
				<div class="bg-light_gray rounded-md flex flex-row items-center">
					<router-link active-class="activeSlideTab"
						class="w-1/2 text-center inactiveSlideTab"
						to="/questions">
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
					:error="error"
					:factory="factory"
					:loading="loading"
					:submit="createQuestion"
				>
					<template v-slot:buttonText>
						Post Question
					</template>
				</QuestionForm>
			</div>
		</div>
	</DashboardLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@root/application/layouts/Dashboard.vue'
import QuestionForm from '@app/components/questions/questions/QuestionForm.vue'
import { useCreateQuestion } from '@app/composable/questions/questions'

export default defineComponent({
	name: 'QuestionsCreate',
	components: { DashboardLayout, QuestionForm },
	middlewares: ['isAuthenticated'],
	setup () {
		const { factory, error, loading, coins, createQuestion } = useCreateQuestion()
		return { factory, error, loading, coins, createQuestion }
	}
})
</script>
