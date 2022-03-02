<template>
	<div :id="question.id"
		class="p-4 md:p-6 rounded-xl bg-white flex flex-col w-full text-xs md:text-sm relative cursor-pointer">
		<ion-ripple-effect class="rounded-xl" />
		<div class="flex flex-row items-center">
			<div class=" flex flex-row items-center">
				<span class="font-bold text-main_dark lg:text-base text-xs capitalize">{{ question.subject }}</span>
			</div>
			<div class="flex flex-row-reverse flex-grow">
				<span class="font-bold text-icon_inactive lg:block hidden">
					{{
						formatNumber(question.answers.length)
					}} {{ pluralize(question.answers.length, 'answer', 'answers') }}
				</span>
			</div>
		</div>
		<router-link :to="`/questions/${question.id}`" class="py-2 text-main_dark leading-normal lg:text-base text-xs">
			{{ question.trimmedBody }}
		</router-link>

		<div class="mt-2 flex flex-row items-center justify-between mt-3 lg:mt-0">
			<span class="font-bold text-icon_inactive ">Posted: {{ formatTime(question.createdAt) }}</span>
			<span class="font-bold text-icon_inactive lg:hidden">	{{
				formatNumber(question.answers.length)
			}} {{ pluralize(question.answers.length, 'answer', 'answers') }}</span>
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

export default defineComponent({
	props: {
		question: {
			required: true,
			type: QuestionEntity
		}
	},
	components: { IonRippleEffect },
	setup () {
		return { formatTime, formatNumber, pluralize, arrowRedo, flag }
	}
})
</script>
