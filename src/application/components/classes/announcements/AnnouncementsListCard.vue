<template>
	<div class="flex flex-col !gap-4 card-sm card-padding">
		<IonText>{{ announcement.body }}</IonText>
		<div class="flex gap-2 items-center text-sm text-secondaryText">
			<Avatar :id="announcement.user.id" :name="announcement.user.bio.fullName"
				:size="24" :src="announcement.user.bio.photo" />
			<IonText class="flex gap-1 items-center">
				<span>{{ announcement.user.bio.fullName }}</span>
				<Verified :verified="announcement.isUserVerified" />
			</IonText>
			<IonIcon :icon="ellipse" class="dot" />
			<IonText>{{ formatTime(announcement.createdAt) }}</IonText>

			<ion-button class="ml-auto flex items-center ">
				<IonIcon :icon="eyeOutline" class="text-base mr-3" />
				<IonText>100+</IonText>
			</ion-button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AnnouncementEntity, ClassEntity } from '@modules/classes'
import { formatTime } from '@utils/dates'
import { useAuth } from '@app/composable/auth/auth'
import { ellipse, eyeOutline } from 'ionicons/icons'

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
	setup () {
		const { id } = useAuth()
		return { id, formatTime, ellipse, eyeOutline }
	}
})
</script>
