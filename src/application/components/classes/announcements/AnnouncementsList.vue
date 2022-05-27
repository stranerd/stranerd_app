<template>
	<div class="showcase-flex gap-4 p-4">
		<EmptyState v-if="!loading && !error && announcements.length === 0"
			info="No announcements" />
		<AnnouncementsListCard v-for="announcement in announcements" :key="announcement.hash"
			:announcement="announcement"
			:classInst="classInst" />
		<div v-if="hasMore" class="text-center py-4 text-primaryBg w-full font-semibold cursor-pointer">
			<a @click.prevent="fetchOlderAnnouncements">Load More</a>
		</div>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ClassEntity } from '@modules/classes'
import { useAnnouncementList } from '@app/composable/classes/announcements'
import AnnouncementsListCard from '@app/components/classes/announcements/AnnouncementsListCard.vue'
import AnnouncementForm from '@app/components/classes/announcements/AnnouncementForm.vue'

export default defineComponent({
	name: 'AnnouncementsList',
	props: {
		classInst: {
			type: ClassEntity,
			required: true
		}
	},
	components: { AnnouncementsListCard, AnnouncementForm },
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
