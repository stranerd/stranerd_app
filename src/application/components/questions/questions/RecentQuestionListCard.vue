<template>
	<router-link :to="`/questions/${question.id}`"
		class="card-padding rounded-xl bg-white flex flex-col w-full">
		<DisplayHtml :html="question.trimmedBody" class="text-main_dark leading-normal font-500" />
		<div class="w-full flex justify-between items-center mt-auto text-sub text-main_dark">
			<div class="flex items-center">
				<span class="ml-auto">{{ formatTime(question.createdAt) }}</span>
				<div class="h-1 w-1 bg-gray mx-2 rounded-full" />
				<span>
					{{ question.answers.length }} {{ pluralize(question.answers.length, 'answer', 'answers') }}
				</span>
			</div>
			<avatar :id="question.user.id" :name="question.user.bio.fullName" :size="24" :src="question.user.bio.photo"
				class="ml-auto" />
		</div>
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { arrowRedoOutline, flagOutline } from 'ionicons/icons'
import { QuestionEntity } from '@modules/questions'
import { formatTime } from '@utils/dates'
import { pluralize } from '@utils/commons'
import Avatar from '@app/components/core/Avatar.vue'
import { openAnswerModal } from '@app/composable/questions/answers'
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
			arrowRedoOutline, flagOutline,
			formatTime, pluralize
		}
	}
})
</script>
