<template>
	<router-link :to="`/questions/${question.id}`" class="flex flex-col card card-padding">
		<div class="flex items-center text-secondaryText text-sm justify-between">
			<div class="flex items-center gap-2">
				<Avatar :id="question.user.id" :name="question.user.bio.fullName" :size="24"
					:src="question.user.bio.photo" />
				<span class="flex items-center gap-1 font-bold">
					<span>{{ question.user.bio.fullName }}</span>
					<Verified :verified="question.isUserVerified" />
				</span>
			</div>
			<IonButton v-if="showAnswerButton"
				class="btn-primary" style="--border-radius: 10rem;"
				@click.prevent="openAnswerModal(question, $router)">
				Answer
			</IonButton>
		</div>

		<DisplayHtml :html="question.trimmedBody" class="pl-8 lg:pl-0" />

		<div class="flex items-center gap-2.5 text-secondaryText text-sm pl-8 lg:pl-0">
			<InteractionTag :tagId="question.tagId" />
			<IonIcon :icon="ellipse" class="dot" />
			<span class="mr-auto">{{ formatTime(question.createdAt) }}</span>

			<SaveToSet :entity="question" />

			<span v-if="question.attachments.length" class="flex gap-1 items-center">
				<IonIcon :icon="attachOutline" />
				<span>{{ formatNumber(question.attachments.length) }}</span>
			</span>
			<span class="flex gap-1 items-center">
				<IonIcon :icon="chatbubbleOutline" />
				<span>{{ formatNumber(question.answers.length) }}</span>
			</span>
			<Share :text="question.strippedBody" title="Share this question" />
		</div>
	</router-link>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import {
	arrowRedoOutline,
	attachOutline,
	bookmarkOutline,
	chatbubbleOutline,
	ellipse,
	flagOutline
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
			showAnswerButton, openAnswerModal, formatTime, formatNumber, pluralize, bookmarkOutline,
			arrowRedoOutline, flagOutline, attachOutline, chatbubbleOutline, ellipse
		}
	}
})
</script>
