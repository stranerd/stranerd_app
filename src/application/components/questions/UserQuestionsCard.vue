<template>
	<div :id="question.id"
		class="py-4 px-4 rounded-lg bg-light_gray flex flex-col w-full text-xs md:text-sm relative cursor-pointer"
		to="/questions/answers">
		<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
		<div class="flex flex-row items-center">
			<div class="mt-3 flex flex-row items-center">
				<span class="font-bold text-dark_gray"><Subject :subject-id="question.subjectId" /></span>
			</div>
			<div class="flex flex-row-reverse flex-grow">


				<span class="font-bold text-icon_inactive lg:block hidden">	{{
					formatNumber(question.answers.length)
				}} {{ pluralize(question.answers.length, 'answer', 'answers') }}
				</span>


			</div>
		</div>


		<router-link :to="`/questions/${question.id}`" class="py-2 text-dark_gray leading-normal">
			{{ question.trimmedBody }}
		</router-link>

		<div class="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center  mt-2">
			<div class=" flex flex-row items-center flex-wrap gap-4">
				<Tag v-for="tag in question.tags" :key="tag" :tag="tag" />
			</div>

			<div class=" flex flex-row items-center justify-between mt-3 lg:mt-0">
				<span class="font-bold text-icon_inactive ">Posted: {{ formatTime(question.createdAt) }}</span>
				<span class="font-bold text-icon_inactive lg:hidden">	{{
					formatNumber(question.answers.length)
				}} {{ pluralize(question.answers.length, 'answer', 'answers') }}</span>
			</div>
		</div>

	</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IonRippleEffect } from '@ionic/vue'
import { arrowRedo, flag } from 'ionicons/icons'
import { QuestionEntity } from '@modules/questions'
import { formatNumber, pluralize } from '@utils/commons'
import { formatTime } from '@utils/dates'
import Subject from './subjects/Subject.vue'
import Tag from './tags/Tag.vue'

export default defineComponent({
	props: {
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		}
	},
	setup () {
		return { formatTime, formatNumber, pluralize, arrowRedo, flag }
	},
	components: {
		IonRippleEffect,
		Subject,
		Tag
	}

})
</script>
