<template>
	<router-link
		:class="`py-4 px-4 rounded-xl !min-h-[11rem] bg-white flex flex-col w-full text-xs md:text-sm relative cursor-pointer `"
		:to="`/questions/${question.id}`">
		<div class="flex lg:flex-row flex-col lg:items-center gap-3 mb-4">
			<avatar :id="question.userId" :size="28" :src="question.avatar" class="hidden lg:block" />
			<span class="font-bold text-main_dark hidden lg:block">{{ question.userBio.firstName }}</span>

			<span class="font-bold text-gray ml-auto">{{ formatTime(question.createdAt) }}</span>
		</div>

		<span class="py-1 text-main_dark leading-normal mb-2 lg:mb-4" v-html="question.trimmedBody" />

		<div class="mt-2 mb-2 flex flex-row items-center gap-y-2 gap-x-2 flex-wrap">
			<Tag v-for="tag in question.tags" :key="tag" :tag="tag" />
		</div>

		<span class="mt-auto text-gray font-bold">
			{{ question.answers.length }} {{ pluralize(question.answers.length, 'answer', 'answers') }}
		</span>
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { arrowRedo, flag } from 'ionicons/icons'
import { QuestionEntity } from '@modules/questions'
import { formatTime } from '@utils/dates'
import { pluralize } from '@utils/commons'
import Avatar from '@app/components/core/Avatar.vue'
import { openAnswerModal } from '@app/composable/questions/answers'
import { useReportModal } from '@app/composable/core/modals'
import Tag from '../tags/Tag.vue'


export default defineComponent({
	name: 'RecentQuestionListCard',
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
	components: { Avatar, Tag  },
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
