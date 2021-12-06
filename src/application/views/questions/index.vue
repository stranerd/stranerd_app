<template>
	<DashboardLayout>
		<div class="px-4 lg:pl-2  pt-2">
			<div class="col-span-12 md:col-start-3 md:col-end-11 lg:mt-8 mt-4">
				<div
					class="rounded-xl flex flex-row items-center justify-center bg-light_gray max-w-[33rem] mx-auto border border-faded_gray lg:border-0">
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
			<QuestionsList />
		</div>
	</DashboardLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import QuestionsList from '@app/components/questions/questions/QuestionsList.vue'

export default defineComponent({
	name: 'Questions',
	components: { QuestionsList, DashboardLayout }
})
</script>
