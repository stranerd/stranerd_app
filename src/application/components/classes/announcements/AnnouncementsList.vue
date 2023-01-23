<template>
	<div class="showcase-flex gap-4 p-4 lg:p-0 flex-1">
		<EmptyData v-if="!loading && !error && announcements.length === 0"
			sub="Keep in touch! Important information from class admins are will show up here."
			title="No announcements" />
		<AnnouncementsListCard v-for="announcement in announcements" :key="announcement.hash"
			:announcement="announcement" :classInst="classInst" />
		<BlockLoading v-if="loading" />
		<LoadMore v-if="hasMore" :load="fetchOlderAnnouncements" />
	</div>
</template>

<script lang="ts" setup>
import { ClassEntity } from '@modules/classes'
import { useAnnouncementList } from '@app/composable/classes/announcements'
import AnnouncementsListCard from '@app/components/classes/announcements/AnnouncementsListCard.vue'

const props = defineProps({
	classInst: {
		type: ClassEntity,
		required: true
	}
})

const { loading, error, announcements, hasMore, fetchOlderAnnouncements } = useAnnouncementList(props.classInst.id)
</script>
