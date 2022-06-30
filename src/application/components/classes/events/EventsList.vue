<template>
	<div class="showcase-flex gap-4 p-4 lg:p-0">
		<EmptyState v-if="!loading && !error && events.length === 0" info="No events" />
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
