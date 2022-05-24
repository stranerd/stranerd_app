<template>
	<div class="bg-white rounded-xl flex card-padding leading-none items-center">
		<div class="flex flex-col gap-2 md:gap-4 w-full">
			<div class="flex gap-2 items-center">
				<Avatar :id="announcement.user.id" :name="announcement.user.bio.fullName"
					:size="32" :src="announcement.user.bio.photo" />
				<IonText class="text-secondaryText flex gap-1 items-center">
					<span>{{ announcement.user.bio.fullName }}</span>
					<Verified :verified="announcement.isUserVerified" />
				</IonText>
				<span class="dot bg-icon_inactive" />
				<IonText class="text-gray">{{ formatTime(announcement.createdAt) }}</IonText>
			</div>
			<IonText class="text-secondaryText">{{ announcement.body }}</IonText>
		</div>
		<span v-if="announcement.admins.includes(id)" class="p-1" @click.prevent="showMenu">
			<IonIcon :icon="ellipsisVerticalOutline" class="text-heading2" />
		</span>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { AnnouncementEntity, ClassEntity } from '@modules/classes'
import { formatTime } from '@utils/dates'
import { saveAnnouncementReadState, useDeleteAnnouncement } from '@app/composable/classes/announcements'
import { closeOutline, ellipsisVerticalOutline, trashOutline } from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'
import { actionSheetController } from '@ionic/vue'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'AnnouncementsListCard',
	props: {
		classInst: {
			type: ClassEntity,
			required: true
		},
		announcement: {
			type: AnnouncementEntity,
			required: true
		}
	},
	setup (props) {
		const { id } = useAuth()
		const router = useRouter()
		const { loading, deleteAnnouncement } = useDeleteAnnouncement(props.announcement.classId, props.announcement.id)
		const showMenu = async () => {
			const actionSheet = await actionSheetController
				.create({
					buttons: [
						// { text: 'Edit announcement', icon: pencilOutline, handler: () => openAnnouncementEditModal(props.announcement, router) },
						{
							text: 'Delete announcement',
							role: 'destructive',
							icon: trashOutline,
							handler: deleteAnnouncement
						},
						{ text: 'Cancel', icon: closeOutline, role: 'cancel' }
					]
				})
			await actionSheet.present()
		}
		onMounted(async () => {
			await saveAnnouncementReadState(props.announcement)
		})
		return { id, formatTime, ellipsisVerticalOutline, loading, showMenu }
	}
})
</script>
