<template>
	<div class="showcase-flex">
		<div class="flex flex-col gap-4 px-4">
			<EmptyState v-if="!loading && !error && events.length === 0" info="No events" />
			<EventsListCard v-for="event in events" :key="event.hash" :classInst="classInst" :event="event" />
			<div v-if="hasMore" class="text-center py-4 text-primaryBg w-full font-semibold cursor-pointer">
				<a @click.prevent="fetchOlderEvents">Load More</a>
			</div>
		</div>
		<BlockLoading v-if="loading" />
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
