<template>
	<router-link :class="notification.seen ? 'text-secondaryText' : 'font-semibold'" :to="notification.link">
		<Waypoint @change="onChange">
			<component :is="components[notification.data.type]" v-if="components[notification.data.type]"
				v-bind="{ ...notification.data, notification }" />
			<div v-else class="flex flex-col border-bottom-line card-padding">
				<span>{{ notification.body }}</span>
				<span class="text-sm">{{ formatTime(notification.createdAt) }}</span>
			</div>
		</Waypoint>
	</router-link>
</template>

<script lang="ts" setup>
import { defineComponent, PropType } from 'vue'
import { NotificationEntity, NotificationType } from '@modules/users'
import { formatTime } from '@utils/dates'
import { useNotification } from '@app/composable/users/notifications'
// @ts-ignore
import { Waypoint } from 'vue-waypoint'
import NewAnswer from '@app/components/users/notifications/types/questions/NewAnswer.vue'
import NewQuestionComment from '@app/components/users/notifications/types/questions/NewQuestionComment.vue'
import NewAnswerComment from '@app/components/users/notifications/types/questions/NewAnswerComment.vue'
import ConnectRequested from '@app/components/users/notifications/types/connects/ConnectRequested.vue'
import ConnectAccepted from '@app/components/users/notifications/types/connects/ConnectAccepted.vue'
import ConnectDeclined from '@app/components/users/notifications/types/connects/ConnectDeclined.vue'
import ClassAccepted from '@app/components/users/notifications/types/classes/ClassAccepted.vue'
import ClassRejected from '@app/components/users/notifications/types/classes/ClassRejected.vue'
import ClassRemoved from '@app/components/users/notifications/types/classes/ClassRemoved.vue'
import ClassSchemeUpdated from '@app/components/users/notifications/types/classes/ClassSchemeUpdated.vue'
import ClassTimetableUpdated from '@app/components/users/notifications/types/classes/ClassTimetableUpdated.vue'
import NewClassAnnouncement from '@app/components/users/notifications/types/classes/NewClassAnnouncement.vue'
import NewClassOneOffEvent from '@app/components/users/notifications/types/classes/NewClassOneOffEvent.vue'
import NewClassTimetableEvent from '@app/components/users/notifications/types/classes/NewClassTimetableEvent.vue'

const components = {
	[NotificationType.NewAnswer]: NewAnswer,
	[NotificationType.NewQuestionComment]: NewQuestionComment,
	[NotificationType.NewAnswerComment]: NewAnswerComment,
	[NotificationType.ConnectRequested]: ConnectRequested,
	[NotificationType.ConnectAccepted]: ConnectAccepted,
	[NotificationType.ConnectDeclined]: ConnectDeclined,
	[NotificationType.ClassAccepted]: ClassAccepted,
	[NotificationType.ClassRejected]: ClassRejected,
	[NotificationType.ClassRemoved]: ClassRemoved,
	[NotificationType.ClassSchemeUpdated]: ClassSchemeUpdated,
	[NotificationType.ClassTimetableUpdated]: ClassTimetableUpdated,
	[NotificationType.NewClassAnnouncement]: NewClassAnnouncement,
	[NotificationType.NewClassOneOffEvent]: NewClassOneOffEvent,
	[NotificationType.NewClassTimetableEvent]: NewClassTimetableEvent
}

interface WaypointState {
	el: Element
	going: 'IN' | 'OUT'
	direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
}

const props = defineProps({
	notification: {
		type: Object as PropType<NotificationEntity>,
		required: true
	}
})

const { loading, error, markNotificationSeen } = useNotification(props.notification)
const onChange = async (state: WaypointState) => {
	if (state.going === 'IN') await markNotificationSeen()
}
</script>
