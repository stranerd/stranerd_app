<template>
	<router-link :to="`/questions/${question.id}`" class="flex flex-col card card-padding">
		<div class="flex items-center text-secondaryText text-base justify-between">
			<div class="flex items-start gap-4">
				<Avatar :id="question.user.id" :name="question.user.bio.fullName" :size="48"
					:src="question.user.bio.photo" />
				<div class="flex flex-col">
					<span class="flex text-base items-center gap-1 font-bold">
						<span>{{ question.user.bio.fullName }}</span>
						<Verified :verified="question.isUserVerified" />
						<IonIcon :icon="ellipse" class="dot" />
						<span class="mr-auto font-normal text-sm">{{ formatTime(question.createdAt) }}</span>
					</span>
					<InteractionTag :tagId="question.tagId" class="text-sm" />
					<DisplayHtml :html="question.trimmedBody" class="mt-2" />
				</div>
			</div>
			<!-- <IonButton v-if="showAnswerButton"
				class="btn-primary" style="--border-radius: 10rem;"
				@click.prevent="openAnswerModal(question, $router)">
				Answer
			</IonButton>  -->
		</div>

		<!-- {{question}} -->

		<div class="flex justify-between items-center gap-2.5 text-secondaryText text-sm  mt-6 lg:pl-0">
			<div class="flex gap-3 item">
				<span class="flex gap-1 items-center" v-if="question.attachments.length">
					<IonIcon  :icon="attachOutline" class="rotate-45" />
					<span>{{ formatNumber(question.attachments.length) }}</span>
				</span>
				<span class="flex gap-2 items-center">
					<IonIcon  :icon="helpCircleOutline" />
					<span>{{ formatNumber(question.attachments.length) }} answer</span>
				</span>
			</div>
		
	
			<div class="flex gap-6 items-center">
				<IonIcon  :icon="bookmarkOutline" />
			
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
import { arrowRedoOutline, ellipse, flagOutline, attachOutline, chatbubbleOutline, bookmarkOutline, helpCircleOutline } from 'ionicons/icons'
import { QuestionEntity } from '@modules/questions'
import { formatTime } from '@utils/dates'
import { formatNumber, pluralize } from '@utils/commons'
import { openAnswerModal } from '@app/composable/questions/answers'
import { useAuth } from '@app/composable/auth/auth'
import InteractionTag from '@app/components/interactions/tags/Tag.vue'

export default defineComponent({
	name: 'QuestionListCard',
	components: { InteractionTag },
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
			showAnswerButton, openAnswerModal, formatTime, formatNumber, pluralize,bookmarkOutline,
			arrowRedoOutline, flagOutline, attachOutline, chatbubbleOutline, ellipse, helpCircleOutline
		}
	}
})
</script>
