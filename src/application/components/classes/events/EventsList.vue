<template>
	<div class="showcase-flex gap-4 p-4 lg:p-0 flex-1">
		<EmptyData v-if="!loading && !error && events.length === 0"
			sub="Keep in touch! Important events from class admins are will show up here."
			title="No events" />
		<EventsListCard v-for="event in events" :key="event.hash" :classInst="classInst" :event="event" />
		<BlockLoading v-if="loading" />
		<LoadMore v-if="hasMore" :load="fetchOlderEvents" />
	</div>
</template>

<script lang="ts" setup>
import { ClassEntity } from '@modules/classes'
import { useEventList } from '@app/composable/classes/events'
import EventsListCard from '@app/components/classes/events/EventsListCard.vue'

const props = defineProps({
	classInst: {
		type: ClassEntity,
		required: true
	}
})

const { loading, error, events, hasMore, fetchOlderEvents } = useEventList(props.classInst.id)
</script>
