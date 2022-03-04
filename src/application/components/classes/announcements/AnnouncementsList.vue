<template>
	<div class="flex flex-col gap-4">
		<div class="flex justify-end">
			<IonButton v-if="classInst.admins.includes(id)" class="btn-primary" size="small"
				@click="openAnnouncementModal(classInst, $router)">
				Add Announcement
			</IonButton>
		</div>
		<EmptyState v-if="!loading && !error && announcements.length === 0"
			info="This class has no announcements yet!" />
		<AnnouncementsListCard v-for="announcement in announcements" :key="announcement.hash"
			:announcement="announcement"
			:classInst="classInst" />
		<div v-if="hasMore" class="text-center py-4 text-primary w-full font-semibold cursor-pointer">
			<a @click.prevent="fetchOlderAnnouncements">Load More</a>
		</div>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ClassEntity } from '@modules/classes'
import { openAnnouncementModal, useAnnouncementList } from '@app/composable/classes/announcements'
import AnnouncementsListCard from '@app/components/classes/announcements/AnnouncementsListCard.vue'
import { useAuth } from '@app/composable/auth/auth'

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
		const { id } = useAuth()
		const {
			loading,
			error,
			announcements,
			hasMore,
			fetchOlderAnnouncements
		} = useAnnouncementList(props.classInst.id)
		return { id, loading, error, announcements, hasMore, fetchOlderAnnouncements, openAnnouncementModal }
	}
})
</script>
