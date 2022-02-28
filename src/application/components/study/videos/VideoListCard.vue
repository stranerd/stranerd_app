<template>
	<div
		class="m-0 w-full bg-white rounded-xl flex flex-col justify-between items-start gap-4 box-border p-4 text-main_dark">
		<div class="w-full justify-between items-start flex">
			<div class="text-base flex-col flex gap-2 items-start flex-grow truncate">
				<ion-text class="font-semibold truncate">{{ video.title }}</ion-text>
				<Tag :index="2" tag="Video">
					<template v-slot="slotProps">
						<span class="flex items-center">
							<ion-icon :icon="playCircleOutline" class="text-base mr-1" />
							<ion-text class="text-xs">{{ slotProps.tag }}</ion-text>
						</span>
					</template>
				</Tag>
			</div>
			<ion-icon :icon="ellipsisVerticalOutline" class="text-gray text-xl" @click="openMenu" />
		</div>
		<div class="w-full flex items-center justify-between">
			<div class="flex items-center gap-2">
				<Avatar :id="video.userId" :size="24" :src="video.userBio.photo" />
				<ion-text class="text-xs flex items-center gap-1">
					<span>{{ video.userBio.firstName }}</span>
					<IonIcon v-if="video.isUserVerified" :icon="checkmarkCircleOutline" color="primary" />
				</ion-text>
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
import { checkmarkCircleOutline, ellipsisVerticalOutline, playCircleOutline } from 'ionicons/icons'

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
		return { ellipsisVerticalOutline, playCircleOutline, checkmarkCircleOutline }
	}
})
</script>
