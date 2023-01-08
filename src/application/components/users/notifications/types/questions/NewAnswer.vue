<template>
	<div v-if="answer" class="flex border-bottom-line card-padding items-start">
		<Avatar :id="answer.user.id" :name="answer.user.bio.fullName" :size="32" :src="answer.user.bio.photo" />
		<div class="flex flex-col gap-2 flex-1">
			<div class="flex gap-2 items-center">
				<IonText>{{ answer.user.bio.fullName }} answered your question</IonText>
				<IonIcon :icon="ellipse" class="dot" />
				<IonText>{{ formatTime(notification.createdAt) }}</IonText>
			</div>
			<div class="border border-2 border-itemBg rounded-xl flex flex-col gap-4 p-4">
				{{ answer.trimmedBody }}
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { NotificationEntity } from '@modules/users'
import { formatTime } from '@utils/dates'
import { useAnswerById } from '@app/composable/questions/answers'
import { ellipse } from 'ionicons/icons'

const props = defineProps({
	notification: {
		type: NotificationEntity,
		required: true
	},
	answerId: {
		type: String,
		required: true
	}
})

const { answer } = useAnswerById(props.answerId)
</script>
