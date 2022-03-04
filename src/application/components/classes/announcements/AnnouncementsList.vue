<template>
	<div class="flex flex-col gap-2 md:gap-4">
		<EmptyState v-if="!loading && !error && announcements.length === 0"
			info="This class has no announcements yet!" />
		<AnnouncementForm v-if="classInst.admins.includes(id)"
			:error="createError"
			:factory="factory"
			:loading="createLoading"
			:submit="createAnnouncement"
			class="bg-white px-4 md:py-4 rounded-xl"
		>
			<template v-slot:buttonText>
				Post Announcement
			</template>
		</AnnouncementForm>
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
import { defineComponent, onMounted } from 'vue'
import { ClassEntity } from '@modules/classes'
import { useAnnouncementList, useCreateAnnouncement } from '@app/composable/classes/announcements'
import AnnouncementsListCard from '@app/components/classes/announcements/AnnouncementsListCard.vue'
import { useAuth } from '@app/composable/auth/auth'
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
		const { id } = useAuth()
		const {
			loading,
			error,
			announcements,
			hasMore,
			fetchOlderAnnouncements
		} = useAnnouncementList(props.classInst.id)
		const { factory, error: createError, loading: createLoading, createAnnouncement } = useCreateAnnouncement()
		onMounted(() => {
			factory.value.classId = props.classInst.id
		})
		return {
			id, loading, error, announcements, hasMore, fetchOlderAnnouncements,
			factory, createError, createLoading, createAnnouncement
		}
	}
})
</script>
