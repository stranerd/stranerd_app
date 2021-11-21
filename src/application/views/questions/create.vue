<template>
	<DashboardLayout>
		<div class="px-4 lg:pl-2  pt-2">

			<div class="col-span-12 md:col-start-3 md:col-end-11 lg:mt-8 mt-4">
				<div class="rounded-xl flex flex-row items-center bg-light_gray max-w-[33rem] mx-auto justify-center border border-faded_gray lg:border-0">
					<router-link active-class="activeSlideTab"
						class="w-1/2 max-w-[16.5rem] text-center inactiveSlideTab"
						to="/questions">
						All Questions
					</router-link>
					<router-link active-class="activeSlideTab"
						class="w-1/2 max-w-[16.5rem] text-center inactiveSlideTab"
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
import DashboardLayout from '@app/layouts/Dashboard.vue'
import QuestionForm from '@app/components/questions/questions/QuestionForm.vue'
import { useCreateQuestion } from '@app/composable/questions/questions'

export default defineComponent({
	name: 'QuestionsCreate',
	components: { DashboardLayout, QuestionForm },
	middlewares: ['isAuthenticated'],
	setup () {
		const { factory, error, loading, createQuestion } = useCreateQuestion()
		return { factory, error, loading, createQuestion }
	}
})
</script>
