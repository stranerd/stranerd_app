<template>
	<router-link :id="question.id" :to="`/questions/${question.id}`"
		class="card-padding rounded-xl bg-white flex flex-col w-full relative cursor-pointer">
		<ion-ripple-effect class="rounded-xl" />
		<div class="flex items-center">
			<div class="flex items-center">
				<span class="font-bold text-secondaryText text-sub capitalize">{{ question.subject }}</span>
			</div>
			<div class="flex justify-end flex-grow">
				<span class="font-bold text-icon_inactive lg:block hidden">
					{{
						formatNumber(question.answers.length)
					}} {{ pluralize(question.answers.length, 'answer', 'answers') }}
				</span>
			</div>
		</div>
		<span class="text-secondaryText leading-normal text-sub">
			{{ question.trimmedBody }}
		</span>

		<div class="flex items-center justify-between">
			<span class="font-bold text-icon_inactive ">Posted: {{ formatTime(question.createdAt) }}</span>
			<span class="font-bold text-icon_inactive lg:hidden">	{{
				formatNumber(question.answers.length)
			}} {{ pluralize(question.answers.length, 'answer', 'answers') }}</span>
		</div>
	</router-link>
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
