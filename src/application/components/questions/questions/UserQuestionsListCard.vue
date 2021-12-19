<template>
	<div :id="question.id"
		class="p-6 rounded-xl bg-white flex flex-col w-full text-xs md:text-sm relative cursor-pointer mt-4">
		<ion-ripple-effect class="rounded-xl"></ion-ripple-effect>
		<div class="flex flex-row items-center">
			<div class=" flex flex-row items-center">
				<span class="font-bold text-main_dark lg:text-base text-xs"><Subject :subject-id="question.subjectId" /></span>
			</div>
			<div class="flex flex-row-reverse flex-grow">


				<span class="font-bold text-icon_inactive lg:block hidden">	{{
					formatNumber(question.answers.length)
				}} {{ pluralize(question.answers.length, 'answer', 'answers') }}
				</span>


			</div>
		</div>


		<router-link :to="`/questions/${question.id}`" class="py-2 text-main_dark leading-normal lg:text-base text-xs">
			{{ question.trimmedBody }}
		</router-link>

		<div class="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center  mt-2">
			<div class=" flex flex-row items-center flex-wrap gap-4">
				<Tag v-for="(tag, index) in question.tags" :key="tag" :index="index +1" :tag="tag" />

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
import { defineComponent } from 'vue'
import { IonRippleEffect } from '@ionic/vue'
import { arrowRedo, flag } from 'ionicons/icons'
import { QuestionEntity } from '@modules/questions'
import { formatNumber, pluralize } from '@utils/commons'
import { formatTime } from '@utils/dates'
import Subject from '../subjects/Subject.vue'
import Tag from '../tags/Tag.vue'

export default defineComponent({
	props: {
		question: {
			required: true,
			type: QuestionEntity
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
