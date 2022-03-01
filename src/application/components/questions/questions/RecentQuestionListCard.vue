<template>
	<router-link :to="`/questions/${question.id}`"
		class="p-4 rounded-xl bg-white flex flex-col gap-3 w-full text-xs md:text-sm text-main_dark">
		<div class="flex flex-row items-center gap-2">
			<avatar :id="question.userId" :size="28" :src="question.avatar" />
			<span class="flex items-center gap-1">
				<span>{{ question.userBio.firstName }}</span>
				<IonIcon v-if="question.isUserVerified" :icon="checkmarkCircleOutline" color="primary" />
			</span>

			<span class="font-medium text-gray ml-auto">{{ formatTime(question.createdAt) }}</span>
		</div>

		<DisplayHtml :html="question.trimmedBody" class="leading-normal" />

		<span class="text-gray">
			{{ question.answers.length }} {{ pluralize(question.answers.length, 'answer', 'answers') }}
		</span>
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { arrowRedoOutline, checkmarkCircleOutline, flagOutline } from 'ionicons/icons'
import { QuestionEntity } from '@modules/questions'
import { formatTime } from '@utils/dates'
import { pluralize } from '@utils/commons'
import Avatar from '@app/components/core/Avatar.vue'
import { openAnswerModal } from '@app/composable/questions/answers'
import { useReportModal } from '@app/composable/core/modals'
import DisplayHtml from '@app/components/core/text/DisplayHtml.vue'

export default defineComponent({
	name: 'RecentQuestionListCard',
	props: {
		question: {
			type: QuestionEntity,
			required: true
		}
	},
	components: { DisplayHtml, Avatar },
	setup (props) {
		return {
			openAnswerModal: () => openAnswerModal(props.question),
			openReportQuestionModal: () => useReportModal().openReportQuestion(),
			arrowRedoOutline, flagOutline, checkmarkCircleOutline,
			formatTime, pluralize
		}
	}
})
</script>
