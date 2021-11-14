<template>
	<div>
		<div class="w-full flex justify-between">
			<span class="heading font-bold text-dark_gray">
				Recent questions
			</span>

			<router-link v-if="questions.length " class="text-primary normalText flex items-center font-bold"
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
			<Swiper :freeMode="true" :items="questions" :slides="3" class="mt-2 overflow-x-auto lg:hidden"
				slideClass="flex md:!w-[300px] !w-[265px] mr-3">
				<template v-slot:default="{ item: question, index }">
					<QuestionListCard :colorClass="0 === index ? 'bg-butter_yellow' : 'bg-light_gray'" :fromHome="true"
						:question="question" class="h-[150px]" />
				</template>
			</Swiper>

			<Swiper :items="questions" :slides="3"
				class="mt-2 overflow-x-auto hidden lg:flex flex-row items-center"
				slideClass="!w-2/5 !max-w-[18rem] !pr-3">
				<template v-slot:default="{ item: question, index }">
					<QuestionListCard :colorClass="0 === index ? 'bg-butter_yellow' : 'bg-light_gray'" :fromHome="true"
						:question="question" class="h-[9rem]" />
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
