<template>
	<div class="bg-white rounded-xl flex flex-col card-padding text-sm md:text-base">
		<div class="flex gap-2 items-center">
			<Avatar :id="announcement.userId" :name="announcement.userBio.firstName"
				:size="32" :src="announcement.userBio.photo" />
			<IonText class="text-main_dark flex gap-1 items-center">
				<span>{{ announcement.userBio.fullName }}</span>
				<IonIcon v-if="announcement.isUserVerified" :icon="checkmarkCircleOutline" color="primary" />
			</IonText>
			<span class="dot" />
			<IonText class="text-gray">{{ formatTime(announcement.createdAt) }}</IonText>
		</div>
		<IonText class="text-main_dark">{{ announcement.body }}</IonText>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AnnouncementEntity, ClassEntity } from '@modules/classes'
import { formatTime } from '@utils/dates'
import { checkmarkCircleOutline } from 'ionicons/icons'

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
		return { formatTime, checkmarkCircleOutline }
	}
})
</script>
