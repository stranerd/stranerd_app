<template>
	<div
		class="m-0 w-full bg-white rounded-xl flex flex-col justify-between items-start gap-4 box-border p-4 text-main_dark">
		<div class="w-full justify-between items-start flex">
			<ion-icon :icon="playCircle" class="text-2xl" />
			<ion-text class="font-semibold flex-grow ml-2 truncate">{{ video.title }}</ion-text>
			<ion-icon :icon="ellipsisVertical" class="text-gray text-xl" @click="openMenu" />
		</div>
		<div class="w-full flex items-center justify-between">
			<div class="flex items-center gap-2">
				<Avatar :id="video.userId" :size="24" :src="video.userBio.photo" />
				<ion-text class="text-xs">{{ video.userBio.firstName }}</ion-text>
			</div>
			<router-link :to="`/study/videos/${video.id}`">
				<ion-button class="btn-outline text-primary w-full lg:min-w-[7.5rem]" size="small">
					Watch
				</ion-button>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Avatar from '@app/components/core/Avatar.vue'
import { VideoEntity } from '@modules/study'
import { ellipsisVertical, playCircle } from 'ionicons/icons'

export default defineComponent({
	name: 'VideosListCard',
	components: { Avatar },
	props: {
		video: {
			type: VideoEntity,
			required: true
		},
		openMenu: {
			type: Function,
			required: true
		}
	},
	setup () {
		return { ellipsisVertical, playCircle }
	}
})
</script>
