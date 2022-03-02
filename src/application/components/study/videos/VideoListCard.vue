<template>
	<div
		class="m-0 w-full bg-white rounded-xl flex flex-col justify-between items-start gap-4 box-border p-4 text-main_dark">
		<div class="w-full justify-between items-start flex">
			<div class="text-base flex-col flex gap-2 items-start flex-grow truncate">
				<ion-text class="font-semibold truncate">{{ video.title }}</ion-text>
			
			</div>
			<router-link :to="`/study/videos/${video.id}`">
				<ion-icon :icon="arrowForwardCircleOutline" class="text-primary text-xl"  />
			</router-link>
		</div>



		<div class="w-full flex items-center justify-between mt-6">
			<Tag :index="2" tag="Video">
				<template v-slot="slotProps">
					<span class="flex items-center">
						<ion-icon :icon="playCircleOutline" class="text-base mr-1" />
						<ion-text class="text-xs">{{ slotProps.tag }}</ion-text>
					</span>
				</template>
			</Tag>
			<div class="flex items-center text-gray">
				<Avatar :id="video.userId" :size="24" :src="video.userBio.photo" />
				<share cssClass="text-xl mx-3"/>
				<ion-icon :icon="bookmarkOutline"  class="text-xl" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Avatar from '@app/components/core/Avatar.vue'
import { VideoEntity } from '@modules/study'
import { checkmarkCircleOutline,  playCircleOutline, arrowForwardCircleOutline,bookmarkOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'VideosListCard',
	components: { Avatar },
	props: {
		video: {
			type: VideoEntity,
			required: true
		},

	},
	setup () {
		return {  playCircleOutline, checkmarkCircleOutline, arrowForwardCircleOutline, bookmarkOutline }
	}
})
</script>
