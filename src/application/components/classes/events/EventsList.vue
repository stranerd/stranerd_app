<template>
	<div class="showcase-flex">
		<BlockLoading v-if="loading" />
		<div class="flex flex-col gap-4 px-4">
			<div v-for="event in events" :key="event.hash"
				class="flex flex-col rounded-lg bg-itemBg border-l-8 border-primaryBg p-4 gap-2">
				<IonText class="font-bold">{{ event.title }}</IonText>
				<IonText v-if="event.data.scheduledAt" class="flex items-center gap-1">
					<IonIcon :icon="calendarClearOutline" class="text-heading2" />
					<span>{{ event.data.scheduledAt }}</span>
				</IonText>
				<div class="flex gap-2 items-center text-secondaryText">
					<IonIcon :icon="timeOutline" class="text-heading2" />
					<IonText>{{ event.data.scheduledAt }}</IonText>
					<span v-if="classInst.admins.includes(id)" class="ml-auto">
						<SpinLoading v-if="deleteLoading" />
						<IonIcon v-else :icon="trashBinOutline" class="text-danger text-heading2"
							@click="deleteEvent(event)" />
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ClassEntity } from '@modules/classes'
import { calendarClearOutline, timeOutline, trashBinOutline } from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'
import { useEventList } from '@app/composable/classes/events'
import { useDeleteEvent } from '@app/composable/classes/timetable'

export default defineComponent({
	name: 'EventList',
	props: {
		classInst: {
			type: ClassEntity,
			required: true
		}
	},
	setup (props) {
		const { id } = useAuth()
		const { loading, error, events, hasMore, fetchOlderEvents } = useEventList(props.classInst.id)
		const { loading: deleteLoading, error: deleteError, deleteEvent } = useDeleteEvent()
		return {
			id, loading, error, events, hasMore, fetchOlderEvents,
			timeOutline, calendarClearOutline, trashBinOutline,
			deleteLoading, deleteError, deleteEvent
		}
	}
})
</script>
