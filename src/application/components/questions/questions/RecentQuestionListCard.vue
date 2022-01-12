<template>
	<router-link
		:class="`py-4 px-4 rounded-xl !min-h-[11rem] ${colorClass} flex flex-col w-full text-xs md:text-sm relative cursor-pointer`"
		:to="`/questions/${question.id}`">
		<div class="flex flex-row items-center gap-2 mb-4">
			<avatar :id="question.userId" :size="28" :src="question.avatar" />
			<span class="font-bold text-main_dark">{{ question.userBio.firstName }}</span>

			<span class="font-bold text-gray ml-auto">{{ formatTime(question.createdAt) }}</span>
		</div>

		<DisplayHtml :html="question.trimmedBody" class="text-main_dark leading-normal mb-auto" />

		<div class="mt-4 flex items-center gap-2 flex-wrap">
			<Tag v-for="tag in question.tags" :key="tag" :tag="tag" />
		</div>

		<span class="mt-4 text-gray font-bold">
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
import Tag from '@app/components/questions/tags/Tag.vue'
import DisplayHtml from '@app/components/core/text/DisplayHtml.vue'

export default defineComponent({
	name: 'RecentQuestionListCard',
	props: {
		colorClass: {
			type: String,
			default: 'bg-white'
		},
		question: {
			type: QuestionEntity,
			required: true
		}
	},
	components: { DisplayHtml, Avatar, Tag },
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
