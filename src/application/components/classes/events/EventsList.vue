<template>
	<div class="showcase-flex gap-4 p-4 lg:p-0">
		<EmptyState v-if="!loading && !error && events.length === 0">
			<div class="flex flex-col items-center gap-4 mt-[calc(20vh)]">
				<img src="@/assets/images/emptyStates/data.svg" alt="empty state">
				<p class="text-lg font-bold">No events</p>
				<span class="text-center ">Keep in touch! Important events from class admins are will show up here.</span>

			</div>
		</EmptyState>
		<EventsListCard v-for="event in events" :key="event.hash" :classInst="classInst" :event="event" />
		<BlockLoading v-if="loading" />
		<LoadMore v-if="hasMore" :load="fetchOlderEvents" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ClassEntity } from '@modules/classes'
import { useEventList } from '@app/composable/classes/events'
import EventsListCard from '@app/components/classes/events/EventsListCard.vue'

export default defineComponent({
	name: 'EventsList',
	components: { EventsListCard },
	props: {
		classInst: {
			type: ClassEntity,
			required: true
		}
	},
	setup (props) {
		const { loading, error, events, hasMore, fetchOlderEvents } = useEventList(props.classInst.id)
		return { loading, error, events, hasMore, fetchOlderEvents }
	}
})
</script>
