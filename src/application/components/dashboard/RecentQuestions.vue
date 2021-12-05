<template>
	<div class="mt-7">
		<div class="w-full flex justify-between">
			<span class="heading font-bold text-main_dark">
				Recent questions
			</span>

			<router-link v-if="questions.length " class="text-primary normalText flex items-center font-semibold"
				to="/questions">
				<span>view all</span>
				<ion-icon :icon="chevronForwardOutline" class="text-xs md:text-xl"></ion-icon>
			</router-link>
		</div>

		<template v-if="questions.length === 0">
			<div class="py-3">
				<empty-state
					btnText="Ask a question"
					info="You have no recent questions! Start asking questions to help with homework and studying."
					route="/questions"
				></empty-state>
			</div>
		</template>
		<template v-else>
			<Swiper :freeMode="true" :items="questions" :slides="1.1" class="mt-2 overflow-x-auto flex"
				slideClass="flex md:!w-[300px] !w-[265px] mr-3 lg:!w-2/5 lg:!max-w-[18rem] min-w-[16.5rem] !mr-6">
				<template v-slot:default="{ item: question, index }">
					<QuestionListCard
						:colorClass="0 === index ? 'bg-butter_yellow min-w-[16.5rem]' : 'bg-butter_yellow min-w-[16.5rem]'"
						:fromHome="true"
						:question="question" class="h-[9.7rem]" />
				</template>
			</Swiper>


		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { IonIcon } from '@ionic/vue'
import { chevronBackOutline, chevronForwardOutline, ellipse } from 'ionicons/icons'
import Swiper from '@app/components/core/Swiper.vue'
import QuestionListCard from '@app/components/questions/QuestionListCard.vue'
import { useQuestionList } from '@app/composable/questions/questions'
import EmptyState from '@app/components/core/EmptyState.vue'

export default defineComponent({
	name: 'RecentQuestions',
	components: { IonIcon, Swiper, QuestionListCard, EmptyState },
	setup () {
		const { questions: allQuestions, listener, loading, error } = useQuestionList()
		const questions = computed({
			get: () => allQuestions.value.slice(0, 6),
			set: () => {
			}
		})
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)

		return {
			chevronForwardOutline, chevronBackOutline, ellipse,
			questions, loading, error
		}
	}
})
</script>

<style>

</style>
