<template>
	<router-link :to="`/questions/${question.id}`" class="flex flex-col card card-padding !gap-6">
		<div class="flex items-start gap-4 text-secondaryText">
			<Avatar :id="question.user.id" :name="question.user.bio.fullName" :size="48"
				:src="question.user.bio.photo" />
			<div class="flex flex-col">
				<span class="flex items-center gap-1">
					<span class="font-bold">{{ question.user.bio.fullName }}</span>
					<Verified :verified="question.isUserVerified" />
					<IonIcon :icon="ellipse" class="dot" />
					<span class="text-sm">{{ formatTime(question.createdAt) }}</span>
				</span>
				<InteractionTag :tagId="question.tagId" class="text-sm" />
				<DisplayHtml :html="question.trimmedBody" class="mt-2" />
			</div>
		</div>

		<div class="flex justify-between items-center gap-2.5 text-secondaryText text-sm">
			<div class="flex gap-3 items-center">
				<span v-if="question.attachments.length" class="flex gap-1 items-center">
					<IonIcon :icon="attachOutline" class="rotate-45" />
					<span>{{ formatNumber(question.attachments.length) }}</span>
				</span>
				<span class="flex gap-2 items-center">
					<IonIcon :icon="helpCircleOutline" />
					<span>
						{{
							formatNumber(question.answers.length)
						}} {{ pluralize(question.answers.length, 'answer', 'answers') }}
					</span>
				</span>
			</div>

			<div class="flex gap-6 items-center">
				<SaveToSet :entity="question" />
				<span class="flex gap-1 items-center">
					<IonIcon :icon="chatbubbleOutline" />
					<span>{{ formatNumber(question.answers.length) }}</span>
				</span>
				<Share :text="question.strippedBody" title="Share this question" />
			</div>
		</div>
	</router-link>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import {
	arrowRedoOutline,
	attachOutline,
	chatbubbleOutline,
	ellipse,
	flagOutline,
	helpCircleOutline
} from 'ionicons/icons'
import { QuestionEntity } from '@modules/questions'
import { formatTime } from '@utils/dates'
import { formatNumber, pluralize } from '@utils/commons'
import { openAnswerModal } from '@app/composable/questions/answers'
import { useAuth } from '@app/composable/auth/auth'
import InteractionTag from '@app/components/interactions/tags/Tag.vue'
import SaveToSet from '@app/components/study/sets/SaveToSet.vue'

export default defineComponent({
	name: 'QuestionListCard',
	components: { InteractionTag, SaveToSet },
	props: {
		question: {
			type: QuestionEntity,
			required: true
		}
	},
	setup (props) {
		const { id } = useAuth()
		const showAnswerButton = computed({
			get: () => props.question.user.id !== id.value && !props.question.isAnswered && !props.question.answers.find((a) => a.userId === id.value),
			set: () => {
			}
		})
		return {
			showAnswerButton, openAnswerModal, formatTime, formatNumber, pluralize,
			arrowRedoOutline, flagOutline, attachOutline, chatbubbleOutline, ellipse, helpCircleOutline
		}
	}
})
</script>
