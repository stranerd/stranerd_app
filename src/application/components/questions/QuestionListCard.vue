<template>
	<router-link
		:class="`py-6 px-6 rounded-xl ${colorClass} flex flex-col w-full text-xs md:text-sm relative cursor-pointer `"
		:to="`/questions/${question.id}`">
		<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
		<div class="flex flex-row items-center">
			<avatar :id="question.userId" :size="28" :src="question.avatar" class="mr-2" />
			
			<span class="font-bold text-main_dark">{{ question.userBio.fullName }}</span>
			<div class="flex flex-row-reverse flex-grow">
				<template v-if="fromHome">
					<span class="font-bold text-gray lg:mr-2">{{ formatTime(question.createdAt) }}</span>
				</template>
				<template v-else>
					<template v-if="!fromViewQuestion">
						<button
							class="py-1 px-3 rounded-lg text-white bg-dark_gray font-bold flex flex-row items-center"
							@click="openAnswerModal(question)">
							<span class="mr-2">Answer</span>
							<span class="h-1 w-1 rounded-full bg-white mr-2"></span>
						</button>
					</template>
					<template v-if="fromViewQuestion">
						<IonIcon :icon="flag" class="text-[22px]  text-icon_inactive cursor-pointer"
							@click="openReportQuestionModal" />
						<IonIcon :icon="arrowRedo" class="text-[22px] mr-2 text-icon_inactive" />
					</template>
				</template>
			</div>
		</div>

		<div v-if="isFeatured" class="mt-3">
			<button class="py-1 px-3 rounded-lg text-white bg-star_yellow font-bold flex flex-row items-center">
				Featured
			</button>
		</div>
		<div v-if="!fromHome" class="mt-3 flex flex-row items-center">
			<span class="h-[5px] w-[5px] rounded-full bg-icon_inactive mr-3"></span>
			<Subject :key="question.subjectId" :subjectId="question.subjectId" class="font-semibold text-main_dark" />
		</div>

		<span class="py-2 pb-1 text-main_dark leading-normal mb-2 lg:mb-4"
			v-html="fromViewQuestion ? question.body : question.trimmedBody" />

		<div
			:class="`w-full flex flex-col lg:flex-row lg:justify-between ${!fromViewQuestion ? 'absolute bottom-6 left-0 px-6' : ''} w-full `">
			<div v-if="!fromHome" class="mt-2 mb-2 flex flex-row items-center gap-y-2 gap-x-2 flex-wrap">
				<Tag v-for="(tag, index) in question.tags" :key="tag" :tag="tag" :index="index + 1"/>
			</div>

			<div class=" flex flex-row items-center ">
				<span v-if="!fromHome"
					class="font-bold text-main_dark lg:mr-2">{{ formatTime(question.createdAt) }}</span>
				<div :class="`flex ${fromHome ? 'flex-row' : 'flex-row-reverse'}  items-center flex-grow`">
					<span class="font-bold text-main_dark">{{
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
import { IonIcon, IonRippleEffect } from '@ionic/vue'
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
		IonIcon, IonRippleEffect, Avatar, Subject, Tag,
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
