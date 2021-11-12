<template>
	<router-link
		:class="`py-4 px-4 rounded-lg ${colorClass} flex flex-col w-full text-xs md:text-sm relative cursor-pointer`"
		:to="`/questions/${question.id}`">
		<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
		<div class="flex flex-row items-center">
			<avatar :id="question.userId" :size="28" :src="question.avatar" class="mr-2" />
			<span class="font-bold text-dark_gray">{{ question.userBio.fullName }}</span>
			<div class="flex flex-row-reverse flex-grow">
				<template v-if="fromHome">
					<span class="font-bold text-icon_inactive lg:mr-2">{{ formatTime(question.createdAt) }}</span>
				</template>
				<template v-else>
					<template v-if="!fromViewQuestion">
						<button
							class="py-1 px-3 rounded-lg text-white bg-dark_gray font-bold flex flex-row items-center"
							@click="openAnswerModal(question)">
							<span class="mr-2">Answer</span>
							<span class="h-1 w-1 rounded-full bg-white mr-2"></span>
							<span class="mr-1 text-sm">+{{ question.creditable }}</span>
							<img class=" h-4" src="/assets/images/bronze.svg" />
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
			<Subject :key="question.subjectId" :subjectId="question.subjectId" class="font-semibold text-dark_gray" />
		</div>

		<span class="py-2 text-dark_gray leading-normal mb-3 lg:mb-5"
			v-html="fromViewQuestion ? question.body : question.trimmedBody" />

		<div
			:class="`w-full flex flex-col lg:flex-row lg:justify-between ${!fromViewQuestion ? 'absolute bottom-3 left-0 px-4' : ''} w-full `">
			<div v-if="!fromHome" class="mt-2 mb-2 flex flex-row items-center gap-y-2 gap-x-2 flex-wrap">
				<span v-for="(tag, index) in question?.tags" :key="index">
					<span v-if="tag" class="py-1 px-2 font-bold text-white bg-faded_gray rounded-lg inline-block">
						{{ tag }}
					</span>
				</span>
			</div>

			<div class="mt-2 flex flex-row items-center ">
				<span v-if="!fromHome"
					class="font-bold text-icon_inactive lg:mr-2">{{ formatTime(question.createdAt) }}</span>
				<div :class="`flex ${fromHome ? 'flex-row' : 'flex-row-reverse'}  items-center flex-grow`">
					<span class="font-bold text-icon_inactive">{{
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
		IonIcon, IonRippleEffect, Avatar, Subject
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
