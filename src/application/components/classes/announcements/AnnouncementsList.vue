<template>
	<div class="showcase-flex gap-4 p-4 lg:p-0">
		<EmptyState v-if="!loading && !error && announcements.length === 0">
			<div class="flex flex-col items-center gap-4 mt-[calc(20vh)]">
				<img src="@/assets/images/emptyStates/data.svg" alt="empty state">
				<p class="text-lg font-bold">No announcements</p>
				<span class="text-center ">Keep in touch! Important information from class admins are will show up here.</span>

			</div>
		</EmptyState>
		<AnnouncementsListCard v-for="announcement in announcements" :key="announcement.hash"
			:announcement="announcement"
			:classInst="classInst" />
		<BlockLoading v-if="loading" />
		<LoadMore v-if="hasMore" :load="fetchOlderAnnouncements" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ClassEntity } from '@modules/classes'
import { useAnnouncementList } from '@app/composable/classes/announcements'
import AnnouncementsListCard from '@app/components/classes/announcements/AnnouncementsListCard.vue'

export default defineComponent({
	name: 'AnnouncementsList',
	props: {
		classInst: {
			type: ClassEntity,
			required: true
		}
	},
	components: { AnnouncementsListCard },
	setup (props) {
		const {
			loading,
			error,
			announcements,
			hasMore,
			fetchOlderAnnouncements
		} = useAnnouncementList(props.classInst.id)
		return {
			loading, error, announcements, hasMore, fetchOlderAnnouncements
		}
	}
})
</script>
