<template>
	<div>
		<div class="w-full flex justify-between">
			<span class="heading font-bold text-dark_gray">
				Recent questions
			</span>

			<router-link v-if="shortenQuestionsList.length " class="text-primary normalText flex items-center font-bold"
				to="/questions">
				<span>view all</span>
				<ion-icon :icon="chevronForwardOutline" class="text-xs md:text-xl"></ion-icon>
			</router-link>
		</div>

		<template v-if="shortenQuestionsList.length === 0">
			<div class="py-3">
				<empty-state
					btnText="Ask a question"
					info="You have no recent questions! Start asking questions to help with homework and studying."
					route="/questions"
				></empty-state>
			</div>
		</template>
		<template v-else>
			<div class="flex md:gap-6 gap-3 mt-2 lg:hidden">
				<swiper
					:direction="'horizontal'" :freeMode="true" class="overflow-x-auto"
				>
					<swiper-slide
						v-for="(question,index) in shortenQuestionsList"
						:key="index + 1"
						class="flex md:!w-[300px] !w-[265px] mr-3">
						<question :colorClass="0 === index ? 'bg-butter_yellow h-[150px]' : 'bg-light_gray h-[150px]'"
							:fromHome="true" :question="question" />
					</swiper-slide>

				</swiper>
			</div>

			<div class="lg:flex  w-full  md:gap-6 gap-3 mt-2 hidden">
				<swiper
					:direction="'horizontal'"
					:slidesPerView="3" class="flex flex-row w-full items-center"
				>
					<swiper-slide
						v-for="(question,index) in shortenQuestionsList"
						:key="index"
						class="!w-2/5 !max-w-[18rem] !pr-3">
						<question :colorClass="0 === index ? 'bg-butter_yellow h-[9rem]' : 'bg-light_gray h-[9rem]'"
							:fromHome="true" :question="question" />
					</swiper-slide>

				</swiper>
			</div>
		</template>
	</div>
</template>


<script lang="ts">
import { computed, defineComponent } from 'vue'
import { IonIcon } from '@ionic/vue'
import { chevronBackOutline, chevronForwardOutline, ellipse } from 'ionicons/icons'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.min.css'
import Question from '../questions/QuestionListCard.vue'
import { useQuestionList } from '@app/composable/questions/questions'
import EmptyState from '@app/components/core/EmptyState.vue'

export default defineComponent({
	name: 'RecentTransactions',
	components: { IonIcon, Swiper, SwiperSlide, Question, EmptyState },
	setup () {

		const { questions } = useQuestionList()

		const shortenQuestionsList = computed({
			get: () => {
				return questions.value.slice(0, 6)
			},
			set: () => {
			}
		}
		)
		return { chevronForwardOutline, chevronBackOutline, ellipse, shortenQuestionsList }
	}
})
</script>

<style>

</style>
