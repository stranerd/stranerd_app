<template>
	<div class="flex flex-col !gap-4 card-sm card-padding">
		<span class="leading-none" v-html="announcement.formattedBody" />
		<div class="flex gap-2 items-center text-sm text-secondaryText">
			<Avatar :id="announcement.user.id" :name="announcement.user.bio.fullName"
				:size="24" :src="announcement.user.bio.photo" />
			<IonText class="flex gap-1 items-center font-bold">
				<span>{{ announcement.user.bio.fullName }}</span>
				<Verified :verified="announcement.isUserVerified" />
			</IonText>
			<IonIcon :icon="ellipse" class="dot" />
			<IonText>{{ formatTime(announcement.createdAt) }}</IonText>

			<span class="ml-auto flex items-center gap-2" @click="openViewedByModal(classInst, announcement.readAt)">
				<IonIcon :icon="eyeOutline" />
				<IonText>{{ formatNumber(Object.keys(announcement.readAt).length) }}</IonText>
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { AnnouncementEntity, ClassEntity } from '@modules/classes'
import { formatTime } from '@utils/dates'
import { useAuth } from '@app/composable/auth/auth'
import { ellipse, eyeOutline } from 'ionicons/icons'
import { formatNumber } from '@utils/commons'
import { markAnnouncementSeen } from '@app/composable/classes/announcements'
import { openViewedByModal } from '@app/composable/classes/classes'

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
		onMounted(async () => {
			await markAnnouncementSeen(props.announcement, id.value)
		})
		return { formatTime, formatNumber, ellipse, eyeOutline, openViewedByModal }
	}
})
</script>
