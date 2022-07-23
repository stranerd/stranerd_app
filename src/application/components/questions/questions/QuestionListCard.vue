<template>
	<router-link :to="`/questions/${question.id}`" class="flex flex-col card card-padding !gap-4">
		<div class="flex items-center gap-4 text-secondaryText">
			<Avatar :id="question.user.id" :name="question.user.bio.fullName" :size="40"
				:src="question.user.bio.photo" />
			<div class="flex flex-col">
				<span class="flex items-center gap-1">
					<span class="font-bold">{{ question.user.bio.fullName }}</span>
					<Verified :verified="question.isUserVerified" />
				</span>
				<div class="flex gap-1 items-center text-sm">
					<InteractionTag :tagId="question.tagId" />
					<IonIcon :icon="ellipse" class="dot" />
					<span>{{ formatTime(question.createdAt) }}</span>
				</div>
			</div>
		</div>
		<DisplayHtml :html="question.trimmedBody" />

		<div class="flex items-center gap-5 text-secondaryText text-sm">
			<span v-if="question.attachments.length" class="flex gap-1 items-center">
				<IonIcon :icon="attachOutline" class="rotate-45" />
				<span>{{ formatNumber(question.attachments.length) }}</span>
			</span>
			<span class="flex gap-1 items-center mr-auto">
				<IonIcon :icon="helpCircleOutline" />
				<span>
					{{ formatNumber(question.answers.length + question.meta.comments) }}
				</span>
			</span>
			<SaveToSet :entity="question" />
			<span class="flex gap-1 items-center">
				<IonIcon :icon="chatbubbleOutline" />
				<span>{{ formatNumber(question.answers.length) }}</span>
			</span>
			<Share :link="question.shareLink" :text="question.strippedBody" title="Share this question" />
		</div>
	</router-link>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { attachOutline, chatbubbleOutline, ellipse, helpCircleOutline } from 'ionicons/icons'
import { QuestionEntity } from '@modules/questions'
import { formatTime } from '@utils/dates'
import { formatNumber } from '@utils/commons'
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
			showAnswerButton, openAnswerModal, formatTime, formatNumber,
			attachOutline, chatbubbleOutline, ellipse, helpCircleOutline
		}
	}
})
</script>
