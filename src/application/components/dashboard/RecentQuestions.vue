<template>
	<div class="w-full flex justify-between mt-10">
		<span class="heading font-bold text-dark_gray">
			Recent questions
		</span>

		<slider-controller class="hidden lg:flex" />

		<div class="text-primary normalText flex items-center font-bold">
			<span>view all</span>
			<ion-icon :icon="chevronForwardOutline" class="text-xs md:text-xl"></ion-icon>
		</div>
	</div>

	<template v-if="questions.length == 0">
		<div class="py-3">
			<empty-state
				:btnText="'Ask a question'"
				:info="'You have no recent questions! Start asking questions to help with homework and studying.'"
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
					v-for="(question,index) in questions"
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
					v-for="(question,index) in questions"
					:key="index"
					class="!w-1/3 !pr-3">
					<question :colorClass="0 === index ? 'bg-butter_yellow h-[155px]' : 'bg-light_gray h-[155px]'"
						:fromHome="true" :question="question" />
				</swiper-slide>

			</swiper>
		</div>
	</template>

</template>


<script lang="ts">
import { IonIcon } from '@ionic/vue'
import { chevronBackOutline, chevronForwardOutline, ellipse } from 'ionicons/icons'
import SliderController from '@app/components/core/nav/sliderController.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.min.css'
import Question from '../questions/question.vue'
import { useQuestionList } from '@app/composable/questions/questions'
import EmptyState from '../core/emptyState.vue'

export default {
	name: 'Home',
	components: { IonIcon, SliderController, Swiper, SwiperSlide, Question, EmptyState },
	setup () {

		const { questions } = useQuestionList()
		return { chevronForwardOutline, chevronBackOutline, ellipse, questions }
	}
}
</script>

<style>

</style>
