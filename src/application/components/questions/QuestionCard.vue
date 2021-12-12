<template>
	<router-link
		:class="`py-4 px-4 rounded-xl !min-h-[11rem] ${colorClass} flex flex-col w-full text-xs md:text-sm relative cursor-pointer `"
		:to="`/questions/${question.id}`">
		<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
		<div class="flex w-full items-center justify-between">
			<div class="flex lg:flex-row flex-col lg:items-center gap-3">
				<avatar :id="question.userId" :size="28" :src="question.avatar" class="hidden lg:block" />
				<span class="font-bold text-main_dark hidden lg:block">{{ question.userBio.fullName }}</span>
				<div class="h-1 w-1 bg-icon_inactive rounded-full hidden lg:block" />

				<Subject :key="question.subjectId" :subjectId="question.subjectId" class="font-bold text-main_dark text-xs lg:text-base" />

				<div v-if="isFeatured">
					<button
						class="py-1 px-3 rounded-lg text-main_dark bg-yellow_star font-bold flex-row items-center flex">
						Featured
					</button>
				</div>
			</div>
			<ion-button
				class="btn-outline btn-outline-sm text-primary text-xs lg:text-base"
				@click="openAnswerModal(question)">
				<span>Answer</span>
			</ion-button>
		</div>

		<span class="py-2 pb-1 text-main_dark leading-normal mb-2 lg:mb-4 mt-2"
			v-html="question.shortBody " />

		<div
			:class="`w-full flex flex-col lg:flex-row lg:justify-between ${!fromViewQuestion ? 'absolute bottom-3 left-0 px-4' : ''} w-full `">
			<div v-if="!fromHome" class="mt-2 mb-2 flex flex-row items-center gap-y-2 gap-x-2 flex-wrap">
				<Tag v-for="(tag, index) in question.tags" :key="tag" :tag="tag" :index="index + 1"/>
			</div>

			<div class=" flex flex-row items-center ">
				<span v-if="!fromHome"
					class="font-bold text-gray lg:mr-2">{{ formatTime(question.createdAt) }}</span>
				<div :class="`flex ${fromHome ? 'flex-row' : 'flex-row-reverse'}  items-center flex-grow`">
					<span class="font-bold text-gray">{{
						question.answers.length
					}} {{ pluralize(question.answers.length, 'answer', 'answers') }}</span>
					<span v-if="!fromHome" class="h-[5px] w-[5px] rounded-full bg-icon_inactive mr-3 "></span>
				</div>
			</div>
		</div>

	</router-link>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { IonRippleEffect } from '@ionic/vue'
import { arrowRedo, flag } from 'ionicons/icons'
import { QuestionEntity } from '@modules/questions'
import { formatTime } from '@utils/dates'
import { pluralize } from '@utils/commons'
import Subject from '@app/components/questions/subjects/Subject.vue'
import Avatar from '@app/components/core/Avatar.vue'
import { openAnswerModal } from '@app/composable/questions/answers'
import { useReportModal } from '@app/composable/core/modals'
import Tag from './tags/Tag.vue'

export default defineComponent({
	name: 'QuestionListCard',
	props: {
		colorClass: {
			type: String,
			default: 'bg-light_gray'
		},
		isFeatured: {
			type: Boolean,
			default: false
		},
		fromViewQuestion: {
			type: Boolean,
			default: false
		},
		fromHome: {
			type: Boolean,
			default: false
		},
		question: {
			type: QuestionEntity,
			required: true
		}
	},
	components: {
		IonRippleEffect, Avatar, Subject, Tag
	},

	setup (props) {
		return {
			openAnswerModal: () => openAnswerModal(props.question),
			openReportQuestionModal: () => useReportModal().openReportQuestion(),
			arrowRedo,
			flag,
			formatTime, pluralize
		}
	}
})
</script>
