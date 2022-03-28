<template>
	<router-link :to="`/study/videos/${video.id}`"
		class="w-full bg-white rounded-xl flex flex-col justify-between box-border card-padding text-main_dark">
		<ion-text class="font-500 truncate w-full">{{ video.title }}</ion-text>
		<div class="w-full flex items-center justify-between gap-2 text-sub">
			<Tag :index="4" tag="Video">
				<template v-slot="slotProps">
					<span class="flex items-center">
						<ion-icon :icon="playCircleOutline" class="text-base mr-1" />
						<ion-text class="text-sub">{{ slotProps.tag }}</ion-text>
					</span>
				</template>
			</Tag>
			<div class="flex items-center text-gray gap-3">
				<template v-if="edit && video.userId === id">
					<span class="text-primary font-bold" @click.prevent="openVideoEditModal(video, $router)">Edit</span>
					<span class="text-red font-bold" @click.prevent="deleteVideo">Delete</span>
				</template>
				<template v-else>
					<Avatar :id="video.userId" :name="video.userBio.fullName" :size="24" :src="video.userBio.photo" />
					<Share :link="video.shareLink" :text="video.description" :title="video.title" cssClass="text-xl" />
					<SaveToSet :entity="video" />
				</template>
			</div>
		</div>
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Avatar from '@app/components/core/Avatar.vue'
import { VideoEntity } from '@modules/study'
import { playCircleOutline } from 'ionicons/icons'
import SaveToSet from '@app/components/study/sets/SaveToSet.vue'
import { useAuth } from '@app/composable/auth/auth'
import { openVideoEditModal, useDeleteVideo } from '@app/composable/study/videos'

export default defineComponent({
	name: 'VideosListCard',
	components: { Avatar, SaveToSet },
	props: {
		video: {
			type: VideoEntity,
			required: true
		},
		edit: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	setup (props) {
		const { id } = useAuth()
		const { deleteVideo, loading } = useDeleteVideo(props.video.id)
		return {
			playCircleOutline, id,
			deleteVideo, loading, openVideoEditModal
		}
	}
})
</script>
