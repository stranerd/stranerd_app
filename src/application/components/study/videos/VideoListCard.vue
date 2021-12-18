<template>
	<router-link
		:class="`m-0 w-full ${colorClass} rounded-xl flex flex-col justify-between md:gap-2 gap-[1rem] box-border pb-5`"
		:to="`/study/videos/${video.id}`"
	>
		<div class="flex flex-col items-center justify-between w-full">
			<img :src="video.preview.link" class="bg-faded_gray  h-[10.9rem] min-w-[57px] w-full  rounded-md " />
			<ion-text class="text-sm text-main_dark font-bold p-5 pb-1 w-full text-left">
				{{ video.title }}
			</ion-text>
		</div>

		<div class="w-full flex items-center justify-start  px-5">
			<div class="flex items-center">
				<Avatar :size="24" :src="video.userBio.photo" />
				<ion-text class="text-xs font-bold text-main_dark ml-3">
					{{ video.userBio.firstName }}
				</ion-text>
			</div>
		</div>

	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Avatar from '@app/components/core/Avatar.vue'
import { VideoEntity } from '@modules/study'

export default defineComponent({
	name: 'VideosListCard',
	components: { Avatar },
	props: {
		colorClass: {
			type: String,
			default: 'bg-white'
		},
		video: {
			type: VideoEntity,
			required: true
		}
	}
})
</script>
