<template>
	<div class="m-0 w-full bg-white rounded-xl flex flex-col justify-between items-start gap-4 box-border p-4">
		<div class="w-full justify-between items-start flex">
			<ion-icon :icon="playCircle" class="text-main_dark text-2xl cursor-pointer" />
			<div class="text-base text-main_dark font-bold text-left flex-col flex ml-2 flex-grow">
				<ion-text>{{ video.title }}</ion-text>
			</div>
			<ion-icon :icon="ellipsisVertical" class="text-gray text-xl cursor-pointer" @click="openMenu" />
		</div>
		<div class="w-full flex items-center justify-between">
			<div class="flex items-center">
				<Avatar :id="video.userId" :size="24" :src="video.userBio.photo" />
				<ion-text class="text-xs font-bold text-main_dark ml-2">{{ video.userBio.firstName }}</ion-text>
			</div>
			<router-link :to="`/study/videos/${video.id}`">
				<ion-button class="btn-outline text-primary font-bold w-full lg:min-w-[7.5rem]" size="small">
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
