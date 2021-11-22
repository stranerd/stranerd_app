<template>
	<div >
		<div class="w-full flex justify-between">
			<span class="heading font-bold text-main_dark">
				Continue where you stopped
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
				slideClass="flex md:!w-[300px] !w-[265px] mr-3 lg:!w-2/5 lg:!max-w-[18rem] !mr-6">
				<template v-slot:default="{ item: question, index }">
					<PlainStudyCard :colorClass="0 === index ? 'bg-tinted_pink' : 'bg-light_gray'" :fromHome="true"
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
import { useQuestionList } from '@app/composable/questions/questions'
import EmptyState from '@app/components/core/EmptyState.vue'
import PlainStudyCard from '../study/PlainStudyCard.vue'

export default defineComponent({
	name: 'RecentQuestions',
	components: { IonIcon, Swiper, EmptyState, PlainStudyCard },
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
